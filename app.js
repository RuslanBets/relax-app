const time = document.querySelector('.time');
const buttons = document.querySelector('.buttons');
const buttonPlay = document.querySelector('.button-play');
const video = document.querySelector('.video__item');
const audio = document.querySelector('.audio');
const moodGreen = document.querySelector('._green');
const moodBlue = document.querySelector('._blue');

const circle = document.querySelector('.circle')
let lineLength = circle.getTotalLength()
circle.style.strokeDasharray = lineLength
circle.style.strokeDashoffset = lineLength
let progress;
let lineSong;
let timeSeconds = 600

let flag = true;
let timeLeft = 600000
let intervalId;
let intervalId2;
let lastUpdateTime;


let data = {
	time: time.innerHTML,
	btnPlayOrStop: "./icon.svg/play.svg",
	btn: '10:00'
};

buttons.addEventListener('click', event => {
	if (event.target.localName == 'button') {
		let num = event.target.innerHTML.split(' ')[0];
		time.innerHTML = num + ':' + '00';
		data.time = time.innerHTML;
		data.btn = `${event.target.innerHTML.split(' ')[0]}:00`
		timeLeft = Number(event.target.innerHTML.split(' ')[0]) * 60000
		timeSeconds = timeLeft / 1000
		circle.style.strokeDashoffset = lineLength
		audio.currentTime = 0
	}
});

buttonPlay.addEventListener('click', () => {
	if (flag) {
		buttonPlay.src = "./icon.svg/pause.svg";
		flag = false;
		data.btnPlayOrStop = "./icon.svg/pause.svg";
		video.play();
		audio.play();
		lastUpdateTime = Date.now()
		intervalId = setInterval(timer, 100)

	} else if (!flag) {
		buttonPlay.src = "./icon.svg/play.svg";
		flag = true;
		data.btnPlayOrStop = "./icon.svg/play.svg";
		video.pause();
		audio.pause();
		clearInterval(intervalId)
	}
});

moodGreen.onclick = () => {
	video.children[0].src = "./video/video-forest.webm";
	video.children[1].src = "./video/video-forest.mp4";
	audio.src = "./music/forest.mp3"
	video.load()
}
moodBlue.onclick = () => {
	video.children[0].src = "./video/video-maunt.webm";
	video.children[1].src = "./video/video-maunt.mp4";
	audio.src = "./music/maunt.mp3"
	video.load()
}

function timer() {
	const now = Date.now()
	const timePassed = now - lastUpdateTime;
	if (timeLeft > timePassed) {
		timeLeft -= timePassed
	} else {
		timeLeft = 0
		clearInterval(intervalId)
		audio.pause()
		video.pause()
		buttonPlay.src = "./icon.svg/play.svg"
		audio.currentTime = 0
	}
	lastUpdateTime = now
	let min = Math.floor(timeLeft / 1000 / 60) % 60
	let sec = Math.floor(timeLeft / 1000) % 60
	if (min < 10) {
		min = '0' + min
	}
	if (sec < 10) {
		sec = '0' + sec
	}
	time.innerHTML = `${min}:${sec}`
	lineSong = audio.currentTime
	progress = lineLength - (lineSong / timeSeconds) * lineLength
	circle.style.strokeDashoffset = progress
}



