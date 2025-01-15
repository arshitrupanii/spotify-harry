const current_song = new Audio();

// this is footer play/pause button
let play_pause_footer = document.getElementsByClassName('playbar')[0].getElementsByClassName('play_pause')[0].getElementsByTagName('img')[0];


// getting all songs from the server location
async function getsongs() {
    let song_location = await fetch("/songs/")
    let responce = await song_location.text()
    let div = document.createElement('div')
    div.innerHTML = responce
    let anchor = div.getElementsByTagName('a')
    let songs = []

    for (let i = 0; i < anchor.length; i++) {
        const element = anchor[i];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href)
        }
    }
    return songs;
}

// for play songs
const playmusic = (path) => {
    play_pause_footer.src = 'svg/play.svg'  
    current_song.src = `/songs/${path}`;
    current_song.play()

    let song_name_footer = document.querySelector('.songname').innerHTML = path
}

// Function to get the next song
const getNextSong = (currentSong, songs) => {
    const currentIndex = songs.findIndex(song => song.includes(currentSong));
    const nextIndex = (currentIndex + 1) % songs.length;
    return songs[nextIndex].split('songs/')[1];
}


// for home page song cover page change 
let i = 1;
document.querySelectorAll('.card_photo').forEach((element) => {
    element.src = `cover_page/cover ${i++}.jpg`    
})
// console.log(photo);

function convertSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    // Format seconds to always be two digits (e.g., 05)
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
}



// this is the main function
async function main() {
    let song = await getsongs()
    current_song.src = song[0]

    let songlist = document.querySelector('.songlist').getElementsByTagName('ol')[0];

    // show all the song in playlist  
    for (const element of song) {
        let songName = element.replaceAll('%20', ' ').split('songs/')[1];
        songlist.innerHTML += `
                        <li class="flex align-item pointer">
                            <div class="flex align-item">
                                <img class="library_icon" src="library_photo/${songName}.jpg" alt="">
                                <div class="info">
                                    <div class="song_name">${songName}</div>
                                    <div class="artist_name">artist name </div>
                                </div>
                            </div>
                            <div class="flex align-item gap">
                                <img style="width: 32px;" src="https://img.icons8.com/?size=100&id=36067&format=png&color=FFFFFF" alt="">
                            </div>
                        </li>
        `;
    }


    // play the song when click on song name
    Array.from(document.querySelector('.songlist').getElementsByTagName('li')).forEach((e) => {
        let song_name = e.getElementsByClassName('info')[0].getElementsByClassName('song_name')[0].innerText;

        
        // attaching evenlistener to all songs
        e.addEventListener('click', () => {
            if(current_song.paused){      
                playmusic(song_name)
            }
            
            else{
                play_pause_footer.src = 'svg/pause.svg'
                current_song.pause()
            }
        })

        
    })
    
  
    // attaching even listener to play pause song
    play_pause_footer.addEventListener('click', () => {
        if(current_song.paused){
            play_pause_footer.src = 'svg/play.svg'
            current_song.play()
        }

        else{
            play_pause_footer.src = 'svg/pause.svg'
            current_song.pause()
        }
    })

    current_song.addEventListener('timeupdate', () => {
        document.querySelector('.songduration').innerHTML = `${convertSeconds(current_song.currentTime)}`
        document.querySelector('.circle').style.left = current_song.currentTime/current_song.duration * 100 + '%'
    })

    // Add event listener for when song ends
    current_song.addEventListener('ended', () => {
        const currentSongName = document.querySelector('.songname').innerHTML;
        const nextSongName = getNextSong(currentSongName, song);
        playmusic(nextSongName);
    });

    // for scrolling seekbar circle
    document.querySelector('.seekbar').addEventListener('click', (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector('.circle').style.left = percent + '%'
        current_song.currentTime = current_song.duration * (percent / 100)
    })

    document.querySelector('.humburg').addEventListener('click', (e) => {
        document.querySelector('.left').style.left = "0"
        document.querySelector('.left').style.backgroundColor = 'black'
        document.querySelector('.left').style.transition = "0.5s"
    })

    document.querySelector('.cross').addEventListener('click', (e) => {
        document.querySelector('.left').style.backgroundColor = 'white'
        document.querySelector('.left').style.transition = "0.5s"
    })
}

main()