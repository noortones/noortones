const songs = [
{ name:"Naat 1", file:"tones/naat1.mp3", category:"naat" },
{ name:"Naat 2", file:"tones/naat2.mp3", category:"naat" },
{ name:"Nasheed 1", file:"tones/nasheed1.mp3", category:"nasheed" },
{ name:"Arabic 1", file:"tones/arabic1.mp3", category:"arabic" },
{ name:"iPhone Tone", file:"tones/iphone1.mp3", category:"iphone" },
{ name:"Notification", file:"tones/noti1.mp3", category:"notification" }
];

while(songs.length < 100){ songs.push(...songs); }
songs.length = 100;

const list = document.getElementById("list");
let currentAudio = null;

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

<audio id="audio${i}" src="${s.file}"></audio>
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

// PLAY
function playAudio(i,btn){
const audio=document.getElementById("audio"+i);
const progress=document.getElementById("progress"+i);
const time=document.getElementById("time"+i);

if(currentAudio && currentAudio!==audio){
currentAudio.pause();
}

if(audio.paused){
audio.play(); btn.innerText="⏸"; currentAudio=audio;
}else{
audio.pause(); btn.innerText="▶";
}

audio.ontimeupdate=()=>{
let p=(audio.currentTime/audio.duration)*100;
progress.style.width=p+"%";
let s=Math.floor(audio.currentTime);
time.innerText="0:"+(s<10?"0"+s:s);
};
}

// FILTER
function filterCategory(cat){
document.querySelectorAll(".card").forEach(card=>{
card.style.display = (cat==="all"||card.dataset.cat===cat) ? "flex":"none";
});
}

// SEARCH
document.querySelector("input")?.addEventListener("input",e=>{
let val=e.target.value.toLowerCase();
document.querySelectorAll(".card").forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(val)?"flex":"none";
});
});

// SHARE
function sharePage(id){
const url=location.origin+"/ringtone.html?id="+id;
navigator.share ? navigator.share({url}) :
navigator.clipboard.writeText(url);
}

// OPEN
function openPage(id){
location.href="ringtone.html?id="+id;
}

// RINGTONE PAGE
const main=document.getElementById("main");

if(main){
const id=new URLSearchParams(location.search).get("id")||0;
const song=songs[id];

main.innerHTML=`
<div class="big-card">
<h2>${song.name}</h2>

<audio id="player" src="${song.file}"></audio>

<button onclick="player.play()">▶ Play</button>
<button class="download" onclick="download()">⬇ Download</button>
<button class="share" onclick="sharePage(${id})">Share 🔗</button>
</div>
`;

window.download=()=>{
alert("Ad loading...");
setTimeout(()=>window.open(song.file),1200);
};
}
