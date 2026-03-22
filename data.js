const songs = [];

const categories = ["Naat","Nasheed","Trending","iPhone","Notification"];

for(let i=1;i<=20;i++){  // abhi 20 test ke liye
  songs.push({
    id:i,
    name:"Ringtone "+i,
    file:"tone1.mp3",
    category:categories[i%5]
  });
}
