<template>
  <div>
    <div v-if="!showQuestions" class="host-home card">
      <div v-if="!isRoomReady" class="card-body">
        <h2 class="card-title">
          Host
          <!-- {{ quizType === 'CustomQuiz' ? 'your own ' : 'a randomly chosen ' }} -->
          quiz
        </h2>
        <template v-if="quizType == 'CustomQuiz'">
          <div>
            <p class="card-text">
              You can add your own quiz questions in Google Sheets and host a
              live quiz. Simply make a copy of the template and fill it with
              your data.
            </p>
            <div class="sheets-template">
              <a
                class="orange-txt"
                :href="templateCopyURL"
                target="_blank"
                role="button"
              >
                Get the Google Sheets template</a
              >
              <p class="card-text template-instructions">
                After you've prepared the questions and answers, you need to do
                two things: <br />
                1. Copy the URL of your sheet from the browser's address bar and
                paste it in the field below
                <input
                  class="form-control input-box"
                  placeholder="Add the URL to your sheet"
                  v-model="sheetURL"
                  :disabled="createBtnClicked"
                />
                2. Make your Google sheet publicly available by going to File >
                Publish to the web > Publish. You might be presented with a
                different shareable URL, you can ignore that.
              </p>
            </div>
          </div>
        </template>

        <p class="card-text">
          We need a nickname for you so the players of your quiz can identify
          you
        </p>
        <!-- <input
          class="form-control input-box"
          placeholder="Enter nickname"
          v-model="hostNickname"
          :disabled="createBtnClicked"
          @keyup.enter="createQuizRoom()"
        />

        <input
          class="form-control input-box"
          placeholder="Enter company Name"
          v-model="companyName"
          :disabled="createBtnClicked"
          @keyup.enter="createQuizRoom()"
        /> -->

        <div class="quiz-type-tiles">
          <h3 class="card-title">Select a Quiz Category</h3>
          <div
            v-for="category in quizCategories"
            :key="category.name"
            class="tile"
            :class="{ selected: selectedQuizCategory === category.name }"
            @click="selectQuizCategory(category.name)"
          >
            {{ category.name }}
          </div>
        </div>

        <div v-if="selectedQuizCategory && selectedQuizCategory !== 'Custom'" class="quiz-type-tiles">
          <h3 class="card-title">Select a Subcategory</h3>
          <div
            v-for="subcategory in getSubcategories(selectedQuizCategory)"
            :key="subcategory"
            class="tile"
            :class="{ selected: selectedQuizSubcategory === subcategory }"
            @click="selectQuizSubcategory(subcategory)"
          >
            {{ subcategory }}
          </div>
        </div>

        <div v-if="selectedQuizCategory === 'Custom'">
          <input
            class="form-control input-box"
            placeholder="Enter custom category"
            v-model="selectedQuizSubcategory"
            :disabled="createBtnClicked"
          />
        </div>

        <div>
          <h3 class="card-title">Select Quiz Mode</h3>
          <div>
            <input type="radio" id="singular" :value="false" v-model="quizMode">
            <label for="singular">Singular</label>
          </div>
          <div>
            <input type="radio" id="multiplayer" :value="true" v-model="quizMode">
            <label for="multiplayer">Multiplayer</label>
            <input
              v-if="quizMode"
              class="form-control input-box"
              placeholder="Enter total number of players"
              v-model="totalQuizPlayers"
              type="number"
              min="2"
              :disabled="createBtnClicked"
            />
          </div>
        </div>        
        
        <button
          type="button create-random-btn"
          class="btn"
          @click="createQuizRoom()"
          :disabled="!isFormValid || createBtnClicked"
        >
          {{ btnText }}
        </button>
        <div
          class="alert alert-danger sheet-error"
          role="alert"
          v-if="sheetURLErr"
        >
          There is a problem with the URL to your sheet. Please recheck it per
          the instructions above, refresh this page and try again. You can reach
          out to support@ably.com for further assistance.
        </div>
      </div>
      <div v-else class="card-body">
        <h2 class="card-title">Your quiz room is ready</h2>
        <p class="card-text">
          Invite your players to join by sharing this link
        </p>
        <button type="button" class="btn" @click="copyPlayerInviteLink()">
          {{ copyBtnText }}
          <i v-if="!copyClicked" class="far fa-copy"></i>
        </button>
        <qrcode-vue :value="playerLink" :size="200"></qrcode-vue>
        <hr />
        <OnlinePlayers
          :timer="timer"
          :onlinePlayersArr="onlinePlayersArr"
          :didHostStartGame="didHostStartGame"
        ></OnlinePlayers>
        <template v-if="onlinePlayersArr.length > 0">
          <div v-if="!didHostStartGame">
            <hr />
            <button type="button" class="btn" @click="startQuiz()">
              Start the quiz
            </button>
          </div>
        </template>
      </div>
      <div class="card-footer text-muted div-black">
        <button type="button" class="btn btn-link back-btn" @click="showHome()">
          &larr; Go back
        </button>
      </div>
    </div>
    <div v-if="showQuestions && !showFinalScreen" class="d-flex bd-highlight">
      <div class="question-flex bd-highlight">
        <Question
          :newQuestion="newQuestion"
          :newChoices="newChoices"
          :newQuestionNumber="newQuestionNumber"
          :isLastQuestion="isLastQuestion"
          :questionTimer="questionTimer"
          :correctAnswerIndex="correctAnswerIndex"
          :showImg="showImg"
          :questionImgLink="questionImgLink"
          :isAdminView="true"
          :correctAnswer="newChoices[correctAnswerIndex]"
          :showAnswer="showAnswer"
        ></Question>
      </div>
      <div class="stats-flex bd-highlight">
        <LiveStats
          :numAnswered="numAnswered"
          :numPlaying="numPlaying"
          v-if="!showAnswer"
        ></LiveStats>
        <div v-if="showAnswer">
          <Leaderboard
            :leaderboard="leaderboard"
            :isPlayer="false"
            :finalScreen="false"
          ></Leaderboard>
          <AdminPanel
            :hostAdminCh="hostAdminCh"
            :prevQuestionNumber="newQuestionNumber"
            @end-quiz-now="endQuizNow()"
          ></AdminPanel>
        </div>
      </div>
    </div>
    <div v-if="showFinalScreen" class="quizEnded">
      <div class="text-white end-msg">
        <h6>The quiz has ended</h6>
        <h1 class="display-4">Congratulations to the winners 🎉🎉🎉</h1>
      </div>
      <Leaderboard
        :leaderboard="leaderboard"
        :isPlayer="false"
        :finalScreen="true"
      ></Leaderboard>
    </div>
  </div>
</template>

<script>
import Question from '../common/Question.vue';
import OnlinePlayers from '../common/OnlinePlayers.vue';
import AdminPanel from './AdminPanel.vue';
import LiveStats from '../common/LiveStats.vue';
import Leaderboard from '../common/Leaderboard.vue';
import QrcodeVue from 'qrcode-vue';
import * as GSheetReader from 'g-sheets-api';
export default {
  name: 'QuizType',
  props: ['resetCmpFn', 'realtime', 'quizType', 'showHome'],
  components: {
    Question,
    AdminPanel,
    LiveStats,
    Leaderboard,
    OnlinePlayers,
    QrcodeVue,
  },
  data() {
    return {
      globalQuizChName: 'main-quiz-thread',
      globalQuizCh: null,
      myQuizRoomCode: this.getRandomRoomId(),
      myQuizRoomCh: null,
      hostAdminCh: 'a',
      hostNickname: 'Host',
      companyName:'ilink',
      btnText: 'Create my quiz room',
      createBtnClicked: false,
      isRoomReady: false,
      playerLinkBase: window.location.href + 'play',
      playerLink: null,
      copyBtnText: 'Copy shareable link',
      copyClicked: false,
      onlinePlayersArr: [],
      didHostStartGame: false,
      timer: null,
      showQuestions: false,
      newQuestionNumber: null,
      newQuestion: null,
      newChoices: [],
      isLastQuestion: null,
      questionTimer: 30,
      correctAnswerIndex: null,
      showAnswer: false,
      numAnswered: 0,
      numPlaying: 0,
      leaderboard: null,
      templateCopyURL:
        'https://docs.google.com/spreadsheets/d/12_Cnv86fI4JOnJq5t9BQmxiPTNZgMsd0PP7Sbjm7WkQ/copy?usp=sharing',
      sheetURL: '',
      sheetURLErr: false,
      customQuizQuestions: null,
      showImg: false,
      questionImgLink: null,
      showFinalScreen: false,
      selectedQuizCategory: null,
      selectedQuizSubcategory: null,
      customCategory:null,
      totalQuizPlayers: null, // Total number of players for multiplayer mode
      quizMode: false, // Default quiz mode
      quizCategories: [
        { name: 'Sports', subcategories: ['Cricket', 'Basketball', 'Baseball', 'FIFA (Soccer/Football)', 'Olympics'] },
        { name: 'Entertainment', subcategories: ['Hollywood Movies', 'Bollywood Movies', 'Music & Pop Stars', 'TV Shows & Sitcoms', 'Award Shows (Oscars, Grammys, etc.)'] },
        { name: 'Space & Science', subcategories: ['NASA & Space Exploration', 'The Solar System', 'Famous Scientists & Inventions', 'Technology & Gadgets'] },
        { name: 'General Knowledge', subcategories: ['U.S. History & Presidents', 'Geography (Countries, Capitals, Landmarks)', 'Famous Personalities (Leaders, Celebrities, Innovators)', 'Fun Facts & Random Trivia'] },
        { name: 'Custom', subcategories: [] }
      ],
      timerStarted: false, // Flag to check if the timer has started
      timerDuration: 120, // Timer duration in seconds (2 minutes)
      remainingTime: 120 // Initial remaining time
    };
  },
  computed: {
    isFormValid() {
      return (
        this.hostNickname &&
        this.companyName &&
        this.selectedQuizCategory && this.selectedQuizSubcategory &&
        (this.selectedQuizCategory === 'Custom' ? this.selectedQuizSubcategory : true) &&
        this.quizMode !== null &&
        (this.quizMode ? this.totalQuizPlayers: true)
      );
    }
  },
  methods: {
    selectQuizCategory(name) {
      this.selectedQuizCategory = name;
      this.selectedQuizSubcategory = null; // Reset subcategory when a new category is selected
    },
    selectQuizSubcategory(name) {
      this.selectedQuizSubcategory = name;
    },
    getSubcategories(categoryName) {
      const category = this.quizCategories.find(cat => cat.name === categoryName);
      return category ? category.subcategories : [];
    },
    createQuizRoom() {
      this.createBtnClicked = true;
      if (this.quizType === 'RandomQuiz') {
        this.btnText = 'Creating your quiz room...';
      } else {
        this.btnText = 'Loading your questions and creating your quiz room...';
        let mySheetId = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)').exec(
          this.sheetURL
        )[1];
        if (mySheetId == null || this.sheetURL == null) {
          this.sheetURLErr = true;
          return;
        }
        const options = {
          sheetId: mySheetId,
          sheetNumber: 1,
          returnAllResults: true
        };
        GSheetReader(
          options,
          results => {
            this.customQuizQuestions = results;
          },
          error => {
            this.sheetURLErr = true;
            console.log(error);
            return;
          }
        );
      }
      this.waitForGameRoom();
      this.enterMainThread();
    },
    waitForGameRoom() {
      this.myQuizRoomCh = this.realtime.channels.get(
        `${this.myQuizRoomCode}:primary`
      );
      this.hostAdminCh = this.realtime.channels.get(
        `${this.myQuizRoomCode}:host`
      );
      this.myQuizRoomCh.subscribe('thread-ready', () => {
        this.handleQuizRoomReady();
      });
    },
    handleQuizRoomReady() {
      this.isRoomReady = true;
      this.globalQuizCh.detach();
      this.enterGameRoomAndSubscribeToEvents();
      this.playerLink = `${this.playerLinkBase}?quizCode=${this.myQuizRoomCode}`;
      if (this.quizType == 'CustomQuiz') {
        let questions = this.customQuizQuestions;
        this.hostAdminCh.publish('quiz-questions', {
          questions
        });
      }
    },
    enterGameRoomAndSubscribeToEvents() {
      this.myQuizRoomCh.presence.enter({
        nickname: this.hostNickname,
        avatarColor: this.myAvatarColor,
        companyName: this.companyName,
        isHost: true,
        quizType: this.quizType,
        quizCategory: this.selectedQuizSubcategory,
        quizMode: this.quizMode,
        totalQuizPlayers: this.quizMode ? parseInt(this.totalQuizPlayers) : 1
      });
      this.subscribeToRoomChEvents();
    },
    enterMainThread() {
      this.globalQuizCh = this.realtime.channels.get(this.globalQuizChName);
      this.globalQuizCh.presence.enter({
        nickname: this.hostNickname,
        companyName: this.companyName,
        roomCode: this.myQuizRoomCode,
      });
    },
    getRandomRoomId() {
      return (
        'room-' +
        Math.random()
          .toString(36)
          .substr(2, 8)
      );
    },
    subscribeToRoomChEvents() {
      this.myQuizRoomCh.subscribe('new-player', msg => {
        this.handleNewPlayerEntered(msg);
      });
      this.myQuizRoomCh.subscribe('start-quiz-timer', msg => {
        this.didHostStartGame = true;
        this.timer = msg.data.countDownSec;
      });
      this.myQuizRoomCh.subscribe('new-question', msg => {
        this.handleNewQuestionReceived(msg);
      });
      this.myQuizRoomCh.subscribe('question-timer', msg => {
        this.questionTimer = msg.data.countDownSec;
        if (this.questionTimer < 0) {
          this.questionTimer = 30;
        }
      });

      this.myQuizRoomCh.subscribe('quiz-timer-update', msg => {
        this.remainingTime = msg.data.countDownSec;
        if(this.remainingTime == 1){
          this.startQuiz();
        }
      });
      
      this.myQuizRoomCh.subscribe('correct-answer', msg => {
        this.handleCorrectAnswerReceived(msg);
      });
      this.myQuizRoomCh.subscribe('live-stats-update', msg => {
        this.numAnswered = msg.data.numAnswered;
        this.numPlaying = msg.data.numPlaying;
      });
      this.myQuizRoomCh.subscribe('full-leaderboard', msg => {
        this.leaderboard = msg.data.leaderboard;
      });
    },
    handleNewPlayerEntered(msg) {
      let { clientId, nickname, avatarColor, isHost, quizType, quizCategory, quizMode, totalQuizPlayers,hostRoomCode } = msg.data.newPlayerState;
      if (!isHost) {
        this.onlinePlayersArr.push({
          clientId,
          nickname,
          avatarColor,
          isHost,
          quizType,
          quizCategory,
          quizMode,
          totalQuizPlayers,
          hostRoomCode
        });
        if (!this.timerStarted && quizMode && this.onlinePlayersArr.length === 1) {
          this.startTimer();
        }
        if (!quizMode || this.onlinePlayersArr.length === parseInt(this.totalQuizPlayers)) {
          this.startQuiz();
        }
        
      } else {
        return;
      }
    },

    startTimer() {
      this.timerStarted = true;
      this.hostAdminCh.publish('quiz-timer-update', {});
    },

    handleNewQuestionReceived(msg) {
      this.showAnswer = false;
      this.showQuestions = true;
      this.newQuestionNumber = msg.data.questionNumber;
      this.newQuestion = msg.data.question;
      this.newChoices = msg.data.choices;
      this.isLastQuestion = msg.data.isLastQuestion;
      this.numAnswered = msg.data.numAnswered;
      this.numPlaying = msg.data.numPlaying;
      this.showImg = msg.data.showImg;
      this.questionImgLink = msg.data.imgLink;
    },
    handleCorrectAnswerReceived(msg) {
      this.showAnswer = true;
      if (this.newQuestionNumber == msg.data.questionNumber) {
        this.correctAnswerIndex = msg.data.correctAnswerIndex;
      }

      setTimeout(() => {
        if(!this.isLastQuestion)
      this.hostAdminCh.publish('next-question', {
        prevQIndex: this.prevQuestionNumber - 1
      });
      }, 3000);
      

      if (this.isLastQuestion) {
        this.showFinalScreen = true;
      }
    },
    copyPlayerInviteLink() {
      this.copyClicked = true;
      this.copyBtnText = 'Copied!';
      setTimeout(() => {
        this.copyClicked = false;
        this.copyBtnText = 'Copy shareable link';
      }, 2000);
      navigator?.clipboard.writeText(this.playerLink);
    },
    startQuiz() {
      this.hostAdminCh.publish('start-quiz', {
        start: true
      });
    },
    endQuizNow() {
      this.showFinalScreen = true;
    }
  },
  beforeDestroy() {
    if (this.myQuizRoomCh) {
      this.myQuizRoomCh.presence.leave();
    }
    this.questionTimer = 30;
  }
};
</script>

<style scoped>
.host-home {
  margin: 0px auto;
  text-align: center;
  width: 60%;
}
.input-box {
  width: 40%;
  margin: 20px auto;
  text-align: center;
}
.sheets-template {
  text-align: center;
  background-color: #f1f5f6;
  margin: 15px auto;
  padding: 25px;
  width: 100%;
}
.template-instructions {
  margin: 20px auto;
}
.sheet-error {
  margin: 20px;
}
.question-flex {
  width: 65%;
}
.stats-flex {
  width: 50%;
}
.quizEnded {
  width: 80%;
  margin: 20px auto;
  font-size: 20px;
}
.end-msg {
  text-align: center;
  margin: 10px auto;
}

button {
  margin: 5px;
  width: 60%;
  font-size: 20px;
  background: rgb(255, 84, 22);
  background: linear-gradient(
    90deg,
    rgba(255, 84, 22, 1) 75%,
    rgba(228, 0, 0, 1) 100%
  );
  border: 1px solid #ffffff;
  color: #ffffff;
}

button:hover {
  background: #ffffff;
  color: #e40000;
  border: 1px solid #e40000;
}
.back-btn {
  background: none;
  border: none;
  color: #ffffff;
  padding: 0px;
  margin: 0px;
}

.div-black {
  background-color: #03020d;
  color: #ffffff;
}

.back-btn:hover {
  border: none;
  background: none;
  color: #ffffff;
}

.orange-txt {
  color: #ff5416;
}

.quiz-type-tiles {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.tile {
  padding: 10px 20px;
  background-color: #f1f5f6;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tile:hover {
  background-color: #ddd;
}

.selected {
  background-color: yellow;
}

@media only screen and (max-device-width: 480px) {
  .host-home {
    margin: 0px auto;
    text-align: center;
    width: 90%;
    font-size: 0.9rem;
  }
  .nickname-input {
    display: flex;
    justify-content: space-evenly;
    width: 70%;
    text-align: center;
    margin: 0 auto;
  }
  .alert-quiz-ended {
    width: 90%;
    margin: 20px auto;
    text-align: center;
  }
  .home-text {
    font-size: 0.8rem;
  }
  button {
    width: 90%;
    font-size: 1rem;
  }
}
</style>
