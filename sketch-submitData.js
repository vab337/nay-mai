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
  
        entryNum = dataset.length;
        console.log(entryNum);

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



      const questionArray = ["A lesson learned the hard way", "If you could revisit a moment from your past", 
      "An advice you would have loved to hear",
      "Ever bitten a bullet?",
      "If you could entirely forget something",
      "Once bitten, twice shy",
      "Words unsaid",
      "If you could undo anything",
      "Broken promises",
      "I'm super shy super shy",
      "Làm con gái khó lắm phải không?",
      "Người con gái bạn thương nhất trên đời",
      "Nếu được gặp một người con gái bất kì",
      "Nếu được làm con gái một ngày/mỗi ngày"
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

