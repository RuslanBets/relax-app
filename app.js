const time = document.querySelector('.time');
const buttons = document.querySelector('.buttons');
const buttonPlay = document.querySelector('.button-play');
const video = document.querySelector('.video__item');
const audio = document.querySelector('.audio');
let flag = true;
let miliSeconds = 600000;
let secondsFuture = Date.now() + 600000;
let interval;

let data = {
	time: time.innerHTML,
	btnPlayOrStop: "./icon.svg/play.svg",

};

buttons.addEventListener('click', event => {
	if (event.target.localName == 'button') {
		let num = event.target.innerHTML.split(' ')[0];
		time.innerHTML = num + ':' + '00';
		data.time = time.innerHTML; 
		miliSeconds = Number(event.target.innerHTML.split(' ')[0]) * 60000;
		secondsFuture = Date.now() + miliSeconds;
	}
});

buttonPlay.addEventListener('click', () => {
	if (flag) {
		buttonPlay.src = "./icon.svg/pause.svg";
		flag = false;
		data.btnPlayOrStop = "./icon.svg/pause.svg";
		video.play();
		audio.play();
		interval = setInterval(timer, 1000);
	} else if (!flag) {
		buttonPlay.src = "./icon.svg/play.svg";
		flag = true;
		data.btnPlayOrStop = "./icon.svg/play.svg";
		video.pause();
		audio.pause();
		clearInterval(interval);
		time.innerHTML = String(timer()[0]) + ':' + String(timer()[1]);
	}
});


function timer() {
	let timeNow = Date.now();
	let gap = secondsFuture - timeNow;
	let min = Math.floor(gap / 1000 / 60) % 60;
	let sec = Math.floor(gap / 1000) % 60;
	if (gap < 0) {
		clearInterval(interval); 
		time.innerHTML = '00:00';
	}
	if (min < 10) {
		min = '0' + min;
	}
	if (sec < 10) {
		sec = '0' + sec;
	}
	time.innerHTML = min + ':' + sec;
	return [min, sec];
}
