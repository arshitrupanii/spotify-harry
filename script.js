async function getsongs() {
    let song_location = await fetch("http://127.0.0.1:5500/songs/")
    let responce = await song_location.text()
    let div = document.createElement('div')
    div.innerHTML = responce
    let anchor = div.getElementsByTagName('a')
    let songs = []

    for (let i = 0; i < anchor.length; i++) {
        const element = anchor[i];
        if(element.href.endsWith('.mp3')){
            songs.push(element.href)
        }
    }
    return songs;
}

async function main(){
    let song = await getsongs()
    console.log(song);

    let songlist = document.querySelector('.songlist').getElementsByTagName('ol')[0];

    for (const element of song) {
        let songName = element.replaceAll('%20', ' ').split('songs/')[1];
        songlist.innerHTML += `<li>${songName}</li>`;
    }
    

    let audio = new Audio(song[2])
    // await audio.play()

    audio.addEventListener("loadeddata" ,() => {
        let duration = audio.duration;
        console.log(duration);
    })

}

main()