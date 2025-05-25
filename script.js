window.onload = function () {

    let screen1 = document.getElementById("screen1");
  let screen2 = document.getElementById("screen2");
  let screen3 = document.getElementById("screen3");
  let screen4 = document.getElementById("screen4");
  let screen6 = document.getElementById("screen6");

  let timer=document.getElementById("timer");

let allques = [];
let questionindex=0;
let score=0;
let Correct="";
 let isans_checked = false;
 let checknextbtn= document.querySelector("#checknext");
let interval;



    //Without this, it prints html as text.
    function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}




function Apiurl() {
  const category = document.getElementById("topic").value;
  const difficulty = document.getElementById("level").value;

  let url = "https://opentdb.com/api.php?amount=2";

  if (category && category !== "Any") {
    url += `&category=${category}`;
  }
  if (difficulty  && difficulty !== "Any") {
    url += `&difficulty=${difficulty}`;
  }
    return url+=`&type=multiple`;
}   //URL based on chosen category




const loadques = async() => {
    const URL= Apiurl();
    let response = await fetch(URL);    //returns promise
    let data = await response.json();   //converts it to js
    console.log("Fetched data:", data);
    console.log("URL used:", URL);

    allques=data.results;
    getques();
   document.getElementById("exit").style.display="block";
}




 function getques () {
  if (questionindex >= allques.length) {
    screen4.style.display="none";
    document.querySelector("#popup_msg").style.display="none";
    showscreen6(3);
    
    return;
  }
    const h5=document.querySelector("h5");
    const question = document.getElementById("question");
    const quesdata=allques[questionindex];
    question.innerText= decodeHTML(quesdata.question);
    h5.innerText =`Question ${questionindex+1}`;

    const correct_ans= (quesdata.correct_answer);
    Correct=decodeHTML(correct_ans); //gloabal variable
    const wrong_ans =(quesdata.incorrect_answers);
    const all_ans = [...wrong_ans,correct_ans];
   const shuffled_ans = all_ans.sort(() => Math.random() - 0.5); //shuffle answers randomly

shuffled_ans.forEach((ans, i) => {
    const radio = document.getElementById(`opt${i}`);
    const label = document.getElementById(`label${i}`);

    if (radio && label) {
        radio.disabled= false;
        radio.checked=false;
      label.innerText = decodeHTML(ans);
      radio.value = ans;
    }
  });
  const popup=document.getElementById("popup_msg");
     screen4.style.display = "block";
   popup.style.display = "block";
  settimer(15);
  isans_checked=false;
  questionindex++;
  popup.innerText = "";
  popup.style.backgroundColor = "transparent";
  popup.classList.remove("show");
}



let state="true";
  let correct=document.getElementById("correct");
let wrong=document.getElementById("wrong");

function popup(value) {
    let popup=document.getElementById("popup_msg");
    if(value===1){
      if(state){
         popup.style.backgroundColor= "rgb(87, 198, 87)";
        popup.innerText= "Correct Answer!";
        correct.play();
      }
    }
    else {
      if(state){
         popup.style.backgroundColor= " rgb(236, 88, 88)";
        popup.innerText= `Wrong. Correct answer is ${Correct}`;
        wrong.play();
      }
    }
          popup.classList.add("show");

    // setTimeout(() => {
    //   popup.classList.remove("show");
    // }, 7000);

    
  }



    function checkans() {
        const selected= document.querySelector('input[name="question1"]:checked');
        if(!selected){
            alert("Please select an option!");
            return false;
        }
        clearInterval(interval);
            if (selected.value===Correct){
                score++;
                popup(1);   // 1 for true
            }
            else {
                popup(0);   //0 for false
            }
            isans_checked=true;
            if(questionindex===allques.length){
              checknextbtn.style.backgroundColor="rgb(247, 255, 28)";
                checknextbtn.innerText="End Quiz";
            }
            else{
              checknextbtn.style.backgroundColor="rgb(247, 255, 28)";
              checknextbtn.innerText="Next";}
        return true;
    }





  checknextbtn.onclick = function () {
    if (!isans_checked) {
      const valid = checkans();
      if (valid) {
        // disable options
        document.querySelectorAll('input[name="question1"]').forEach((el) => (el.disabled = true));
      }
    } else {
      getques();
      checknextbtn.style.backgroundColor="rgb(197, 197, 197)";
      checknextbtn.innerText = "Check Answer";
    }
  }





let timeleft=15;
let timeup=document.getElementById("timeup");


function handletimeout() {
  const selected = document.querySelector('input[name="question1"]:checked');
  const popup = document.getElementById("popup_msg");

  if (!selected) {
    if(state){
    timeup.play();
    }
    popup.style.backgroundColor="rgb(186, 209, 237)";
    popup.innerText = `Time's up! Correct answer was: ${Correct}`;
    popup.classList.add("show");

//   setTimeout(() => {
//   popup.classList.remove("show");
// }, 7000);
  } else {
    checkans();
  }
  document.querySelectorAll('input[name="question1"]').forEach((el) => (el.disabled = true));
  if(questionindex === allques.length){
    checknextbtn.style.backgroundColor="rgb(247, 255, 28)";  
    checknextbtn.innerText = "End Quiz";
  }
  else{
    checknextbtn.style.backgroundColor="rgb(247, 255, 28)";
  checknextbtn.innerText = "Next";
  }
  isans_checked = true;
}

function settimer(duration) {
  let timeleft=duration;
   interval = setInterval(()=>{
        timer.innerText= `Time left: ${timeleft}s`;
        timeleft--;

        if(timeleft<0) {
            clearInterval(interval);
            handletimeout();
        }
    }, 1000);

}




  let btnStart = document.getElementById("startbutton");
  let btnBegin = document.getElementById("begin");

  let usernameInput = document.getElementById("username");
  let message = document.getElementById("hellomessage");
  const count=document.getElementById("count");
  let bgmusic=document.getElementById("bgmusic");
  let endmusic=document.getElementById("endmusic");

  btnStart.onclick = function () {
    screen1.style.display = "none";
    screen2.style.display = "block";
     bgmusic.play();
  };
  btnBegin.onclick = function () {
    if(usernameInput.value===""){
        alert("Please provide your name");
        return;
    }
    message.textContent = "Hello " + usernameInput.value+ "!";
    screen2.style.display = "none";
    screen3.style.display = "block";
   showscreen4(5);
  };


  function showscreen4(seconds) {
    let counter=seconds-1;
    const interval = setInterval(()=>{
        count.textContent= `We'll be starting in
         ${counter}...`;
        counter--;

        if(counter<0) {
            clearInterval(interval);
            screen3.style.display = "none";
            loadques();
        }
    }, 1000);
  
  }

function showscreen6(seconds) {
  let counter = seconds;
  document.getElementById("exit").style.display="none";
  document.querySelector("#screen5").style.display = "block";

  const interval = setInterval(() => {
    counter--;
    if (counter <= 0) {
      clearInterval(interval);
      document.querySelector("#screen5").style.display = "none";
      screen6.style.display = "block";
      showscore();
    } 
  }
  , 1000); 
}



function showscore() {
  let message=document.getElementById("message");
  document.getElementById("score").innerText= score;
  if(score>=9){
    message.innerText = "Excellent!";
  }
  else if(score<=8 && score>=6){
    message.innerText= "Good Job!";
  }
  else if(score<6 && score>=4) {
    message.innerText="Nice Try!";
  }
  else{
    message.innerText="Better Luck Next Time!";
  }
  if(state){
  endmusic.play();
  }
}




let mode = "light";
let body = document.body;
let modebtn = document.getElementById("modebtn");

modebtn.addEventListener("click", () => {
  if (mode === "light") {
    body.className = "darkmode";
    modebtn.innerText = "Light mode";
    mode = "dark";
  } else {
    body.className = "lightmode";
    modebtn.innerText = "Dark mode";
    mode = "light";
  }
});



let restartbtn = document.querySelector("#play");

restartbtn.addEventListener("click", ()=> {
  questionindex = 0;
  score = 0;
  isans_checked = false;
  allques = [];
  clearInterval(interval);
  
  screen6.style.display = "none";
  screen2.style.display = "block";
  document.querySelector("#count").innerText="We'll be starting in 5..."

  document.getElementById("popup_msg").innerText = "";
  checknextbtn.style.backgroundColor=" rgb(197, 197, 197)";
  checknextbtn.innerText = "Check Answer";

});




let exitbtn=document.querySelector("#exitbtn");

exitbtn.addEventListener("click", ()=>{

  screen4.style.display="none";
  showscreen6(2);
});





const click = document.getElementById("click");
let soundbtn= document.getElementById("soundbtn");
let btnimg=document.getElementById("soundicon");
  bgmusic.volume=0.45;

soundbtn.addEventListener("click", ()=>{
  if(state){
    btnimg.src="images/mute.png";
    state=false;
    bgmusic.pause();
  }
  else{
    btnimg.src="images/volume.png";
    state=true;
    bgmusic.play();
  }

});






const buttons=document.querySelectorAll(".buttons");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if(state){
    click.currentTime = 0; // rewind to start
    click.play();
    }
  });
});








}