let isSetOpen= false;
let DOB;
const settingCog=document.querySelector(".fa-gear");
const settingContent=document.querySelector(".setting-content");
const initialText=document.querySelector("#initial");
const finalText=document.querySelector("#final");
const dobBtn=document.querySelector("#dobBtn");
const dobInput=document.querySelector("#dob");
const yearEl=document.querySelector(".year");
const monthEl=document.querySelector(".month");
const dayEl=document.querySelector(".day");
const hourEl=document.querySelector(".hour");
const minuteEl=document.querySelector(".minute");
const secondEl=document.querySelector(".second");



const tos=()=>{
    if(isSetOpen){
        settingContent.classList.add("hide");
    }else{
        settingContent.classList.remove("hide");
    }
     isSetOpen= !isSetOpen;

}

const update = () => {
    const currentDate = new Date();
    const life = currentDate - DOB; // Difference in milliseconds

    // Calculate years
    const year = Math.floor(life / (1000 * 60 * 60 * 24 * 365));

    // Calculate months (using a more accurate approach)
    const yearsInMilliseconds = year * (1000 * 60 * 60 * 24 * 365);
    const remainingMilliseconds = life - yearsInMilliseconds;
    const month = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24 * 30)); // Approx. average days in a month

    // Calculate days (using a more accurate approach)
    const monthsInMilliseconds = month * (1000 * 60 * 60 * 24 * 30);
    const days = Math.floor((remainingMilliseconds - monthsInMilliseconds) / (1000 * 60 * 60 * 24));

    // Calculate hours, minutes, and seconds
    const hours = Math.floor((remainingMilliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingMilliseconds / 1000) % 60);

    // Function to format numbers to two digits (e.g., 1 => "01", 10 => "10")
    const makeTwoDigit = (num) => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    // Update HTML elements with formatted values (assuming elements are defined and available)
    yearEl.innerHTML = makeTwoDigit(year);
    monthEl.innerHTML = makeTwoDigit(month);
    dayEl.innerHTML = makeTwoDigit(days);
    hourEl.innerHTML = makeTwoDigit(hours);
    minuteEl.innerHTML = makeTwoDigit(minutes);
    secondEl.innerHTML = makeTwoDigit(seconds);
};

const localStorageGetter=()=>{
    const year=localStorage.getItem("year");
    const month=localStorage.getItem("month");
    const date=localStorage.getItem("date");
    const hour=localStorage.getItem("hour");
    const minute=localStorage.getItem("minute");
    const second=localStorage.getItem("second");
    if(year && month && date && hour && minute && second){
        DOB=new Date(year,month,date,hour,minute,second);
    }
    update();
}

const Toggler=()=>{
    update();
    if(DOB){
       initialText.classList.add("hide");
       finalText.classList.remove("hide");
      
    }else{
        finalText.classList.add("hide");
        initialText.classList.remove("hide");
    }
}
const setDOB=()=>{
    const dateString=dobInput.value;
    DOB=dateString?new Date(dateString):null;
    if(DOB){
        localStorage.setItem("year",DOB.getFullYear());
        localStorage.setItem("month",DOB.getMonth());
        localStorage.setItem("date",DOB.getDate());
        localStorage.setItem("hour",DOB.getHours());
        localStorage.setItem("minute",DOB.getMinutes());
        localStorage.setItem("second",DOB.getSeconds());
    }
    Toggler();
    setInterval(()=>update(),1000);
}

localStorageGetter();
Toggler();




settingCog.addEventListener("click",tos);
dobBtn.addEventListener("click",setDOB);



