function render(list){

  const container = document.getElementById("list");
  if(!container) return;

  container.innerHTML="";

  list.forEach((s,i)=>{

    container.innerHTML += `
    <div class="card">

      <div class="play" onclick="playAudio(${i})">▶</div>

      <div class="info">
        ${s.name}
        <audio id="audio${i}" src="${s.file}"></audio>
      </div>

      <div>
        <button class="download" onclick="openPage(${s.id})">⬇</button>
        <button class="share">🔗</button>
        <button class="save">❤️</button>
      </div>

    </div>
    `;

    if((i+1)%6===0){
      container.innerHTML += `<div class="ad">Ad Space</div>`;
    }

  });
}

function playAudio(i){
  let audio = document.getElementById("audio"+i);
  if(!audio) return;

  audio.paused ? audio.play() : audio.pause();
}

function openPage(id){
  location.href="ringtone.html?id="+id;
}

function filterTag(tag){
  if(tag==="All"){
    render(songs);
  }else{
    render(songs.filter(s=>s.category===tag));
  }
}

// SEARCH SAFE
const search = document.getElementById("search");
if(search){
  search.addEventListener("input",(e)=>{
    let val = e.target.value.toLowerCase();
    render(songs.filter(s=>s.name.toLowerCase().includes(val)));
  });
}

// INIT
if(typeof songs !== "undefined"){
  render(songs);
}
