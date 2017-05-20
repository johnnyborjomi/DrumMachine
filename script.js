console.clear();
var container = document.querySelector(".container");
var samples = {
	kick: new Howl({
		urls: [
			"https://raw.githubusercontent.com/johnnyborjomi/tic-tac-toe/master/kick.mp3"
		]
	}),
	snare: new Howl({
		urls: [
			"https://raw.githubusercontent.com/johnnyborjomi/tic-tac-toe/master/snare.mp3"
		]
	}),
	snare2: new Howl({
		urls: [
			"https://raw.githubusercontent.com/johnnyborjomi/tic-tac-toe/master/snare%202.mp3"
		]
	}),
	hiHat: new Howl({
		urls: [
			"https://raw.githubusercontent.com/johnnyborjomi/tic-tac-toe/master/hi-hat.mp3"
		]
	}),
	hiHat2: new Howl({
		urls: [
			"https://raw.githubusercontent.com/johnnyborjomi/tic-tac-toe/master/hi-hat%20closed.mp3"
		]
	}),
	crash: new Howl({
		urls: [
			"https://raw.githubusercontent.com/johnnyborjomi/tic-tac-toe/master/crash.mp3"
		]
	})
};

var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var beatPoint = document.querySelectorAll('.beat');



const padCount = 16;

function createPads(name) {
	this.name = name;
	
	this.play = function(){
		samples[this.name].play();
	};
	
	var block = document.createElement("div");
	block.classList.add("block");
	var nameBlock = document.createElement('div');
	nameBlock.classList.add('nameBlock');
    block.appendChild(nameBlock);
    nameBlock.innerHTML = name;
	container.appendChild(block);
	this.pads = [];
	for (var i = 0; i < padCount; i++) {
		var pad = document.createElement("div");
		pad.classList.add("pad");
		block.appendChild(pad);
		this.pads.push(pad);
	}
}

var drumMachine = [
];

for(var sample in samples){
	drumMachine.push(new createPads(sample));
}

var playIcon = document.querySelector('.fa-play-circle-o');
var pauseIcon = document.querySelector('.fa-pause-circle-o');
var tempoInput = document.querySelector('input');

var pads = document.querySelectorAll(".pad");
pads.forEach(function(item) {
	item.addEventListener("click", function() {
		this.classList.toggle("selected");
	});
});

var tempo;
playButton.addEventListener("click", function() {
    tempo = Number(tempoInput.value);
	delayCount();
    playIcon.classList.add('play-color');
    pauseIcon.classList.remove('pause-toggle');
    clearInterval(pauseBlinkTimer);
	playBack();
});

pauseButton.addEventListener("click", function() {
	
	clearInterval(timer);
	pauseBlink();
	playIcon.classList.remove('play-color');
});


function pauseBlink(){
	clearInterval(pauseBlinkTimer);
    pauseBlinkTimer = setInterval(function(){
    pauseIcon.classList.toggle('pause-toggle');
	},1000)
};
var pauseBlinkTimer;
var delay ;
var timer;
var counter;

function delayCount(){
	delay = 30000/tempo;
}

var padsOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function playBack() {
		
	clearInterval(timer);
	timer = setInterval(function() {
	
		nextStep(padsOrder);
    
	}, delay);
}

function nextStep(padsOrder) {

	let current = padsOrder.shift();
	tick(current);
	padsOrder.push(current);
}

function tick(padIndex) {
	//main step code here
	//so you play current sound here
	beatPoint[padIndex].classList.toggle('selected');
	console.log(padIndex);

	drumMachine.forEach(function(block) {
		// взять пэды из каждого блока
		let currentPad = block.pads[padIndex];
		if(currentPad.classList.contains('selected')){
			block.play();
		}
		
	});
}
