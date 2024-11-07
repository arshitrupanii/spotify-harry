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

    let audio = new Audio(song[0])
    try {
        await audio.play();
        console.log("Playing:", songs[0]);
    } catch (error) {
        console.error("Error playing audio:", error);
        alert("Please click 'Play' to start audio.");
    }
}

main()