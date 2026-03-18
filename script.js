// WAIT FOR PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {

const songs = [
  {name:"La Tahzanu Ala Ringtone Download | BEst  Ringtone 2026",file:"La_Tahzanu_Ala_naat_Ringtone_By_NOOR_TONES.mp3",category:"Islamic" },
  {name:"YA ALI Ringtone Download | Best Mobile Ringtone ",file:"Ali_Ali_Mobile_Ringtone_By_NOOR_TONES.mp3",category:"Instagram"},
  {name:"Eta Kulli DA Ringtone Download",file:"Eta_Kulli_Da_Ringtone_By_NOOR_TONES.mp3",category:"Instagram"},
  {name:"Ringtone 4",file:"tone4.mp3",category:"Iphone"},
  {name:"Ringtone 5",file:"tone5.mp3",category:"Notification"},
  {name:"Ringtone 6",file:"tone6.mp3",category:"Instagram"},
  {name:"Ringtone 7",file:"tone7.mp3",category:"Best"},
  {name:"Ringtone 8",file:"tone8.mp3",category:"Islamic"},
  {name:"Ringtone 9",file:"tone8.mp3",category:"Islamic"},
  {name:"Ringtone 10",file:"tone8.mp3",category:"Islamic"},
  {name:"Ringtone 11",file:"tone8.mp3",category:"Islamic"},
  {name:"Ringtone 12",file:"tone8.mp3",category:"Islamic"}
];

const grid = document.getElementById("grid");

// LOAD FUNCTION
function loadSongs(list){
  grid.innerHTML = "";

  list.forEach((s,i)=>{

    // AD AFTER 4 CARDS
    if(i === 4){
      const ad = document.createElement("div");
      ad.className = "ad";
      ad.innerText = "Ads Here";
      grid.appendChild(ad); 
    
    }

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="title">${s.name}</div>
      <audio controls src="${s.file}"></audio>

      <button class="download">Download</button>
      <button class="share">Share</button>
      <button class="like">❤️</button>
    `;

    // BUTTON EVENTS
    card.querySelector(".download").onclick = () => download(s.file);
    card.querySelector(".share").onclick = () => share();
    card.querySelector(".like").onclick = () => save(s.name);

    grid.appendChild(card);
  });
}

// INITIAL LOAD
loadSongs(songs);

// DOWNLOAD
function download(file){
  alert("Ad loading...");
  setTimeout(()=>{
    window.open(file);
  },1500);
}

// SHARE
function share(){
  const url = window.location.href;

  if(navigator.share){
    navigator.share({
      title:"Noor Tons",
      url:url
    });
  }else{
    navigator.clipboard.writeText(url);
    alert("Link copied ✅");
  }
}

// SAVE
function save(name){
  let saved = JSON.parse(localStorage.getItem("saved")) || [];

  if(!saved.includes(name)){
    saved.push(name);
    localStorage.setItem("saved", JSON.stringify(saved));
    alert("Saved ❤️");
  }
}

// SEARCH
window.searchRingtone = function(){
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = songs.filter(s => 
    s.name.toLowerCase().includes(value)
  );

  loadSongs(filtered);
}

// FILTER
window.filterCategory = function(cat){
  const filtered = songs.filter(s => s.category === cat);
  loadSongs(filtered);
}

});
