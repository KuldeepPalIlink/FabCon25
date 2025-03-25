const axios = require('axios');
const { parentPort, workerData } = require('worker_threads');
const Ably = require('ably/promises');
const { hostname } = require('os');
const START_TIMER_SEC = 5;
const QUESTION_TIMER_SEC = 30;
const QUIZ_TIMER_SEC = 60;
const ABLY_API_KEY = process.env.ABLY_API_KEY;
const AZURE_FUNCTION_BASE_URL = "" // Base URL for your Azure Function
const AZURE_FUNCTION_CODE = "" // Your Azure Function code
const globalPlayersState = {};
const playerChannels = {};
let didQuizStart = false;
let totalPlayers = 0;
const quizRoomChName = `${workerData.hostRoomCode}:primary`;
const hostAdminChName = `${workerData.hostRoomCode}:host`;
let hostAdminCh;
const roomCode = workerData.hostRoomCode;
const hostClientId = workerData.hostClientId;
let quizRoomChannel;
let numPlayersAnswered = 0;
let customQuestions = [];
let skipTimer = false;
let answerTime=0;
let finalScore = false;
console.log('this is the worker thread');
console.log('room code is' + workerData.hostRoomCode);

let questions = [];

const realtime = new Ably.Realtime({
  key: ABLY_API_KEY,
  echoMessages: false
});

realtime.connection.once('connected', () => {
  hostAdminCh = realtime.channels.get(hostAdminChName);
  quizRoomChannel = realtime.channels.get(quizRoomChName);

  subscribeToHostEvents();

  quizRoomChannel.presence.subscribe('enter', handleNewPlayerEntered);
  quizRoomChannel.presence.subscribe('leave', handleExistingPlayerLeft);
  quizRoomChannel.publish('thread-ready', { start: true });
});

async function fetchQuestionsFromAzureFunction(quizCategory) {
  try {
    const topicName = quizCategory;
    const response = await axios.post(`${AZURE_FUNCTION_BASE_URL}?topic=${topicName}&code=${AZURE_FUNCTION_CODE}`);
    return response.data.questions;
  } catch (error) {
    console.error('Error fetching questions from Azure Function:', error);
    return [];
  }
}

function handleNewPlayerEntered(player) {
  console.log(player.clientId + 'player entered quiz room');
  const newPlayerId = player.clientId;
  totalPlayers++;
  parentPort.postMessage({
    roomCode: roomCode,
    totalPlayers: totalPlayers,
    didQuizStart: didQuizStart
  });

  let newPlayerState = {
    id: newPlayerId,
    nickname: player.data.nickname,
    companyName: player.data.companyName,
    avatarColor: player.data.avatarColor,
    isHost: player.data.isHost,
    quizType:player.data.quizType,
    quizCategory:player.data.quizCategory,
    quizMode: player.data.quizMode,
    totalQuizPlayers: player.data.totalQuizPlayers,
    hostRoomCode: workerData.hostRoomCode, 
    score: 0,
    timeTaken: 0
  };

  if (player.data.isHost) {
    let quizType = player.data.quizType;
    let quizCategory = player.data.quizCategory;
    if (quizType === 'CustomQuiz') {
      questions = customQuestions;
    } else {
      fetchQuestionsFromAzureFunction(quizCategory).then(fetchedQuestions => {
        for (let i = 0; i < fetchedQuestions.length; i++) {
          let item = fetchedQuestions[i];
          let newQuestionObject = {
            questionNumber: i+1,
            showImg: false,
            question: item.question,
            choices: [
              item.options['A'],
              item.options['B'],
              item.options['C'],
              item.options['D']
            ],
            answer: item.answer,
            correct: convertAnswerToIndex(item.answer)-1,
            pic: item['reference']
          };
          customQuestions.push(newQuestionObject);
        }
        questions = customQuestions;
      });
    }
  } else {
    playerChannels[newPlayerId] = realtime.channels.get(
      `${roomCode}:player-ch-${player.clientId}`
    );

    subscribeToPlayerChannel(playerChannels[newPlayerId], newPlayerId);
  }

  globalPlayersState[newPlayerId] = newPlayerState;
  quizRoomChannel.publish('new-player', {
    newPlayerState
  });
}

function handleExistingPlayerLeft(player) {
  console.log('leaving player', player.clientId);
  const leavingPlayerId = player.clientId;
  totalPlayers--;
  parentPort.postMessage({
    roomCode: roomCode,
    totalPlayers: totalPlayers
  });
  delete globalPlayersState[leavingPlayerId];
  if (leavingPlayerId === hostClientId) {
    quizRoomChannel.publish('host-left', {
      endQuiz: true
    });
    forceQuizEnd();
  }
}

async function publishTimer(event, countDownSec) {
  while (countDownSec > 0) {
    quizRoomChannel.publish(event, {
      countDownSec: countDownSec
    });
    answerTime=30-countDownSec;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    countDownSec -= 1;
    if (event === 'question-timer' && skipTimer) break;
  }
}

function subscribeToHostEvents() {
  hostAdminCh.subscribe('start-quiz', async () => {
    didQuizStart = true;
    parentPort.postMessage({
      roomCode,
      didQuizStart
    });
    await publishTimer('start-quiz-timer', START_TIMER_SEC);
    publishQuestion(0, false);
  });

  hostAdminCh.subscribe('quiz-questions', async (msg) => {
    // const quizType = msg.data.quizType;
    const quizQuizCategory = msg.data.quizCategory
    const fetchedQuestions = await fetchQuestionsFromAzureFunction(quizQuizCategory);
    for (let i = 0; i < fetchedQuestions.length; i++) {
      let item = fetchedQuestions[i];
      let newQuestionObject = {
        questionNumber: i+1,
        showImg: false,
        question: item.question,
        choices: [
          item.options['A'],
          item.options['B'],
          item.options['C'],
          item.options['D']
        ],
        answer: item.answer,
        correct: convertAnswerToIndex(item.answer)- 1,
        pic: item['reference']
      };
      customQuestions.push(newQuestionObject);
    }
  });

  hostAdminCh.subscribe('next-question', (msg) => {
    let prevQIndex = msg.data.prevQIndex;
    let newQIndex = prevQIndex + 1;
    let lastQIndex = questions.length - 1;
    if (newQIndex < lastQIndex) {
      publishQuestion(newQIndex, false);
    } else if (newQIndex === lastQIndex) {
      publishQuestion(newQIndex, true);
    }
  });
  hostAdminCh.subscribe('quiz-timer-update', async () => {
    await publishQuizTimer('quiz-timer-update', QUIZ_TIMER_SEC);
  });

  hostAdminCh.subscribe('end-quiz-now', () => {
    forceQuizEnd();
  });
}

async function publishQuizTimer(event, countDownSec) {
  while (countDownSec > 0) {
    quizRoomChannel.publish(event, {
      countDownSec: countDownSec
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    countDownSec -= 1;
    if (event === 'quiz-timer-update' && skipTimer) break;
  }
}

function forceQuizEnd() {
  quizRoomChannel.publish('quiz-ending', {
    quizEnding: true
  });
  killWorkerThread();
}

async function publishQuestion(qIndex, isLast) {
  numPlayersAnswered = 0;
  await quizRoomChannel.publish('new-question', {
    numAnswered: 0,
    numPlaying: totalPlayers - 1,
    questionNumber: qIndex + 1,
    question: questions[qIndex].question,
    choices: questions[qIndex].choices,
    isLastQuestion: isLast,
    showImg: questions[qIndex].showImg,
    imgLink: questions[qIndex].pic,
    hostRoomCode: workerData.hostRoomCode 
  });
  skipTimer = false;
  finalScore=isLast;
  await publishTimer('question-timer', QUESTION_TIMER_SEC);

  await quizRoomChannel.publish('correct-answer', {
    questionNumber: qIndex + 1,
    correctAnswerIndex: questions[qIndex].correct
  });
  computeTopScorers();

  if (isLast) {
    killWorkerThread();
  }
}

function convertAnswerToIndex(answer) {
  const answerMap = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4
  };
  return answerMap[answer] || null;
}

function computeTopScorers() {
  let leaderboard = new Array();
  for (let item in globalPlayersState) {
    if (item != hostClientId) {
      leaderboard.push({
        nickname: globalPlayersState[item].nickname,
        playerId:globalPlayersState[item].id,
        score: globalPlayersState[item].score,
        timeTaken: globalPlayersState[item].timeTaken
      });
    }
  }
  leaderboard.sort((a, b) => b.score - a.score);
  quizRoomChannel.publish('full-leaderboard', {
    islastquesion:finalScore,
    hostRoomCode: workerData.hostRoomCode ,
    leaderboard: leaderboard
  });
}

function subscribeToPlayerChannel(playerChannel, playerId) {
  playerChannel.subscribe('player-answer', (msg) => {
    numPlayersAnswered++;
    if (
      questions[msg.data.questionIndex].correct === msg.data.playerAnswerIndex
    ) {
      globalPlayersState[playerId].score += 5;
    }
    globalPlayersState[playerId].timeTaken= answerTime;
    updateLiveStatsForHost(numPlayersAnswered, totalPlayers - 1);
  });
  updateLiveStatsForHost(numPlayersAnswered, totalPlayers - 1);
}

function updateLiveStatsForHost(numAnswered, numPlaying) {
  quizRoomChannel.publish('live-stats-update', {
    numAnswered: numAnswered,
    numPlaying: numPlaying
  });
  if (numAnswered === numPlaying) {
    skipTimer = true;
  }
}

function killWorkerThread() {
  console.log('killing thread');
  for (const item in playerChannels) {
    if (playerChannels[item]) {
      playerChannels[item].detach();
    }
  }
  hostAdminCh.detach();
  quizRoomChannel.detach();
  parentPort.postMessage({
    killWorker: true,
    roomCode: roomCode,
    totalPlayers: totalPlayers
  });
  process.exit(0);
}
