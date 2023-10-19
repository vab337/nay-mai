      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
      import {getDatabase, ref, set, get, child, push, onValue} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyDGk1bUN6HA-X7ALG-QKlArGKAvyuPfUrc",
        authDomain: "nay-mai.firebaseapp.com",
        projectId: "nay-mai",
        storageBucket: "nay-mai.appspot.com",
        messagingSenderId: "448372728749",
        appId: "1:448372728749:web:0c12820dc04aea56f53724",
        measurementId: "G-MYG3Z3J690"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);

      var db = getDatabase();
      var entries = 0;

      //  const dbRef = ref(getDatabase());
      //  get(child(dbRef, "Stories/")).then((snapshot) => {
      //   if (snapshot.exists()) {
      //     console.log(snapshot.val());
          
      //     } else {
      //       entries = -1;
      //    console.log("No data available");
      //     }
      //     }).catch((error) => {
      //       console.error(error);
      //     });

      const dbRef = ref(db, 'Stories/');
      let data=[];
      onValue(dbRef, (snapshot) => {

        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          data.push(childSnapshot.val())
        });
      }, {
        onlyOnce: true
      });   
      

      setTimeout(function(){
        console.log(data);
     }, 2000);


      
      var textInput = document.getElementById("textInput");
      var submit = document.getElementById("submit");
      submit.addEventListener('click', submitData);
      


      function submitData() {
        const newStory = ref(db, 'Stories');
        const newStoryRef = push(newStory);
        set(newStoryRef, {
          Story: textInput.value,
        });
      }
      

      const questionArray = ["Is there something from your past that continues to affect you emotionally today?",
      "Could you share a significant challenge or trauma you've faced and how it's impacted you?",
      "Have you ever experienced a situation that left you feeling overwhelmed or stuck emotionally?",
      "Do you notice any recurring patterns or issues in your life that might be tied to past experiences?",
      "In what ways has your upbringing or childhood influenced the way you handle emotions and relationships?",
      "Is there something you've kept to yourself that you'd like to discuss or work through?",
      "Have you struggled to let go of a particular emotion or event from your past?",
      "Are there any regrets or unresolved feelings that weigh on you and you'd like to address?",
      "What have been the most significant emotional challenges you've faced, and how have they shaped your outlook on life?",
      "Is there someone or something from your past with whom you feel you need closure or forgiveness?"
      ]

      const question = document.getElementById("question");
      question.innerHTML = questionArray[Math.floor(Math.random()*questionArray.length)];
      const randomQuestion = document.getElementById("randomQuestion");
      randomQuestion.addEventListener('click',changeQuestion);

      function changeQuestion() {
        var randomQuestionNum = Math.floor(Math.random()*questionArray.length);
        question.innerHTML = questionArray[randomQuestionNum];
      }
