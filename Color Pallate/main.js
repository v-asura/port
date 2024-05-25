const btn=document.querySelector(".btn");
const container=document.querySelector(".colors-container");

// Generate Single Color
const singleColor=()=>{
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor="#";
    for(let i=0;i<6;i++){
        let random=Math.floor(Math.random()*hex.length);
        hexColor+=hex[random];
    }
    return hexColor;
}

// Generate required four color
const colorGenerator=()=>{
    const colorPalette=[];
    for(let i=0;i<4;i++){
        colorPalette.push(singleColor());
    }
    return colorPalette;
}

// Generate Color Palette
const colorPalette=()=>{
   const generator= colorGenerator();
   container.innerHTML="";
   generator.forEach((color,i)=>{
    const colorDiv=document.createElement("div");
    colorDiv.id=`color${i+1}`;
    colorDiv.style.backgroundColor=color;
    container.append(colorDiv);
    colorDiv.className="color-box";
    const tag=document.createElement("p");
    tag.id=`colorTag${i+1}`;
    tag.className="tag";
    tag.innerHTML=color;
    colorDiv.append(tag);
    // container.appendChild(colorDiv);
   })

   const copyToClipBoard=(id)=>{
    const el = document.getElementById(id);
    console.log(el);
    navigator.clipboard
      .writeText(el.innerText)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        alert("Could not copy");
      });
  }
   


   const colorTags=document.querySelectorAll(".tag");
   colorTags.forEach((tag,i)=>{
    tag.addEventListener("click", () =>
        copyToClipBoard(`colorTag${i + 1}`)
      );
   });
}
colorPalette();
btn.addEventListener("click",colorPalette);