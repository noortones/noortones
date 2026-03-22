// =========================
// 🎧 SONG DATA (EDIT HERE)
// =========================
const songs = [
  { name: "La Tahzanu Ala Ringtone Dawnload", file: "La_Tahzanu_Ala_naat_Ringtone_By_NOOR_TONES.mp3" },
  { name: "Naat 2", file: "tones/tone2.mp3" },
  { name: "Naat 3", file: "tones/tone3.mp3" },
  { name: "Naat 4", file: "tones/tone4.mp3" },
  { name: "Naat 5", file: "tones/tone5.mp3" }
];

// Auto duplicate to 100 items
while(songs.length < 100){
  songs.push(...songs);
}
songs.length = 100;


// =========================
// 📦 GLOBAL
// =========================
const list = document.getElementById("list");
let currentAudio = null;


// =========================
// 🏠 HOME PAGE CARDS
// =========================
if(list){

songs.forEach((s,i)=>{

  list.innerHTML += `
  <div class="card">

    <div class="play" onclick="playAudio(${i},this)">▶</div>

    <div class="info">
      <div class="title">${s.name}</div>

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

  // Ads every 6 cards
  if((i+1)%6===0){
    list.innerHTML += `<div class="ad">Ad Space</div>`;
  }

});

}


// =========================
// ▶ PLAY AUDIO
// =========================
function playAudio(i, btn){

const audio = document.getElementById("audio"+i);
const progress = document.getElementById("progress"+i);
const time = document.getElementById("time"+i);

// Stop previous
if(currentAudio && currentAudio !== audio){
  currentAudio.pause();
}

// Play / Pause
if(audio.paused){
  audio.play();
  btn.innerText="⏸";
  currentAudio = audio;
}else{
  audio.pause();
  btn.innerText="▶";
}

// Progress update
audio.ontimeupdate = ()=>{
  let p = (audio.currentTime / audio.duration) * 100;
  progress.style.width = p + "%";

  let s = Math.floor(audio.currentTime);
  time.innerText = "0:"+(s<10?"0"+s:s);
};

}


// =========================
// 🔗 OPEN DOWNLOAD PAGE
// =========================
function openPage(id){
location.href = "ringtone.html?id=" + id;
}


// =========================
// 📤 SHARE SYSTEM
// =========================
function sharePage(id){

const url = location.origin + "/ringtone.html?id=" + id;

if(navigator.share){
  navigator.share({
    title:"Noor Tons Ringtone",
    url:url
  });
}else{
  navigator.clipboard.writeText(url);
  alert("Link copied!");
}

}


// =========================
// 🔍 SEARCH SYSTEM
// =========================
const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("input", ()=>{

  const val = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card=>{
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(val) ? "flex" : "none";
  });

});

}


// =========================
// 🎧 RINGTONE PAGE
// =========================
const main = document.getElementById("main");

if(main){

const id = new URLSearchParams(location.search).get("id") || 0;
const song = songs[id];

// MAIN CARD
main.innerHTML = `
<div class="big-card">

<h2>${song.name}</h2>

<audio id="player" src="${song.file}"></audio>

<div class="controls">
  <button onclick="playMain()">▶</button>

  <div class="bar">
    <div id="progress"></div>
  </div>

  <span id="time">0:00</span>
</div>

<div class="btns">
  <button class="download" onclick="download()">⬇ Download</button>
  <button class="share" onclick="sharePage(${id})">Share 🔗</button>
</div>

</div>
`;


// RELATED
const related = document.getElementById("related");

if(related){

for(let i=0;i<10;i++){
if(i!=id){
related.innerHTML += `
<div class="card" onclick="openPage(${i})">
${songs[i].name}
</div>`;
}
}

}


// PLAYER
const audio = document.getElementById("player");
const progress = document.getElementById("progress");
const time = document.getElementById("time");

window.playMain = function(){
audio.paused ? audio.play() : audio.pause();
};

audio.ontimeupdate = ()=>{
let p = (audio.currentTime / audio.duration) * 100;
progress.style.width = p + "%";

let s = Math.floor(audio.currentTime);
time.innerText = "0:"+(s<10?"0"+s:s);
};


// DOWNLOAD (AD FEEL)
window.download = function(){
alert("Ad loading...");
setTimeout(()=>{
window.open(audio.src);
},1200);
};

}
