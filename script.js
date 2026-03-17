const grid = document.getElementById('grid-container');
const searchInput = document.getElementById('searchInput');
const categories = document.querySelectorAll('.categories span');

// Sample 15 ringtones
let ringtones = [];
const tags = ["Islamic","Nasheed","Naat","iPhone","Notification","IslamicNotification","InstagramViral"];
for(let i=1;i<=15;i++){
  ringtones.push({
    name: `Ringtone ${i}`,
    file: `./audio/${i}.mp3`,
    duration: `${Math.floor(Math.random()*3)+1}:0${Math.floor(Math.random()*6)}`,
    tag: tags[i%tags.length]
  });
}

// Render Cards
function renderCards(items){
  grid.innerHTML = '';
  items.forEach((r,i)=>{
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="title">${r.name}</div>
      <audio controls src="${r.file}"></audio>
      <div class="duration">${r.duration}</div>
      <button class="download" onclick="download('${r.file}')">Download</button>
      <button class="share" onclick="share('${r.name}','${r.file}')">Share</button>
      <button class="like" onclick="like('${r.name}')">❤</button>
    `;
    grid.appendChild(card);
  });
}

// Download Function
function download(file){
  const a = document.createElement('a');
  a.href = file;
  a.download = file.split('/').pop();
  a.click();
}

// Share Function
function share(name,file){
  if(navigator.share){
    navigator.share({title:name,url:file});
  }else{
    prompt('Copy URL:', file);
  }
}

// Like Function
function like(name){
  let saved = JSON.parse(localStorage.getItem('liked')) || [];
  if(!saved.includes(name)){
    saved.push(name);
    localStorage.setItem('liked', JSON.stringify(saved));
    alert(`${name} saved!`);
  }
}

// Filter by search
searchInput.addEventListener('input', e=>{
  const q = e.target.value.toLowerCase();
  renderCards(ringtones.filter(r=>r.name.toLowerCase().includes(q)));
});

// Filter by tags
categories.forEach(cat=>{
  cat.addEventListener('click',()=>{
    const tag = cat.getAttribute('data-tag');
    renderCards(ringtones.filter(r=>r.tag===tag));
  });
});

// Side Menu
function toggleMenu(){
  document.getElementById('side-menu').classList.toggle('show');
}

// Initial render
renderCards(ringtones);
