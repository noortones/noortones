// ===== Sample Data =====
const ringtones = [
  {id:1,name:"Trending Ringtone 1",file:"audio/trending1.mp3",duration:"00:15"},
  {id:2,name:"Trending Ringtone 2",file:"audio/trending2.mp3",duration:"00:20"},
  // Add all 100 ringtones here
];

// ===== Render Cards =====
function renderPageCards(containerId, count){
  const container = document.getElementById(containerId);
  container.innerHTML="";
  for(let i=0;i<count;i++){
    const r = ringtones[i];
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <h3>${i+1}. ${r.name}</h3>
      <audio controls src="${r.file}"></audio>
      <div class="duration">${r.duration}</div>
      <button class="like" onclick="likeRingtone(${r.id})">❤ Like</button>
      <button class="share" onclick="shareRingtone('${r.name}')">🔗 Share</button>
      <button class="download" onclick="downloadRingtone('${r.file}')">⬇ Download</button>
      <div class="ad">ADS_PLACE_CARD</div>
    `;
    container.appendChild(card);
  }
}

// ===== Liked Cards =====
function renderLikedCards(containerId){
  const liked = JSON.parse(localStorage.getItem("likedRingtones")||"[]");
  const container = document.getElementById(containerId);
  container.innerHTML="";
  liked.forEach((r,i)=>{
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <h3>${i+1}. ${r.name}</h3>
      <audio controls src="${r.file}"></audio>
      <div class="duration">${r.duration}</div>
      <button class="share" onclick="shareRingtone('${r.name}')">🔗 Share</button>
      <button class="download" onclick="downloadRingtone('${r.file}')">⬇ Download</button>
    `;
    container.appendChild(card);
  });
}

// ===== Like Function =====
function likeRingtone(id){
  const r = ringtones.find(r=>r.id===id);
  let liked = JSON.parse(localStorage.getItem("likedRingtones")||"[]");
  if(!liked.find(x=>x.id===id)){ liked.push(r); localStorage.setItem("likedRingtones",JSON.stringify(liked)); alert("Added to Liked!"); }
}

// ===== Share Function =====
function shareRingtone(name){
  prompt("Share this ringtone URL:", window.location.href);
}

// ===== Download Function =====
function downloadRingtone(file){
  // Ads placeholder
  alert("ADS_PLACE_DOWNLOAD_LINK"); // Replace with your ad script if needed
  const a = document.createElement("a");
  a.href=file;
  a.download=file.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ===== Search Function =====
document.getElementById("search")?.addEventListener("input",(e)=>{
  const val=e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display = c.querySelector("h3").textContent.toLowerCase().includes(val) ? "block":"none";
  });
});
