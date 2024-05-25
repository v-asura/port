// Create a Math question
// Math question will have a random generated
// Question Type Multiplicatin question  with random number range 1-10
// Answer will be the product of the random number range and the random number range
// User will have to answer question
// On submit  answer answer will be compared with random generated answer
// If answer will be correct than score will be incremented
// If answer will be wrong than score will be decremented


// Generate 4 Types of question
// For Subtract first number should be greater than second number also for Divide
// Store the score in local storage and display the score on the screen
// Give Feedback to user using toast


const quesId=document.querySelector("#question");
const form=document.querySelector("#form");
const scoreId=document.querySelector("#score");


let storedAns;
let score=localStorage.getItem("score");
const randomNum=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
}

const generateQues=()=>{
    const num1=randomNum(1,10);
    const num2=randomNum(1,10);
    const qType=randomNum(1,4);
    let first;
    let second;
    if(num1>num2 & qType===3){
        first=num1;
        second=num2;
    }else{
        first=num2;
        second=num1;
    }
    let question;
    let answer;
    switch(qType){
        case 1: question=`Q. What is ${first} *  ${second} ?`;
        answer=first*second;
        break;
        case 2: question=`Q. What is ${first} +  ${second} ?`;
        answer=first+second;
        break;
        case 3: question=`Q. What is ${first} /  ${second} ?`;
        answer=first/second;
        break;
        case 4: question=`Q. What is ${first} -  ${second} ?`;
        answer=first-second;
        break;
    }
    return {question,answer};
}

const showQues=()=>{
    const {question,answer}=generateQues();
    quesId.innerText=question;
    scoreId.innerText=score;
    storedAns=answer;
}

showQues();
const checkAns=(event)=>{
    event.preventDefault();
    const formData= new FormData(form);
    const userAns =parseInt (formData.get("answer"));
    if(storedAns===userAns){
        score++;
        Toastify({
            text: `Your are correct and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
    }else{
        score--;
        Toastify({
            text: `Your are wrong and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e33217, #ff001e)",
            },
          }).showToast();
    }
    scoreId.innerText=score;
    localStorage.setItem("score",score);
    event.target.reset();
    showQues();
}