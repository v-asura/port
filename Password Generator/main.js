let passLen=8;

let isUpperCase = false;
let isNumbers = false;
let isSymbols = false;

const passRange=document.querySelector("#passRangeInput");
const passRangeVal=document.querySelector("#passLen");
const genBtn=document.querySelector("#btn");
const passEl=document.querySelector("#password");

const genPass=(passLen)=>{
    const lowercaseLetters="abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters=isUpperCase?"ABCDEFGHIJKLMNOPQRSTUVWXYZ":"";
    const numbers=isNumbers?"0123456789":"";
    const symbols=isSymbols?"!#$%&'()*+,-./:;<=>?@[\]^_`{|}~":"";
    const passChar=lowercaseLetters+uppercaseLetters+numbers+symbols;
    let password="";
    for(i=0;i<passLen;i++){
        const charIndex=Math.floor(Math.random()*passChar.length);
        password+=passChar[charIndex];
    }
    return password;

}

passRange.addEventListener("input",(e)=>{
    passLen= +e.target.value;
    passRangeVal.innerText=passLen;
})

genBtn.addEventListener("click",()=>{
    const uppercaseCheck=document.querySelector("#uppercase");
    const numbersCheck=document.querySelector("#numbers");
    const symbolsCheck=document.querySelector("#symbols");
    
    isUpperCase = uppercaseCheck.checked;
    isNumbers = numbersCheck.checked;
    isSymbols = symbolsCheck.checked;

    const pass=genPass(passLen);
    passEl.innerHTML=pass;
});

passEl.addEventListener("click",(e)=>{
    if (e.target.innerText.length > 0) {
        navigator.clipboard
          .writeText(passEl.innerText)
          .then(() => {
            alert("Copied to clipboard");
          })
          .catch((err) => {
            alert("could not copy");
          });
      }
})