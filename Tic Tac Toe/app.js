let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newGame=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turn0=true;
let count=0;
const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5], 
    [6,7,8]
];
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        // console.log("Clicked");
        if(turn0){
            box.innerText="O";
            turn0=false;
        }else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        count++;
        // console.log(count);
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";

    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}
const checkWinner=()=>{
    for(let pattern of winPattern){
     /*console.log(pattern[0],pattern[1],pattern[2]);
     console.log(boxes[pattern[0]].innerText,
         boxes[pattern[1]].innerText,
         boxes[pattern[2]].innerText
     );*/
    let pos1val=boxes[pattern[0]].innerText;
    let pos2val=boxes[pattern[1]].innerText;
    let pos3val=boxes[pattern[2]].innerText;

    if(pos1val!="" && pos2val!="" && pos3val!=""){
        if(pos1val===pos2val && pos2val===pos3val){
            // console.log("Winner",pos1val);
            showWinner(pos1val);
            disableBoxes();
            return true;
        }
    }
    }
};
const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const gameDraw=()=>{
    msg.innerText="Game is Draw";
     disableBoxes();
    msgContainer.classList.remove("hide");
}
newGame.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);