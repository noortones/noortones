function toggleMenu(){
  menu.classList.toggle("show");
  overlay.classList.toggle("show");
}

const songs=[
{name:"Ringtone 1",file:"tone1.mp3"},
{name:"Ringtone 2",file:"tone2.mp3"},
{name:"Ringtone 3",file:"tone3.mp3"},
{name:"Ringtone 4",file:"tone4.mp3"},
{name:"Ringtone 5",file:"tone5.mp3"},
{name:"Ringtone 6",file:"tone6.mp3"},
{name:"Ringtone 7",file:"tone7.mp3"},
{name:"Ringtone 8",file:"tone8.mp3"}
];

const grid=document.getElementById("grid");

songs.forEach((s,i)=>{
  if(i===4){
    grid.innerHTML+=`<div class="ad">Ads Here</div>`;
  }

  grid.innerHTML+=`
  <div class="card">
    <div class="title">${s.name}</div>
    <audio controls src="${s.file}"></audio>

    <button class="download" onclick="download('${s.file}')">Download</button>
    <button class="share" onclick="share('${s.file}')">Share</button>
    <button class="like" onclick="save('${s.name}')">❤️</button>
  </div>`;
});

/* DOWNLOAD WITH AD FEEL */
function download(file){
  alert("Ad loading...");
  setTimeout(()=>{
    window.open(file);
  },1500);
}

/* SHARE */
function share(file){
  if(navigator.share){
    navigator.share({
      title:"Noor Tons",
      url:file
    });
  }else{
    alert("Sharing not supported");
  }
}

/* SAVE */
function save(name){
  let saved=JSON.parse(localStorage.getItem("saved"))||[];
  saved.push(name);
  localStorage.setItem("saved",JSON.stringify(saved));
  alert("Saved ❤️");
}
