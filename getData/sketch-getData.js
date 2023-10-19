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
      var dataset = []; //array of all data
      var entryNum = 0;
      var allDataString ="";



      function getAllData() {
        const dbRef2 = ref(db);
  
        get(child(dbRef2,  "Stories/"))
        .then((snapshot) => {
          snapshot.forEach(childSnapshot=> {
            dataset.push(childSnapshot.val().Story);
          });
  
        console.log(dataset);
        entryNum = dataset.length;

        getallDataString();
        findCategories();
        createCategories();

        });
      }
  
      window.onload =  function() {
        getAllData();

        }


      //get the categories

      function getallDataString() {
      allDataString = dataset.join(" ").toLowerCase().replace(/[^\w\s]/g, '');
      console.log(allDataString);
      }


      let allCategories  = "";
      var stringArray = [];

      let spliceValues = ["i", ""," ", ".",",","and", "the", "we", "our", "me", "you","they","them","their","us","my","a", "of", "from", "with", "on","under","by","up","down","in","at","to","was","is","had","do","does","go","goes","went",
      "were","get","got","where","what","when","how","who", "like"];

      function findCategories() {
        
        stringArray = allDataString.split(" ");
        console.log("Original string: " + stringArray  + "\nLength: " + stringArray.length);

        for (let j=0; j<spliceValues.length; j++) {
          for(let i = 0; i < stringArray.length; i++) {
          if (stringArray[i] === spliceValues[j]) {
              stringArray.splice(i, 1);
          }
        }
      }
      console.log("Remaining elements: " + stringArray + "\nLength: " + stringArray.length);

      }
      

      function createCategories() {
        for(var b=0; b<stringArray.length; b++){
        const catBtn = document.createElement("button");
        catBtn.innerHTML = stringArray[b];
        catBtn.classList.add('catButton');
        document.getElementById("catContainer").appendChild(catBtn);
        catBtn.addEventListener("click",choseWords)
         }
      }

      let wordsChosen = [];
      let storiesChosen = [];

      //chose words to filter
      function choseWords() {
        let btnWord = this.innerHTML;
        wordsChosen.push(btnWord);
        console.log(wordsChosen);
        this.style.backgroundImage = "url('../assets/red-bag.svg')";
      }


      //Find stories that match the criteria and return a new array
      const findBtn = document.getElementById("find");
      findBtn.addEventListener("click", findStories);
      const results = document.getElementById("results");

      function findStories() {
        dataset.forEach((str, index) => {
        wordsChosen.forEach((word) => {
        str = str.toLowerCase();
        if (str.includes(" " +word + " ")) {
        storiesChosen.push(dataset[index]);
        results.innerHTML = removeDuplicates(storiesChosen);
          }
         });
        });
      }


      function removeDuplicates(arr) { 
        return [...new Set(arr)]; 
    } 


    document.getElementById('print').addEventListener('click',printDiv);

    function printDiv() {
      findStories();
      // Get the content of the div
      var content = storiesChosen;
    
      // Create a new window for printing
      var printWindow = window.open('', '', 'width=842, height=595');
    
      // Write the content and include a link to an external CSS file
      printWindow.document.open();
      printWindow.document.write('<html><head><title>Print</title>');
      printWindow.document.write('<link rel="stylesheet" type="text/css" href="style-print.css">');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<div id="textFrame"><img src="../assets/text-frame1.png"></div>');
      printWindow.document.write('<div id="maintext">' + content + "</div>");
      printWindow.document.write('</body></html>');
      printWindow.document.close();
    
      // Print the content in the new window
      printWindow.print();
    
      // Close the new window
      // printWindow.close();
    }

      


  //https://codepen.io/jayfreestone/pen/JjrNNaq 
  //https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside 
