import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCO918f489CV0N8O9oC4pTEnZX5n9RYUeI",
  authDomain: "noor--tones.firebaseapp.com",
  databaseURL: "https://noor--tones-default-rtdb.firebaseio.com/",
  projectId: "noor--tones",
  appId: "1:618513611591:web:7591d35887caec60fe6a62"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const list = document.getElementById("list");

onValue(ref(db, "ringtones"), (snapshot) => {

list.innerHTML = "";

const data = snapshot.val();

if(!data){
list.innerHTML = "<h3 style='text-align:center'>No ringtones found</h3>";
return;
}

for(let id in data){

let s = data[id];

list.innerHTML += `
<div class="card">

<div class="play" onclick="play('${s.file}',this)">▶</div>

<div>${s.name}</div>

<a href="ringtone.html?file=${s.file}&name=${s.name}">Open</a>

</div>
`;

}

});

// PLAY
window.play = (src,btn)=>{
let audio = new Audio(src);
audio.play();
btn.innerText="⏸";
};
