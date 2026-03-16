let params=new URLSearchParams(location.search)
let file=params.get("file")

fetch("./ringtones.json")
.then(res=>res.json())
.then(data=>{
  let tone=data.find(r=>r.file===file)
  document.getElementById("title").innerText=tone.title
  document.getElementById("player").src="./audio/"+tone.file
  document.getElementById("download").onclick=function(e){
    e.preventDefault()
    window.open("ADS_PLACE_DOWNLOAD_LINK")
    setTimeout(()=>{window.location.href="./audio/"+tone.file},3000)
  }

  // Related ringtones
  let related=document.getElementById("related")
  data.filter(r=>r.tags.includes(tone.tags[0]) && r.file!==tone.file)
      .forEach(r=>{
        let card=document.createElement("div")
        card.className="card"
        card.innerHTML=`
          <h4>${r.title}</h4>
          <audio src="./audio/${r.file}" controls></audio>
          <button class="download">Download</button>
        `
        card.querySelector(".download").onclick=function(e){
          e.preventDefault()
          window.open("ADS_PLACE_DOWNLOAD_LINK")
          setTimeout(()=>{window.location.href="./audio/"+r.file},3000)
        }
        card.onclick=function(){ window.location.href="./ringtone.html?file="+r.file }
        related.appendChild(card)
      })
})
