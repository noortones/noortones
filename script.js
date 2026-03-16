const ringtones = [

{
title:"iPhone Reflection",
file:"iphone.mp3",
duration:"25",
category:"iphone",
trending:true
},

{
title:"Notification Tone",
file:"notify.mp3",
duration:"10",
category:"notification"
}

]

let all=document.getElementById("all")
let trending=document.getElementById("trending")

ringtones.forEach(r=>{

let card=document.createElement("div")

card.className="card"

card.innerHTML=`

<h3>${r.title}</h3>

<audio src="audio/${r.file}" controls></audio>

<div>⏱ ${r.duration}s</div>

<button class="download">Download</button>

`

card.querySelector(".download").onclick=function(e){

e.preventDefault()

window.open("ADS_PLACE_DOWNLOAD_LINK")

setTimeout(()=>{

window.location.href="audio/"+r.file

},3000)

}

card.onclick=function(){

window.location.href="ringtone.html?file="+r.file

}

all.appendChild(card)

if(r.trending){

trending.appendChild(card.cloneNode(true))

}

})
