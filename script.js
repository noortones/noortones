// SONG DATA
const songs = [
  {name:"Ringtone 1",file:"tone1.mp3",category:"Islamic"},
  {name:"Ringtone 2",file:"tone2.mp3",category:"Nasheed"},
  {name:"Ringtone 3",file:"tone3.mp3",category:"Naat"},
  {name:"Ringtone 4",file:"tone4.mp3",category:"Iphone"},
  {name:"Ringtone 5",file:"tone5.mp3",category:"Notification"},
  {name:"Ringtone 6",file:"tone6.mp3",category:"Instagram"},
  {name:"Ringtone 7",file:"tone7.mp3",category:"Best"},
  {name:"Ringtone 8",file:"tone8.mp3",category:"Islamic"}
];

const grid = document.getElementById("grid");

// LOAD SONGS
function loadSongs(list){
  grid.innerHTML = "";

  list.forEach((s,i)=>{
    if(i===4){
      grid.innerHTML += `<div class="ad">Ads Here</div>`;
    }

    grid.innerHTML += `
    <div class="card">
      <div class="title">${s.name}</div>

      <audio controls src="${s.file}"></audio>

      <button class="download" onclick="download('${s.file}')">Download</button>
      <button class="share" onclick="share('${s.file}')">Share</button>
      <button class="like" onclick="save('${s.name}')">❤️</button>
    </div>`;
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

// SHARE (FIXED)
function share(file){
  const url = window.location.href;

  if(navigator.share){
    navigator.share({
      title:"Noor Tons",
      text:"Download ringtone from Noor Tons",
      url:url
    });
  }else{
    navigator.clipboard.writeText(url);
    alert("Link copied ✅");
  }
}

// SAVE (NO DUPLICATE)
function save(name){
  let saved = JSON.parse(localStorage.getItem("saved")) || [];

  if(!saved.includes(name)){
    saved.push(name);
    localStorage.setItem("saved", JSON.stringify(saved));
    alert("Saved ❤️");
  }else{
    alert("Already saved");
  }
}

// SEARCH
function searchRingtone(){
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = songs.filter(s => 
    s.name.toLowerCase().includes(value)
  );

  loadSongs(filtered);
}

// CATEGORY FILTER
function filterCategory(cat){
  const filtered = songs.filter(s => s.category === cat);
  loadSongs(filtered);
}
