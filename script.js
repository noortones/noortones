// =======================
// 🎧 AUTO SONG SYSTEM
// =======================
const songs = [];

for(let i=1; i<=100; i++){
  songs.push({
    name: "Ringtone " + i,
    file: "tones/tone" + i + ".mp3",
    category: getCategory(i)
  });
}

function getCategory(i){
  if(i<=20) return "naat";
  if(i<=40) return "nasheed";
  if(i<=60) return "arabic";
  if(i<=80) return "iphone";
  return "notification";
}

// =======================
// 📦 GLOBAL
// =======================
const list = document.getElementById("list");
let currentAudio = null;

// =======================
// 🏠 HOME PAGE LOAD
// =======================
if(list){
songs.forEach((s,i)=>{

list.innerHTML += `
<div class="card" data-cat="${s.category}">

<div class="play" onclick="playAudio(${i},this)">▶</div>

<div class="info">
<div>${s.name}</div>

<div class="progress-bar">
<div class="progress" id="progress${i}"></div>
</div>

<div class="time" id="time${i}">0:00</div>

<audio id="audio${i}" preload="none" src="${s.file}"></audio>
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

});
}

// =======================
// ▶ PLAY (OPTIMIZED)
// =======================
function playAudio(i,btn){

const audio = document.getElementById("audio"+i);
const progress = document.getElementById("progress"+i);
const time = document.getElementById("time"+i);

// stop old audio
if(currentAudio && currentAudio !== audio){
currentAudio.pause();
}

// play / pause
if(audio.paused){
audio.play().catch(()=>{
alert("Tap again 🔊");
});
btn.innerText="⏸";
currentAudio=audio;
}else{
audio.pause();
btn.innerText="▶";
}

// progress
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

// =======================
// 🔍 SEARCH
// =======================
document.querySelector("input")?.addEventListener("input",e=>{
let val=e.target.value.toLowerCase();

document.querySelectorAll(".card").forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(val)?"flex":"none";
});
});

// =======================
// 📂 CATEGORY
// =======================
function filterCategory(cat){
document.querySelectorAll(".card").forEach(card=>{
card.style.display = (cat==="all"||card.dataset.cat===cat) ? "flex":"none";
});
}

// =======================
// 🎧 DOWNLOAD PAGE
// =======================
const main=document.getElementById("main");

if(main){
const id=new URLSearchParams(location.search).get("id")||0;
const song=songs[id];

main.innerHTML=`
<div class="big-card">

<h2>${song.name}</h2>

<audio controls preload="none" src="${song.file}"></audio>

<div class="actions">
<button class="download" onclick="download()">⬇ Download</button>
<button class="share" onclick="sharePage(${id})">Share 🔗</button>
</div>

</div>
`;

window.download=()=>{
alert("Ad loading...");
setTimeout(()=>{
window.open(song.file);
},1200);
};

}
