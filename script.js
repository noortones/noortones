// ===== SAMPLE RINGTONES (100 total, example 10 shown here) =====
const ringtones = [
  {id:1,name:"Trending Ringtone 1",file:"audio/trending1.mp3",duration:"00:15",tag:"Trending"},
  {id:2,name:"Trending Ringtone 2",file:"audio/trending2.mp3",duration:"00:20",tag:"Trending"},
  {id:3,name:"iPhone Ringtone 1",file:"audio/iphone1.mp3",duration:"00:18",tag:"iPhone Ringtone"},
  {id:4,name:"Notification 1",file:"audio/notification1.mp3",duration:"00:12",tag:"Notification"},
  {id:5,name:"Islamic Ringtone 1",file:"audio/islamic1.mp3",duration:"00:25",tag:"Islamic Ringtone"},
  {id:6,name:"Nasheed 1",file:"audio/nasheed1.mp3",duration:"00:30",tag:"Nasheed Ringtone"},
  {id:7,name:"Instagram Trending 1",file:"audio/instagram1.mp3",duration:"00:15",tag:"Instagram Trending"},
  {id:8,name:"Classic 1",file:"audio/classic1.mp3",duration:"00:22",tag:"Classic"},
  {id:9,name:"Other 1",file:"audio/other1.mp3",duration:"00:19",tag:"Other"},
  {id:10,name:"iPhone Notification 1",file:"audio/iphonenotification1.mp3",duration:"00:10",tag:"iPhone Notification"}
  // Add remaining up to 100
];

// ===== RENDER CARDS =====
function renderPageCards(containerId, count){
  const container=document.getElementById(containerId);
  container.innerHTML="";
  const displayRingtones = ringtones.slice(0,count);
  displayRingtones.forEach((r,i)=>{
    const card=document.createElement("div");
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
  });
}

// ===== LIKE FUNCTION =====
function likeRingtone(id){
  const r=ringtones.find(r=>r.id===id);
  let liked=JSON.parse(localStorage.getItem("likedRingtones")||"[]");
  if(!liked.find(x=>x.id===id)){ liked.push(r); localStorage.setItem("likedRingtones",JSON.stringify(liked)); alert("Added to Liked!"); }
}

// ===== SHARE FUNCTION =====
function shareRingtone(name){ prompt("Share this ringtone URL:", window.location.href); }

// ===== DOWNLOAD FUNCTION =====
function downloadRingtone(file){
  alert("ADS_PLACE_DOWNLOAD_LINK"); // replace with real ad script
  const a=document.createElement("a");
  a.href=file;
  a.download=file.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ===== SEARCH FUNCTION =====
document.getElementById("search")?.addEventListener("input",(e)=>{
  const val=e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display=c.querySelector("h3").textContent.toLowerCase().includes(val)?"block":"none";
  });
});

// ===== FILTER TAGS =====
function filterTag(tag){
  const container=document.getElementById("grid-container");
  container.innerHTML="";
  const filtered=ringtones.filter(r=>r.tag===tag);
  filtered.forEach((r,i)=>{
    const card=document.createElement("div");
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
  });
}

// ===== RENDER LIKED CARDS =====
function renderLikedCards(containerId){
  const liked=JSON.parse(localStorage.getItem("likedRingtones")||"[]");
  const container=document.getElementById(containerId);
  container.innerHTML="";
  liked.forEach((r,i)=>{
    const card=document.createElement("div");
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
