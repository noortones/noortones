fetch("./ringtones.json")
.then(res=>res.json())
.then(data=>{
  let all=document.getElementById("all")
  let trending=document.getElementById("trending")

  data.forEach(r=>{
    let card=document.createElement("div")
    card.className="card"
    card.innerHTML=`
      <h3>${r.title}</h3>
      <audio src="./audio/${r.file}" controls></audio>
      <div>⏱ ${r.duration}s</div>
      <button class="download">Download</button>
    `

    card.querySelector(".download").onclick=function(e){
      e.preventDefault()
      window.open("ADS_PLACE_DOWNLOAD_LINK")
      setTimeout(()=>{window.location.href="./audio/"+r.file},3000)
    }

    card.onclick=function(){
      window.location.href="./ringtone.html?file="+r.file
    }

    all.appendChild(card)
    if(r.trending){ trending.appendChild(card.cloneNode(true)) }
  })
})

// Search filter
document.getElementById("search").addEventListener("input",function(){
  let val=this.value.toLowerCase()
  document.querySelectorAll(".card").forEach(card=>{
    card.style.display = card.querySelector("h3").innerText.toLowerCase().includes(val) ? "" : "none"
  })
})

function filterCategory(cat){
  document.querySelectorAll(".card").forEach(card=>{
    if(cat=="all"){ card.style.display="" }
    else{ card.style.display=card.querySelector("audio").src.includes(cat)?"":"none" }
  })
}
