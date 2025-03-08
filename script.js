let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let turnO = true;// playerX,playerO
let newGamebtn =document.querySelector("#new-btn");
let msgContainer =document.querySelector('.msg-container');
let msg=document.querySelector("#msg");
let body=document.body;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add('hide');
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText ='O';
            box.style.color='green';
            body.classList.add("o");
            body.classList.remove("x");
            turnO=false;
        }
        else{
            box.innerText='X';
            box.style.color='violet';
            body.classList.add("x");
            body.classList.remove("o");
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
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
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkAllDisable=()=>{
    for(let box of boxes){
        if(!box.disabled){
            return false;
        }
    }
    return true;
}
const showNoWinner=()=>{
    msg.innerText=`Tie`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    let checkWin=false;
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText; 
        if(pos1Val !="" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
                checkWin=true;
            }
        }
    }
    if(!checkWin && checkAllDisable()){
        showNoWinner();
    }
};
newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
