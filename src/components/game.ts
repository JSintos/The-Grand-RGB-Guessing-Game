export class Game {
	header: HTMLDivElement;
	rgbDisplay: HTMLSpanElement;
	score: HTMLSpanElement;
	countdownTimer: HTMLSpanElement;
	newGameBtn: HTMLButtonElement;
	easyModeBtn: HTMLButtonElement;
	hardModeBtn: HTMLButtonElement;

	constructor() {
		this.header = document.getElementById("header") as HTMLDivElement;
		this.rgbDisplay = document.getElementById("rgbDisplay") as HTMLSpanElement;
		this.score = document.getElementById("score") as HTMLSpanElement;
		this.countdownTimer = document.getElementById("countdownTimer") as HTMLSpanElement;
		this.newGameBtn = document.getElementById("newGameBtn") as HTMLButtonElement;
		this.easyModeBtn = document.getElementById("easyModeBtn") as HTMLButtonElement;
		this.hardModeBtn = document.getElementById("hardModeBtn") as HTMLButtonElement;
	}
}
