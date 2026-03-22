const songs = [];

const categories = ["Naat","Nasheed","Trending","iPhone","Notification"];

for(let i=1;i<=100;i++){
  songs.push({
    id:i,
    name:"Ringtone "+i,
    file:"tone"+((i%5)+1)+".mp3", // demo reuse
    category:categories[i%5]
  });
}
