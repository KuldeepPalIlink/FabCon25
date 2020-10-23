(function(e){function t(t){for(var n,a,o=t[0],c=t[1],u=t[2],d=0,h=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&h.push(i[a][0]),i[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(h.length)h.shift()();return r.push.apply(r,u||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],n=!0,o=1;o<s.length;o++){var c=s[o];0!==i[c]&&(n=!1)}n&&(r.splice(t--,1),e=a(a.s=s[0]))}return e}var n={},i={app:0},r=[];function a(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=n,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;r.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"034f":function(e,t,s){"use strict";var n=s("85ec"),i=s.n(n);i.a},"0d38":function(e,t,s){},"317d":function(e,t,s){"use strict";var n=s("57f4"),i=s.n(n);i.a},"3b45":function(e,t,s){"use strict";var n=s("b176"),i=s.n(n);i.a},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("2b0e"),i=s("8c4f"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view",{attrs:{realtime:e.realtime}})],1)},a=[],o=s("6be2"),c={name:"App",components:{},data:function(){return{realtime:null}},created:function(){this.realtime=new o["Realtime"]({authUrl:"/auth"})},destroyed:function(){this.realtime.connection.close()}},u=c,l=(s("034f"),s("2877")),d=Object(l["a"])(u,r,a,!1,null,null,null),h=d.exports,m=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.showQuestions?e._e():s("div",{staticClass:"player-home card"},[s("img",{staticClass:"card-img-top",attrs:{src:e.headerImgLink,alt:"Header image"}}),e.isRoomClosed?e._e():s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[e._v("Hello "+e._s(e.myNickname)+"!")]),e.didPlayerEnterRoom?[s("OnlinePlayers",{attrs:{timer:e.timer,onlinePlayersArr:e.onlinePlayersArr,didHostStartGame:e.didHostStartGame}}),e.didHostStartGame?e._e():s("div",[s("hr"),s("small",{staticClass:"text-muted"},[e._v("Waiting for your host, "),s("strong",[e._v(e._s(e.hostNickname))]),e._v(", to start the quiz")])])]:[s("p",{staticClass:"card-text"},[e._v("We need a nickname so others can identify you")]),s("div",{staticClass:"nickname-input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.myNickname,expression:"myNickname"}],staticClass:"form-control host-nickname",attrs:{id:"host-nickname",placeholder:"Enter nickname"},domProps:{value:e.myNickname},on:{input:function(t){t.target.composing||(e.myNickname=t.target.value)}}}),s("button",{staticClass:"btn btn-primary",attrs:{type:"button create-random-btn"},on:{click:function(t){return e.enterRoomWithNickname()}}},[e._v(" GO ")])])]],2),e.isRoomClosed?s("div",{staticClass:"card-body"},[e._v(" Sorry this quiz room is no longer available to enter, either because the host is no longer online or the quiz has already started. ")]):e._e(),e._m(0)]),e.showQuestions&&!e.showAnswer?s("Question",{attrs:{newQuestion:e.newQuestion,newChoices:e.newChoices,newQuestionNumber:e.newQuestionNumber,isLastQuestion:e.isLastQuestion,questionTimer:e.questionTimer,correctAnswerIndex:e.correctAnswerIndex,showImg:e.showImg,questionImgLink:e.questionImgLink,isAdminView:!1,myInputCh:e.myInputCh},on:{"player-answer":function(t){return e.playerAnswer(t)}}}):e._e(),e.showAnswer?s("Answer",{attrs:{correctAnswer:e.newChoices[e.correctAnswerIndex],didAnswerCorrectly:e.didAnswerCorrectly,isAdminView:!1}}):e._e(),e.didHostForceQuizEnd?s("div",{staticClass:"alert alert-danger alert-quiz-ended",attrs:{role:"alert"}},[e._v(" This quiz has ended. Either the host has ended it or they have simply left. Please request the host to share a new link. ")]):e._e()],1)},p=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card-footer text-muted"},[s("a",{attrs:{href:"https://github.com/Srushtika/realtime-quiz-framework",target:"_blank"}},[e._v("Learn how to build your own realtime quiz app with Ably →")])])}],y=(s("99af"),s("fb6a"),s("d3b7"),s("25f0"),s("96cf"),s("1da1")),w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card",class:e.viewType},[s("div",{staticClass:"card-header"},[e._v("Question "+e._s(e.newQuestionNumber))]),s("h2",{staticClass:"question-div card-title"},[e._v(e._s(e.newQuestion))]),e.showImg?s("div",{staticClass:"img-div"},[s("img",{staticClass:"img-fluid q-img",attrs:{src:e.questionImgLink,alt:"Image for the question"}})]):e._e(),e.showAnswer?s("Answer",{attrs:{correctAnswer:e.newChoices[e.correctAnswerIndex],isAdminView:!0}}):e._e(),e.showAnswer?e._e():s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"}),e.answerSubmitted||e.isAdminView?e._e():s("div",{staticClass:"choices-container"},e._l(e.newChoices,(function(t,n){return s("button",{key:t,staticClass:"btn btn-outline-dark choice-btn",attrs:{type:"button"},on:{click:function(s){return e.sendMyAnswer(t,n)}}},[e._v(" "+e._s(t)+" ")])})),0),e.isAdminView?s("div",{staticClass:"choices-container"},e._l(e.newChoices,(function(t){return s("div",{key:t,staticClass:"choice-div"},[e._v(" "+e._s(t)+" ")])})),0):e._e(),e.answerSubmitted?s("div",{staticClass:"submitted-msg"},[s("h5",[e._v(" Your answer is submitted, waiting for everyone else to answer... ")])]):e._e()]),e.isAdminView&&e.showAnswer?e._e():s("div",{staticClass:"progress"},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated bg-dark",style:{width:e.questionTimer/30*100+"%"},attrs:{role:"progressbar","aria-valuemin":"0","aria-valuemax":"100"}},[e._v(" "+e._s(e.questionTimer)+" ")])])],1)},b=[],f=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card alert answer-div answer-card",class:e.cardColorClass},[e.isAdminView?e._e():s("div",{staticClass:"answer-eval"},[s("i",{staticClass:"fas",class:e.didAnswerCorrectly?"fa-check-circle":"fa-times-circle"}),e._v(" "+e._s(e.evalMessage)+" ")]),e.isAdminView?e._e():s("hr"),s("h5",[e._v("The answer is")]),s("h2",{staticClass:"card-title answer-text"},[e._v(e._s(e.correctAnswer))])])},v=[],C={name:"Answer",props:["correctAnswer","isAdminView","didAnswerCorrectly"],data:function(){return{evalMessage:!0===this.didAnswerCorrectly?"Correct Answer":"Wrong Answer",cardColorClass:null,viewType:1==this.isAdminView?"answer-card-host":"answer-card-player"}},methods:{},created:function(){this.isAdminView?this.cardColorClass="alert-secondary":this.cardColorClass=this.didAnswerCorrectly?"alert-success":"alert-danger"}},g=C,_=(s("3b45"),Object(l["a"])(g,f,v,!1,null,"10651dd2",null)),Q=_.exports,A={name:"Question",components:{Answer:Q},props:["isAdminView","newQuestion","newChoices","newQuestionNumber","isLastQuestion","questionTimer","correctAnswerIndex","myInputCh","showImg","questionImgLink","showAnswer","correctAnswer"],data:function(){return{answerSubmitted:!1,viewType:1==this.isAdminView?"questions-card-host":"questions-card-player"}},methods:{sendMyAnswer:function(e,t){this.isAdminView||(this.answerSubmitted=!0,this.$emit("player-answer",{questionIndex:this.newQuestionNumber-1,playerAnswerIndex:t}),this.myInputCh.publish("player-answer",{questionIndex:this.newQuestionNumber-1,playerAnswerIndex:t,choice:e}))}}},z=A,k=(s("59c1"),Object(l["a"])(z,w,b,!1,null,"6b50fdcc",null)),q=k.exports,R=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.didHostStartGame?s("div",[s("h1",[e._v("Your quiz starts in")]),s("h1",{staticClass:"display-3"},[e._v(e._s(e.timer))])]):e._e(),e._v(" You'll see other players as they join "),s("div",{staticClass:"online-players"},e._l(e.onlinePlayersArr,(function(t){return s("div",{key:t.clientId,staticClass:"player-avatar",style:{color:t.avatarColor}},[s("figure",{staticClass:"figure"},[s("i",{staticClass:"fas fa-user-circle fa-3x"}),s("figcaption",{staticClass:"figure-caption"},[e._v(" "+e._s(t.nickname)+" ")])])])})),0)])},x=[],I={props:["timer","onlinePlayersArr","didHostStartGame"]},T=I,N=(s("65cf"),Object(l["a"])(T,R,x,!1,null,"eb92127c",null)),L=N.exports,P=s("bc3a"),S=s.n(P),E={name:"WaitingArea",props:["realtime"],components:{Question:q,Answer:Q,OnlinePlayers:L},data:function(){return{isRoomClosed:null,quizRoomCode:null,myQuizRoomCh:null,headerImgLink:"https://user-images.githubusercontent.com/5900152/93231769-037b5180-f771-11ea-817a-0b4cd2ca7dc7.png",myNickname:"",myAvatarColor:null,didPlayerEnterRoom:!1,onlinePlayersArr:[],hostNickname:null,didHostStartGame:!1,timer:null,showQuestions:!1,newQuestion:null,newChoices:null,newQuestionNumber:null,isLastQuestion:null,questionTimer:30,correctAnswerIndex:null,showAnswer:!1,myClientId:null,didAnswerCorrectly:null,clickedPlayerQuestionIndex:null,clickedPlayerAnswerIndex:null,showImg:!1,questionImgLink:null,didHostForceQuizEnd:!1}},methods:{subscribeToQuizRoomChEvents:function(){var e=this;this.myQuizRoomCh.subscribe("new-player",(function(t){e.handleNewPlayerEntered(t)})),this.myQuizRoomCh.subscribe("start-quiz-timer",(function(t){e.didHostStartGame=!0,e.timer=t.data.countDownSec})),this.myQuizRoomCh.subscribe("new-question",(function(t){e.handleNewQuestionReceived(t)})),this.myQuizRoomCh.subscribe("question-timer",(function(t){e.questionTimer=t.data.countDownSec,e.questionTimer<0&&(e.questionTimer=30)})),this.myQuizRoomCh.subscribe("correct-answer",(function(t){e.handleCorrectAnswerReceived(t)})),this.myQuizRoomCh.subscribe("quiz-ending",(function(){e.handleQuizEnding()}))},handleNewPlayerEntered:function(e){var t=e.data.newPlayerState,s=t.clientId,n=t.nickname,i=t.avatarColor;this.onlinePlayersArr.push({clientId:s,nickname:n,avatarColor:i})},handleNewQuestionReceived:function(e){this.showQuestions=!0,this.showAnswer=!1,this.newQuestionNumber=e.data.questionNumber,this.newQuestion=e.data.question,this.newChoices=e.data.choices,this.isLastQuestion=e.data.isLastQuestion,this.showImg=e.data.showImg,this.questionImgLink=e.data.imgLink},handleCorrectAnswerReceived:function(e){this.newQuestionNumber==e.data.questionNumber&&(this.correctAnswerIndex=e.data.correctAnswerIndex,this.newQuestionNumber-1==this.clickedPlayerQuestionIndex&&this.clickedPlayerAnswerIndex==this.correctAnswerIndex?this.didAnswerCorrectly=!0:this.didAnswerCorrectly=!1,this.showAnswer=!0)},handleQuizEnding:function(){this.didHostForceQuizEnd=!0},setUpMyChannel:function(){this.myClientId=this.realtime.auth.clientId,this.myInputCh=this.realtime.channels.get("".concat(this.quizRoomCode,":player-ch-").concat(this.myClientId))},enterRoomWithNickname:function(){this.myQuizRoomCh.presence.enter({nickname:this.myNickname,avatarColor:this.myAvatarColor,isHost:!1}),this.didPlayerEnterRoom=!0,this.getExistingPresenceSet(),this.subscribeToQuizRoomChEvents(),this.setUpMyChannel()},getExistingPresenceSet:function(){var e=this;this.myQuizRoomCh.presence.get((function(t,s){if(t)console.log(t);else for(var n=0;n<s.length;n++){var i=s[n].data,r=i.nickname,a=i.avatarColor,o=i.isHost;o?e.hostNickname=r:e.onlinePlayersArr.push({clientId:s[n].clientId,nickname:r,avatarColor:a,isHost:o})}}))},playerAnswer:function(e){this.clickedPlayerQuestionIndex=e.questionIndex,this.clickedPlayerAnswerIndex=e.playerAnswerIndex}},created:function(){var e=this;return Object(y["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.quizRoomCode=e.$route.query.quizCode,t.next=3,S.a.get("/checkRoomStatus?quizCode="+e.quizRoomCode).then((function(t){e.isRoomClosed=t.data.isRoomClosed}));case 3:e.myQuizRoomCh=e.realtime.channels.get("".concat(e.quizRoomCode,":primary")),e.myAvatarColor="#"+Math.random().toString(16).slice(-6);case 5:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){this.myQuizRoomCh&&this.myQuizRoomCh.presence.leave(),this.questionTimer=30}},H=E,O=(s("5c42"),Object(l["a"])(H,m,p,!1,null,"67897afe",null)),j=O.exports,G=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.isTypeChosen?e._e():s("div",{staticClass:"host-home card"},[s("img",{staticClass:"card-img-top",attrs:{src:e.headerImgLink,alt:"Header image"}}),s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[e._v("Hello Quizmaster!")]),s("p",{staticClass:"card-text"},[e._v(" You can use this app to upload your own quiz questions and host a live quiz for any number of participants. As the host, you'll be able to see the live stats at all times and will have full control of the quiz during the live game. You can try it out by hosting a randomly chosen quiz! ")]),s("p",{staticClass:"card-text"},[e._v(" You can share your screen with the participants while they answer the questions via their mobile browsers for best experience. ")]),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:function(t){return e.setQuizType("CustomQuiz")}}},[e._v(" Create your own quiz ")]),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:function(t){return e.setQuizType("RandomQuiz")}}},[e._v(" Host a randomly chosen quiz ")])]),e._m(0)]),e.isTypeChosen?[s("CreateQuizRoom",{attrs:{realtime:e.realtime,ablyClientId:e.ablyClientId,quizType:e.quizType,showHome:e.showHome}})]:e._e()],2)},U=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card-footer text-muted"},[s("a",{attrs:{href:"https://github.com/Srushtika/realtime-quiz-framework",target:"_blank"}},[e._v("Learn how to build your own realtime quiz app with Ably →")])])}],$=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.showQuestions?e._e():s("div",{staticClass:"host-home card"},[e.isRoomReady?s("div",{staticClass:"card-body"},[s("h2",{staticClass:"card-title"},[e._v("Your quiz room is ready")]),s("p",{staticClass:"card-text"},[e._v(" Invite your players to join by sharing this link ")]),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.copyPlayerInviteLink()}}},[e._v(" "+e._s(e.copyBtnText)+" "),e.copyClicked?e._e():s("i",{staticClass:"far fa-copy"})]),s("hr"),s("OnlinePlayers",{attrs:{timer:e.timer,onlinePlayersArr:e.onlinePlayersArr,didHostStartGame:e.didHostStartGame}}),e.onlinePlayersArr.length>0?[e.didHostStartGame?e._e():s("div",[s("hr"),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.startQuiz()}}},[e._v(" Start the quiz ")])])]:e._e()],2):s("div",{staticClass:"card-body"},[s("h2",{staticClass:"card-title"},[e._v(" Host "+e._s("CustomQuiz"===e.quizType?"your own ":"a randomly chosen ")+" quiz ")]),"CustomQuiz"==e.quizType?[s("div",[s("p",{staticClass:"card-text"},[e._v(" You can add your own quiz questions in Google Sheets and host a live quiz. Simply make a copy of the template and fill it with your data. ")]),s("div",{staticClass:"sheets-template"},[s("a",{staticClass:"btn btn-primary btn-host btn-template",attrs:{href:e.templateCopyURL,target:"_blank",role:"button"}},[e._v(" Get the Google Sheets template")]),s("p",{staticClass:"card-text template-instructions"},[e._v(" After you've prepared the questions and answers, you need to do two things: "),s("br"),e._v(" 1. Copy the URL of your sheet from the browser's address bar and paste it in the field below "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.sheetURL,expression:"sheetURL"}],staticClass:"form-control input-box",attrs:{placeholder:"Add the URL to your sheet",disabled:e.createBtnClicked},domProps:{value:e.sheetURL},on:{input:function(t){t.target.composing||(e.sheetURL=t.target.value)}}}),e._v(" 2. Make your Google sheet publicly available by going to File > Publish to the web > Publish. You might be presented with a different shareable URL, you can ignore that. ")])])])]:e._e(),s("p",{staticClass:"card-text"},[e._v(" We need a nickname for you so the players of your quiz can identify you ")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.hostNickname,expression:"hostNickname"}],staticClass:"form-control input-box",attrs:{placeholder:"Enter nickname",disabled:e.createBtnClicked},domProps:{value:e.hostNickname},on:{input:function(t){t.target.composing||(e.hostNickname=t.target.value)}}}),s("button",{staticClass:"btn btn-primary",attrs:{type:"button create-random-btn",disabled:e.createBtnClicked},on:{click:function(t){return e.createQuizRoom()}}},[e._v(" "+e._s(e.btnText)+" ")]),e.sheetURLErr?s("div",{staticClass:"alert alert-danger sheet-error",attrs:{role:"alert"}},[e._v(" There is a problem with the URL to your sheet. Please recheck it per the instructions above, refresh this page and try again. You can reach out to support@ably.com for further assistance. ")]):e._e()],2),s("div",{staticClass:"card-footer text-muted"},[s("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(t){return e.showHome()}}},[e._v(" ← Go back ")])])]),e.showQuestions&&!e.showFinalScreen?s("div",{staticClass:"d-flex bd-highlight"},[s("div",{staticClass:"question-flex bd-highlight"},[s("Question",{attrs:{newQuestion:e.newQuestion,newChoices:e.newChoices,newQuestionNumber:e.newQuestionNumber,isLastQuestion:e.isLastQuestion,questionTimer:e.questionTimer,correctAnswerIndex:e.correctAnswerIndex,showImg:e.showImg,questionImgLink:e.questionImgLink,isAdminView:!0,correctAnswer:e.newChoices[e.correctAnswerIndex],showAnswer:e.showAnswer}})],1),s("div",{staticClass:"stats-flex bd-highlight"},[e.showAnswer?e._e():s("LiveStats",{attrs:{numAnswered:e.numAnswered,numPlaying:e.numPlaying}}),e.showAnswer?s("div",[s("Leaderboard",{attrs:{leaderboard:e.leaderboard,finalScreen:!1}}),s("AdminPanel",{attrs:{hostAdminCh:e.hostAdminCh,prevQuestionNumber:e.newQuestionNumber},on:{"end-quiz-now":function(t){return e.endQuizNow()}}})],1):e._e()],1)]):e._e(),e.showFinalScreen?s("div",{staticClass:"quizEnded"},[e._m(0),s("Leaderboard",{attrs:{leaderboard:e.leaderboard,finalScreen:!0}})],1):e._e()])},M=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"alert alert-secondary end-msg",attrs:{role:"alert"}},[s("h6",[e._v("The quiz has ended")]),s("h1",{staticClass:"display-4"},[e._v("Congratulations to the winners 🎉🎉🎉")])])}],V=(s("4d63"),s("ac1f"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"alert alert-secondary admin-panel",attrs:{role:"alert"}},[s("h4",{staticClass:"alert-heading"},[e._v("Host control panel")]),s("hr"),s("button",{staticClass:"btn btn-dark btn-next",attrs:{type:"button"},on:{click:function(t){return e.showNextQuestion()}}},[e._v(" Show next question ")]),s("br"),s("button",{staticClass:"btn btn-link end-btn",attrs:{type:"button"},on:{click:function(t){return e.endQuizNow()}}},[e._v(" End quiz and show results ")])])}),F=[],B={name:"AdminPanel",props:["hostAdminCh","prevQuestionNumber"],methods:{showNextQuestion:function(){this.hostAdminCh.publish("next-question",{prevQIndex:this.prevQuestionNumber-1})},endQuizNow:function(){this.hostAdminCh.publish("end-quiz-now",{end:!0}),this.$emit("end-quiz-now")}}},Y=B,W=(s("f709"),Object(l["a"])(Y,V,F,!1,null,"002967ae",null)),D=W.exports,J=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card bg-light mb-3 livestats-div"},[s("div",{staticClass:"card-header"},[e._v("Live stats")]),s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[e._v(" "+e._s(e.numAnswered)+" of "+e._s(e.numPlaying)+" people have answered this question ")])])])},Z=[],K={name:"LiveStats",props:["numAnswered","numPlaying"]},X=K,ee=(s("573d"),Object(l["a"])(X,J,Z,!1,null,"0a7e7ac2",null)),te=ee.exports,se=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card text-white bg-warning mb-3 leaderboard"},[s("div",{staticClass:"card-header"},[s("h3",[e._v(e._s(0==e.finalScreen?"Top 5 scorers":"Final Leaderboard"))])]),s("div",{staticClass:"card-body"},[s("p",{staticClass:"card-text"},[e.leaderboard?s("ol",{staticClass:"score-list"},e._l(e.leaderboard.slice(0,e.leaderNum),(function(t,n){return s("li",{key:n,staticClass:"score-item"},[s("p",[e._v(e._s(t.nickname))]),s("p",[e._v(e._s(t.score))])])})),0):e._e()])])])},ne=[],ie={name:"Leaderboard",props:["leaderboard","finalScreen"],data:function(){return{leaderNum:this.finalScreen?this.leaderboard.length:5}}},re=ie,ae=(s("7c35"),Object(l["a"])(re,se,ne,!1,null,"bb666d0e",null)),oe=ae.exports,ce=s("b0c2"),ue={name:"QuizType",props:["resetCmpFn","realtime","quizType","showHome"],components:{Question:q,AdminPanel:D,LiveStats:te,Leaderboard:oe,OnlinePlayers:L},data:function(){return{globalQuizChName:"main-quiz-thread",globalQuizCh:null,myQuizRoomCode:this.getRandomRoomId(),myQuizRoomCh:null,hostAdminCh:"a",hostNickname:null,btnText:"Create my quiz room",createBtnClicked:!1,isRoomReady:!1,playerLinkBase:window.location.href+"play",playerLink:null,copyBtnText:"Copy shareable link",copyClicked:!1,onlinePlayersArr:[],didHostStartGame:!1,timer:null,showQuestions:!1,newQuestionNumber:null,newQuestion:null,newChoices:[],isLastQuestion:null,questionTimer:30,correctAnswerIndex:null,showAnswer:!1,numAnswered:0,numPlaying:0,leaderboard:null,templateCopyURL:"https://docs.google.com/spreadsheets/d/12_Cnv86fI4JOnJq5t9BQmxiPTNZgMsd0PP7Sbjm7WkQ/copy?usp=sharing",sheetURL:"",sheetURLErr:!1,customQuizQuestions:null,showImg:!1,questionImgLink:null,showFinalScreen:!1}},methods:{createQuizRoom:function(){var e=this;if(this.createBtnClicked=!0,"RandomQuiz"===this.quizType)this.btnText="Creating your quiz room...";else{this.btnText="Loading your questions and creating your quiz room...";var t=new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(this.sheetURL)[1];if(null==t||null==this.sheetURL)return void(this.sheetURLErr=!0);var s={sheetId:t,sheetNumber:1,returnAllResults:!0};ce(s,(function(t){e.customQuizQuestions=t}),(function(t){e.sheetURLErr=!0,console.log(t)}))}this.waitForGameRoom(),this.enterMainThread()},waitForGameRoom:function(){var e=this;this.myQuizRoomCh=this.realtime.channels.get("".concat(this.myQuizRoomCode,":primary")),this.hostAdminCh=this.realtime.channels.get("".concat(this.myQuizRoomCode,":host")),this.myQuizRoomCh.subscribe("thread-ready",(function(){e.handleQuizRoomReady()}))},handleQuizRoomReady:function(){if(this.isRoomReady=!0,this.globalQuizCh.detach(),this.enterGameRoomAndSubscribeToEvents(),this.playerLink="".concat(this.playerLinkBase,"?quizCode=").concat(this.myQuizRoomCode),"CustomQuiz"==this.quizType){var e=this.customQuizQuestions;this.hostAdminCh.publish("quiz-questions",{questions:e})}},enterGameRoomAndSubscribeToEvents:function(){this.myQuizRoomCh.presence.enter({nickname:this.hostNickname,avatarColor:this.myAvatarColor,isHost:!0,quizType:this.quizType}),this.subscribeToHostChEvents(),this.subscribeToRoomChEvents()},enterMainThread:function(){this.globalQuizCh=this.realtime.channels.get(this.globalQuizChName),this.globalQuizCh.presence.enter({nickname:this.hostNickname,roomCode:this.myQuizRoomCode})},getRandomRoomId:function(){return"room-"+Math.random().toString(36).substr(2,8)},subscribeToHostChEvents:function(){var e=this;this.hostAdminCh.subscribe("live-stats-update",(function(t){e.numAnswered=t.data.numAnswered,e.numPlaying=t.data.numPlaying})),this.hostAdminCh.subscribe("full-leaderboard",(function(t){e.leaderboard=t.data.leaderboard}))},subscribeToRoomChEvents:function(){var e=this;this.myQuizRoomCh.subscribe("new-player",(function(t){e.handleNewPlayerEntered(t)})),this.myQuizRoomCh.subscribe("start-quiz-timer",(function(t){e.didHostStartGame=!0,e.timer=t.data.countDownSec})),this.myQuizRoomCh.subscribe("new-question",(function(t){e.handleNewQuestionReceived(t)})),this.myQuizRoomCh.subscribe("question-timer",(function(t){e.questionTimer=t.data.countDownSec,e.questionTimer<0&&(e.questionTimer=30)})),this.myQuizRoomCh.subscribe("correct-answer",(function(t){e.handleCorrectAnswerReceived(t)}))},handleNewPlayerEntered:function(e){var t=e.data.newPlayerState,s=t.clientId,n=t.nickname,i=t.avatarColor,r=t.isHost;r||this.onlinePlayersArr.push({clientId:s,nickname:n,avatarColor:i,isHost:r})},handleNewQuestionReceived:function(e){this.showAnswer=!1,this.showQuestions=!0,this.newQuestionNumber=e.data.questionNumber,this.newQuestion=e.data.question,this.newChoices=e.data.choices,this.isLastQuestion=e.data.isLastQuestion,this.numAnswered=e.data.numAnswered,this.numPlaying=e.data.numPlaying,this.showImg=e.data.showImg,this.questionImgLink=e.data.imgLink},handleCorrectAnswerReceived:function(e){this.showAnswer=!0,this.newQuestionNumber==e.data.questionNumber&&(this.correctAnswerIndex=e.data.correctAnswerIndex),this.isLastQuestion&&(this.showFinalScreen=!0)},copyPlayerInviteLink:function(){var e=this;this.copyClicked=!0,this.copyBtnText="Copied!",setTimeout((function(){e.copyClicked=!1,e.copyBtnText="Copy shareable link"}),2e3),navigator.clipboard.writeText(this.playerLink)},startQuiz:function(){this.hostAdminCh.publish("start-quiz",{start:!0})},endQuizNow:function(){this.showFinalScreen=!0}},beforeDestroy:function(){this.myQuizRoomCh&&this.myQuizRoomCh.presence.leave(),this.questionTimer=30}},le=ue,de=(s("317d"),Object(l["a"])(le,$,M,!1,null,"0a9f1296",null)),he=de.exports,me={props:["realtime","ablyClientId"],data:function(){return{isTypeChosen:!1,headerImgLink:"https://user-images.githubusercontent.com/5900152/93231769-037b5180-f771-11ea-817a-0b4cd2ca7dc7.png",quizType:""}},components:{CreateQuizRoom:he},methods:{setQuizType:function(e){this.isTypeChosen=!0,this.quizType=e},showHome:function(){this.isTypeChosen=!1}}},pe=me,ye=(s("c950"),Object(l["a"])(pe,G,U,!1,null,"7fb30619",null)),we=ye.exports,be=[{path:"/play",component:j},{path:"",component:we}];n["a"].config.productionTip=!1,n["a"].use(i["a"]);var fe=new i["a"]({routes:be,mode:"history"});new n["a"]({router:fe,render:function(e){return e(h)}}).$mount("#app")},"573d":function(e,t,s){"use strict";var n=s("5a38"),i=s.n(n);i.a},"57f4":function(e,t,s){},"59c1":function(e,t,s){"use strict";var n=s("7caa"),i=s.n(n);i.a},"5a38":function(e,t,s){},"5c42":function(e,t,s){"use strict";var n=s("6fea"),i=s.n(n);i.a},"65cf":function(e,t,s){"use strict";var n=s("0d38"),i=s.n(n);i.a},"6fea":function(e,t,s){},"7c35":function(e,t,s){"use strict";var n=s("bea1"),i=s.n(n);i.a},"7caa":function(e,t,s){},"85ec":function(e,t,s){},b176:function(e,t,s){},b469:function(e,t,s){},bea1:function(e,t,s){},c0f7:function(e,t,s){},c950:function(e,t,s){"use strict";var n=s("b469"),i=s.n(n);i.a},f709:function(e,t,s){"use strict";var n=s("c0f7"),i=s.n(n);i.a}});
//# sourceMappingURL=app.979abac9.js.map