const grid = document.getElementById('grid-container');
const overlay = document.getElementById('overlay');

let ringtones = [];

// TEST DATA
for(let i=1;i<=12;i++){
  ringtones.push({
    name:`Ringtone ${i}`,
    file:`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`
  });
}

// RENDER
function renderCards(items){
  grid.innerHTML = '';

  items.forEach((r,i)=>{

    let card = document.createElement('div');
    card.className='card';

    card.innerHTML = `
      <div>${r.name}</div>
      <audio controls src="${r.file}"></audio>

      <button class="download" onclick="download('${r.file}')">Download</button>
      <button class="share" onclick="share()">Share</button>
      <button class="like" onclick="like('${r.name}')">❤</button>
    `;

    grid.appendChild(card);

    // 🔥 ADS FIX (working)
    if((i+1)%4===0){
      let ad = document.createElement('div');
      ad.className='ad';
      ad.innerText='ADS HERE';
      grid.appendChild(ad);
    }

  });
}

// MENU FIX
function toggleMenu(){
  document.getElementById('side-menu').classList.toggle('show');
  overlay.classList.toggle('show');
}

// DOWNLOAD
function download(file){
  window.open(file);
}

// SHARE
function share(){
  if(navigator.share){
    navigator.share({title:"Noor Tones",url:window.location.href});
  }else{
    alert("Share not supported");
  }
}

// LIKE
function like(name){
  alert(name + " saved");
}

// LOAD
renderCards(ringtones);
