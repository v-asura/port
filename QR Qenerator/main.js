const qrForm=document.querySelector("#qrForm");
qrContainer=document.querySelector(".qr-container");
qrImg=document.querySelector(".qr-container img");
const qrInput=document.querySelector("input");
const btn=document.querySelector("#btn");


qrForm.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const formData=new FormData(qrForm);
    const text=formData.get("qrText");
    // const text=qrInput.value;  //(OR Instead of line 7 & 8 we can use this)
    if(!text){return;}
    btn.innerText="Generating QR Code....";
    const url= `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
    qrImg.src= url;
    qrImg.addEventListener("load",()=>{
        qrContainer.classList.add("show");
        btn.innerText= "Generate QR Code";
    })
})
qrInput.addEventListener("keyup",()=>{
    if (!qrInput.value.trim()) {
        qrContainer.classList.remove("show");
    }
})