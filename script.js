const current_song = new Audio();
// this is footer play/pause button
let play_pause_footer = document.getElementsByClassName('playbar')[0].getElementsByClassName('play_pause')[0].getElementsByTagName('img')[0];


// getting all songs from the server location
async function getsongs() {
    let song_location = await fetch("http://127.0.0.1:5500/songs/")
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
    current_song.src =`/songs/${path}`
    current_song.play()


    document.querySelector('.songposter').src = 'https://img.icons8.com/?size=100&id=q2W9owAsM5vd&format=png&  color=FFFFFF' 
    document.querySelector('.songname').innerHTML = path.replaceAll(('.mp3'), '')
    document.querySelector('.songduration').innerHTML = `00:00 `
}


// this is the main function
async function main() {
    let song = await getsongs()

    let songlist = document.querySelector('.songlist').getElementsByTagName('ol')[0];

    // show all the song in playlist  
    for (const element of song) {
        let songName = element.replaceAll('%20', ' ').split('songs/')[1];
        songlist.innerHTML += `
                        <li class="flex align-item pointer">
                            <div class="flex align-item">
                                <img class="invert" src="https://img.icons8.com/?size=100&id=q2W9owAsM5vd&format=png&  color=FFFFFF" alt="">
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

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(duration);
    // })    

    // play the song when click on song name
    Array.from(document.querySelector('.songlist').getElementsByTagName('li')).forEach((e) => {
        let song_name = e.getElementsByClassName('info')[0].getElementsByClassName('song_name')[0].innerText;
    
        let play_pause_sidebar_btn = e.getElementsByClassName('flex align-item gap')[0].getElementsByTagName('img')[0];
        
        // attaching evenlistener to all songs
        e.addEventListener('click', () => {
            if(current_song.paused){
                play_pause_sidebar_btn.src = 'https://img.icons8.com/?size=100&id=36268&format=png&color=FFFFFF'
                playmusic(song_name)
            }

            else{
                play_pause_sidebar_btn.src = 'https://img.icons8.com/?size=100&id=36067&format=png&color=FFFFFF'
                current_song.pause()
            }
        })

        // attaching even listener to play pause song
        
    })

    
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

}

main()