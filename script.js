const grid = document.getElementById("grid-container");
const searchInput = document.getElementById("searchInput");

// 🔥 REAL AUDIO LIST
let ringtones = [
  { name: "Azan", file: "./audio/1.mp3" },
  { name: "Naat", file: "./audio/2.mp3" },
  { name: "Nasheed", file: "./audio/3.mp3" },
  { name: "Takbeer", file: "./audio/4.mp3" },
  { name: "Allah Hu", file: "./audio/5.mp3" },
  { name: "SubhanAllah", file: "./audio/6.mp3" },
  { name: "Ya Nabi", file: "./audio/7.mp3" },
  { name: "Allahu Akbar", file: "./audio/8.mp3" }
];

// RENDER
function renderCards(list){
  grid.innerHTML = "";

  list.forEach((r,i)=>{

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div>${r.name}</div>
      <audio controls src="${r.file}"></audio>

      <button class="download" onclick="download('${r.file}')">Download</button>
      <button class="share" onclick="share()">Share</button>
      <button class="like" onclick="like('${r.name}')">❤</button>
    `;

    grid.appendChild(card);

    // ADS after 4 cards
    if((i+1)%4===0){
      let ad = document.createElement("div");
      ad.className="ad";
      ad.innerText="ADS HERE";
      grid.appendChild(ad);
    }

  });
}

// SEARCH
searchInput.addEventListener("input", e=>{
  let q = e.target.value.toLowerCase();
  let filtered = ringtones.filter(r=>r.name.toLowerCase().includes(q));
  renderCards(filtered);
});

// DOWNLOAD
function download(file){
  window.open(file);
}

// SHARE
function share(){
  if(navigator.share){
    navigator.share({
      title:"Noor Tones",
      url:window.location.href
    });
  } else {
    alert("Copy link to share");
  }
}

// LIKE
function like(name){
  alert(name + " saved");
}

// LOAD
renderCards(ringtones);
