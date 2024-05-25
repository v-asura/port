let userScore=0;
let compScore=0;
let choices=document.querySelectorAll(".choice");
let msg=document.querySelector("#msg");
let userScr=document.querySelector("#user-scr");
let compScr=document.querySelector("#comp-scr");


const genCompChoice=()=>{
    let options=["rock","paper","scissor"];
    const ranIdx=Math.floor(Math.random()*3);
    return options[ranIdx];
}

const drawGame=()=>{
    msg.innerText="Game was Draw";
    msg.style.backgroundColor="#081b31";
}

const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScr.innerText=userScore;
        msg.innerText=`You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";

    }else{
        compScore++;
        compScr.innerText=compScore;
        msg.innerText=`You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor="red";
    }
}
const playGame=(userChoice)=>{
    const compChoice=genCompChoice();
    if(userChoice===compChoice){
        //Draw
        drawGame();
    }else{
        let userWin=true;
        if(userChoice==="rock"){
           userWin= compChoice==="paper"?false:true;
        }else if(userChoice==="paper"){
            userWin=compChoice==="rock"?true:false;
        }else{
            userWin=compChoice==="rock"?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}



choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    })
})