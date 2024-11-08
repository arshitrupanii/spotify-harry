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

    let audio = new Audio(song[2])
    // await audio.play()

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(duration);
    })
}

main()