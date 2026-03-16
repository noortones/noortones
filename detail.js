let params=new URLSearchParams(location.search)

let file=params.get("file")

fetch("ringtones.json")

.then(res=>res.json())

.then(data=>{

let tone=data.find(r=>r.file===file)

document.getElementById("title").innerText=tone.title

document.getElementById("player").src="audio/"+tone.file

document.getElementById("download").onclick=function(e){

e.preventDefault()

/* ADS_PLACE_DOWNLOAD */

window.open("ADS_PLACE_DOWNLOAD_LINK")

setTimeout(()=>{

window.location.href="audio/"+tone.file

},3000)

}

})
