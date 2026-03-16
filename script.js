fetch("ringtones.json")

.then(res=>res.json())

.then(data=>{

let all=document.getElementById("all")
let trending=document.getElementById("trending")

data.forEach((r,i)=>{

let card=createCard(r)

all.appendChild(card)

if(i<6){

trending.appendChild(createCard(r))

}

})

document.getElementById("search").oninput=function(){

let q=this.value.toLowerCase()

document.querySelectorAll(".card").forEach(c=>{

let t=c.querySelector("h3").innerText.toLowerCase()

c.style.display=t.includes(q)?"block":"none"

})

}

})

function createCard(r){

let downloads=localStorage.getItem("dl_"+r.file)||0
let likes=localStorage.getItem("like_"+r.file)||0

let card=document.createElement("div")

card.className="card"

card.innerHTML=`

<h3>${r.title}</h3>

<audio src="audio/${r.file}" controls></audio>

<div class="duration">⏱ ${r.duration}s</div>

<div class="counter">⬇ ${downloads} downloads</div>

<div class="actions">

<span class="like">❤️ ${likes}</span>

<span class="share">🔗</span>

</div>

<a class="download" href="audio/${r.file}" download>Download</a>

<div class="tags">

${r.tags.map(t=>`<span class="tag">${t}</span>`).join("")}

</div>

`

/* like */

card.querySelector(".like").onclick=function(){

likes++

localStorage.setItem("like_"+r.file,likes)

this.innerText="❤️ "+likes

}

/* share */

card.querySelector(".share").onclick=function(){

navigator.share({

title:r.title,
url:location.href

})

}

/* download counter */

card.querySelector(".download").onclick=function(){

downloads++

localStorage.setItem("dl_"+r.file,downloads)

}

/* tag filter */

card.querySelectorAll(".tag").forEach(tag=>{

tag.onclick=function(){

let t=this.innerText.toLowerCase()

document.querySelectorAll(".card").forEach(c=>{

let tags=c.innerText.toLowerCase()

c.style.display=tags.includes(t)?"block":"none"

})

}

})

return card

}
