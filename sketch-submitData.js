//***GET ALL DATA ONCE */      
      
      
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
      import {getDatabase, ref, set, get, child, onValue} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
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
      var dataset = [];
      var entryNum = 0;



      function getAllData() {
        const dbRef2 = ref(db);
  
        get(child(dbRef2,  "Stories/"))
        .then((snapshot) => {
          snapshot.forEach(childSnapshot=> {
            dataset.push(childSnapshot.val());
          });
  
        console.log(dataset);
        entryNum = dataset.length;
        });
      }
  
      window.onload = getAllData();
  
      
      var textInput = document.getElementById("textInput");
      var submit = document.getElementById("submit");
      submit.addEventListener('click', submitData);
      
      function submitData() {
        entryNum+=1;
        console.log("New entryNum: " + entryNum);
        set(ref(db, "Stories/" + entryNum), {
          Story: textInput.value,
        })
        .then(()=>{
          showAlert();
          // alert("Thank you for your story!")
          textInput.value=""; //clear Input
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


const step1 =  document.getElementById('step1');
const step2 =  document.getElementById('step2');
const step3 =  document.getElementById('step3');
const submitAlert = document.getElementById('submitAlert');
step2.classList.add('notDisplay');
step3.classList.add('notDisplay');
submitAlert.classList.add('notDisplay');


      //storytelling buttons
      document.getElementById('enter').addEventListener('click', () => {
        step1.classList.add('notDisplay');
        step2.classList.remove('notDisplay');
      })


      document.getElementById('start').addEventListener('click', () => {
        step2.classList.add('notDisplay');
        step3.classList.remove('notDisplay');
      })


      document.getElementById('goPrint').addEventListener('click', () => {
        window.location.href = "getData/index.html";
        console.log("clicked");
      })


      function showAlert() {
        submitAlert.classList.remove('notDisplay');
        step3.classList.add('notDisplay');
      }

