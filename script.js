fetch("ringtones.json")

.then(res=>res.json())

.then(data=>{

let container=document.getElementById("ringtone-list")

data.forEach(r=>{

let card=document.createElement("div")

card.className="card"

card.innerHTML=`

<h3>${r.title}</h3>

<audio controls src="audio/${r.file}"></audio>

<a class="download" href="audio/${r.file}" download>Download</a>

`

container.appendChild(card)

})

})
