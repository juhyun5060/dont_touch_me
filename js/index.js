function HowToPlay(){
    location.href="HowToPlay.html"
}

function start() {
    location.href="story.html"
}

function music() {
    var bgm = new Audio('');
    if(!bgm.canPlayType('audio/wav')) alert('브라우저가 wav 재생을 지원하지 않습니다.');
    else {
        var bgm_src="music/indexMusic.wav";
        btm = new Audio(bgm_src)
        bgm.play()
    }
}