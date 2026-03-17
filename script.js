// ===== SAMPLE RINGTONES =====
const ringtones = [
  {id:1,name:"Islamic Ringtone 1",file:"audio/1.mp3",duration:"00:15",tag:"Islamic"},
  {id:2,name:"Nasheed 1",file:"audio/2.mp3",duration:"00:20",tag:"Nasheed"},
  {id:3,name:"Naat 1",file:"audio/3.mp3",duration:"00:18",tag:"Naat"},
  {id:4,name:"iPhone 1",file:"audio/4.mp3",duration:"00:12",tag:"iPhone"},
  {id:5,name:"Instagram Viral 1",file:"audio/5.mp3",duration:"00:16",tag:"Instagram Viral Ringtone"},
  {id:6,name:"Best Ringtone 2026 1",file:"audio/6.mp3",duration:"00:20",tag:"Best Ringtone 2026"},
  {id:7,name:"New Ringtone 2026 1",file:"audio/7.mp3",duration:"00:15",tag:"New Ringtone 2026"},
  {id:8,name:"Islamic Ringtone 2",file:"audio/8.mp3",duration:"00:18",tag:"Islamic"}
];

// ===== RENDER CARDS =====
function renderPageCards(containerId,count){
  const container=document.getElementById(containerId);
  container.innerHTML="";
  const display=ringtones.slice(0,count);
  display.forEach((r,i)=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <h3>${i+1}. ${r.name}</h3>
      <audio controls src="${r.file}"></audio>
      <div class="duration">${r.duration}</div>
      <button class="save" onclick="saveRingtone(${r.id})">💾 Save</button>
      <button class="share" onclick="shareRingtone('${r.name}','${r.file}')">🔗 Share</button>
      <button class="download" onclick="downloadRingtone('${r.file}')">⬇ Download</button>
    `;
    container.appendChild(card);
  });
}

// ===== SAVE =====
function saveRingtone(id){
  const r=ringtones.find(r=>r.id===id);
  let saved=JSON.parse(localStorage.getItem("savedRingtones")||"[]");
  if(!saved.find(x=>x.id===id)){
    saved.push(r);
    localStorage.setItem("savedRingtones",JSON.stringify(saved));
    alert("Saved!");
  } else { alert("Already saved!"); }
}

// ===== SHARE =====
function shareRingtone(name,file){
  const url=window.location.href;
  if(navigator.share){
    navigator.share({title:name,text:"Check this Ringtone",url:url});
  } else {
    prompt("Copy this URL to share:",url);
  }
}

// ===== DOWNLOAD =====
function downloadRingtone(file){
  alert("ADS_PLACE_DOWNLOAD"); // placeholder
  const a=document.createElement("a");
  a.href=file;
  a.download=file.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ===== SEARCH =====
document.getElementById("search")?.addEventListener("input",(e)=>{
  const val=e.target.value.toLowerCase();
  document.querySelectorAll(".grid .card").forEach(c=>{
    c.style.display=c.querySelector("h3").textContent.toLowerCase().includes(val)?"block":"none";
  });
});

// ===== FILTER TAG =====
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
      <button class="save" onclick="saveRingtone(${r.id})">💾 Save</button>
      <button class="share" onclick="shareRingtone('${r.name}','${r.file}')">🔗 Share</button>
      <button class="download" onclick="downloadRingtone('${r.file}')">⬇ Download</button>
    `;
    container.appendChild(card);
  });
}
