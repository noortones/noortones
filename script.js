const songs=[
{name:"Ringtone 1",file:"tone1.mp3"},
{name:"Ringtone 2",file:"tone2.mp3"},
{name:"Ringtone 3",file:"tone3.mp3"},
{name:"Ringtone 4",file:"tone4.mp3"},
{name:"Ringtone 5",file:"tone5.mp3"},
{name:"Ringtone 6",file:"tone6.mp3"},
{name:"Ringtone 7",file:"tone7.mp3"},
{name:"Ringtone 8",file:"tone8.mp3"}
];

const grid=document.getElementById("grid");

songs.forEach((s,i)=>{

  grid.innerHTML+=`
  <div class="card" onclick="openPage(${i})">
    <div class="title">${s.name}</div>
    <audio controls src="${s.file}"></audio>

    <button class="download" onclick="event.stopPropagation();download('${s.file}')">Download</button>
    <button class="share" onclick="event.stopPropagation();share('${s.file}')">Share</button>
    <button class="like" onclick="event.stopPropagation();save('${s.name}')">❤️</button>
  </div>`;

  // ADS AFTER EVERY 4
  if((i+1)%4===0){
    grid.innerHTML+=`<div class="ad">Ads Here</div>`;
  }

});

function openPage(id){
  window.location.href="ringtone.html?id="+id;
}

function download(file){
  alert("Ad loading...");
  setTimeout(()=>{
    window.open(file);
  },1000);
}

function share(file){
  if(navigator.share){
    navigator.share({
      title:"Noor Tons",
      url:window.location.href
    });
  }else{
    alert("Sharing not supported");
  }
}

function save(name){
  alert("Saved ❤️");
}
