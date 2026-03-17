const grid = document.getElementById('grid-container');
const searchInput = document.getElementById('searchInput');

let ringtones = [];

for(let i=1;i<=20;i++){
  ringtones.push({
    name:`Ringtone ${i}`,
    file:`./audio/${i}.mp3`
  });
}

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

    // ADS after every 4 cards
    if((i+1)%4===0){
      let ad = document.createElement('div');
      ad.className='ad';
      ad.innerText='ADS_PLACE_MIDDLE';
      grid.appendChild(ad);
    }

  });
}

// DOWNLOAD
function download(file){
  let a=document.createElement('a');
  a.href=file;
  a.download='';
  a.click();
}

// SHARE
function share(){
  if(navigator.share){
    navigator.share({
      title:"Noor Tones",
      url:window.location.href
    });
  }else{
    prompt("Copy:",window.location.href);
  }
}

// LIKE
function like(name){
  let data=JSON.parse(localStorage.getItem('liked'))||[];
  if(!data.includes(name)){
    data.push(name);
    localStorage.setItem('liked',JSON.stringify(data));
    alert("Saved!");
  }
}

// SEARCH
searchInput.addEventListener('input',e=>{
  let q=e.target.value.toLowerCase();
  renderCards(ringtones.filter(r=>r.name.toLowerCase().includes(q)));
});

// MENU
function toggleMenu(){
  document.getElementById('side-menu').classList.toggle('show');
}

// LOAD
renderCards(ringtones);
