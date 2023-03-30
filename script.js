// Intialize the Variable
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let audioElement = new Audio('Song/1.mp3');
let myProgressBar= document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let masterSongName = document.getElementById('masterSongName');


let Songs=[
    {songName:"295-Sidhu Moosewala", filePath:"./Song/1.mp3" ,coverPath:"Cover/295 cover.jpeg"},
    {songName:"Ijazat-Cover Song", filePath:"./Song/2.mp3" ,coverPath:"Cover/cover ijazat.jpg"},
    {songName:"Jai Shree Ram", filePath:"./Song/3.mp3" ,coverPath:"Cover/jai cover.jpeg"},
    {songName:"Kahani Suno 2.0", filePath:"./Song/4.mp3" ,coverPath:"Cover/Kahani-Suno cover.jpg"},
    {songName:"Maan Meri Jaan-King", filePath:"./Song/5.mp3" ,coverPath:"Cover/maan cover.jpeg"},
    {songName:"Manjha-Vishal Chopra", filePath:"./Song/6.mp3" ,coverPath:"Cover/manjha cover.jpg"},
    {songName:"Tera Saath-Talwinder", filePath:"./Song/7.mp3" ,coverPath:"Cover/nasha cover.jpeg"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath; 
    element.getElementsByClassName("songname")[0].innerText = Songs[i].songName; 
})

// Handle Pause/Play Click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./Song/${songIndex+1}.mp3`;
        masterSongName.innerText = Songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `./Song/${songIndex+1}.mp3`;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `./Song/${songIndex+1}.mp3`;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
