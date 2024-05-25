const url = "https://api.github.com/users";
const searchInput=document.querySelector("#searchInput");
const searchBtn=document.querySelector("#searchbtn");
const profileContainer=document.querySelector("#profileContainer");
const loading=document.querySelector("#loading");

const generateProfile=(profile)=>{
    return(
        `
        <div class="profile">
        <div class="top">
            <div class="left">
                <div class="avatar">
                    <img src="${profile.avatar_url}" alt="saurav"/>
                </div>
                <div class="self">
                    <h1>${profile.name}</h1>
                    <h1>${profile.login}</h1>
                </div>
            </div>
            <a href="${profile.html_url}" target="_blank">
            <button id="searchbtn">check profile</button>
            </a>
        </div>
        <div class="about">
            <h2>About</h2>
            <p>${profile.bio}</p>
        </div>
        <div class="status">
            <div class="status-item">
                <h2>Followers</h2>
                <p>${profile.followers}</p>
            </div>
            <div class="status-item">
                <h2>Following</h2>
                <p>${profile.following}</p>
            </div>
            <div class="status-item">
                <h2>Repos</h2>
                <p>${profile.public_repos}</p>
            </div>
        </div>
       </div>
       `
    );
};
const fetchProfile=async ()=>{
    const username=searchInput.value;
    loading.innerText="Loading....";
    loading.style.color="black";

    try{
        const res=await fetch(`${url}/${username}`);
        const data=await res.json();
        if(data.login){
            loading.innerText="";
            profileContainer.innerHTML=generateProfile(data);
        }else{
            loading.innerHTML=data.message;
            loading.style.color="red";
            profileContainer.innerText="";
        }
    }catch(error){
        loading.innerText="";
       
    }
}
function handleKeyPress(event) {
    if (event.keyCode === 13 || event.which === 13) {
        searchBtn.click();
    }
}

document.addEventListener('keypress', handleKeyPress);
searchBtn.addEventListener("click",fetchProfile);