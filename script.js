console.log("start js first project");

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
    console.log(anchor);
    console.log(songs);

}

getsongs()
