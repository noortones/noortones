// =======================
// 🎧 AUTO FILE SYSTEM
// =======================

// 👉 जितनी files हैं उतनी range रख
const totalSongs = 100;

const songs = [];

for(let i=1; i<=totalSongs; i++){

  let fileName = "tone" + i + ".mp3"; // default

  songs.push({
    file: "tones/" + fileName,
    name: formatName(fileName),
    category: autoCategory(fileName)
  });

}

// =======================
// 🧠 NAME FORMAT
// =======================
function formatName(file){
return file
.replace(".mp3","")
.replace(/-/g," ")
.replace(/\b\w/g,c=>c.toUpperCase());
}

// =======================
// 📂 AUTO CATEGORY
// =======================
function autoCategory(file){

file = file.toLowerCase();

if(file.includes("naat")) return "naat";
if(file.includes("nasheed")) return "nasheed";
if(file.includes("iphone")) return "iphone";
if(file.includes("arabic")) return "arabic";

return "notification";
}

// =======================
// 📦 GLOBAL
// =======================
const list = document.getElementById("list");
let currentAudio = null;
let loaded = 0;
const perLoad = 12;

// =======================
// 🏠 LOAD CARDS
// =======================
function loadSongs(){

for(let i=loaded; i<loaded+perLoad && i<songs.length; i++){

let s = songs[i];

list.innerHTML += `
<div class="card" data-cat="${s.category}">

<div class="play" onclick="playAudio(${i},this)">▶</div>

<div class="info">
<div>${s.name}</div>

<div class="progress-bar">
<div class="progress" id="progress${i}"></div>
</div>

<div class="time" id="time${i}">0:00</div>

<audio id="audio${i}" preload="none"></audio>
</div>

<div class="actions">
<button class="download" onclick="openPage(${i})">⬇ Download</button>
<button class="share" onclick="sharePage(${i})">Share 🔗</button>
</div>

</div>
`;

if((i+1)%6===0){
list.innerHTML += `<div class="ad">Ad Space</div>`;
}

}

loaded += perLoad;
}

if(list){ loadSongs(); }

// =======================
// 📜 SCROLL LOAD
// =======================
window.addEventListener("scroll", ()=>{
if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200){
loadSongs();
}
});

// =======================
// ▶ PLAY
// =======================
function playAudio(i,btn){

const audio = document.getElementById("audio"+i);
const progress = document.getElementById("progress"+i);
const time = document.getElementById("time"+i);

if(!audio.src){
audio.src = songs[i].file;
}

if(currentAudio && currentAudio !== audio){
currentAudio.pause();
}

if(audio.paused){
audio.play().catch(()=>alert("Tap again 🔊"));
btn.innerText="⏸";
currentAudio=audio;
}else{
audio.pause();
btn.innerText="▶";
}

audio.ontimeupdate=()=>{
if(audio.duration){
let p=(audio.currentTime/audio.duration)*100;
progress.style.width=p+"%";

let s=Math.floor(audio.currentTime);
time.innerText="0:"+(s<10?"0"+s:s);
}
};
}

// =======================
// 🔗 OPEN PAGE
// =======================
function openPage(id){
location.href="ringtone.html?id="+id;
}

// =======================
// 📤 SHARE
// =======================
function sharePage(id){
const url=location.origin+"/ringtone.html?id="+id;

if(navigator.share){
navigator.share({url});
}else{
navigator.clipboard.writeText(url);
alert("Link copied!");
}
}
