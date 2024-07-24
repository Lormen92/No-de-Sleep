const { printAsciiArt } = require('./printAsciiArt');
printAsciiArt();
const packageJson = require('./package.json');
console.log(`${packageJson.version}\n`);
const { mouse, left, right } = require('@nut-tree-fork/nut-js');

const readline = require('readline');
let countdownInterval;
let countdownStartTime;
let intervalDuration;

// Create a readline interface to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function that moves the mouse 1 pixel to the right and then to the left
async function moveMouse() {
    await mouse.move(right(1));
    await mouse.move(left(1));
}

// Function to perform the countdown
function updateCountdownDisplay() {
    const currentTime = new Date().getTime();
    const remainingSeconds = Math.ceil((intervalDuration - (currentTime - countdownStartTime)) / 1000); // It's not very precise, but it's the best it can be
    
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Next action in: ${remainingSeconds} ${remainingSeconds===1 ? 'second':'seconds'}`);
}

function startCountdown() {
    clearInterval(countdownInterval);
    countdownStartTime = new Date().getTime();
    countdownInterval = setInterval(updateCountdownDisplay, 500);
}

function askTime() {
    rl.question('How many seconds do you want to wait between each action to prevent sleep mode? ', (answer) => {
        const parsedAnswer = Number(parseInt(answer))
        intervalDuration = parsedAnswer * 1000;

        if (isNaN(intervalDuration) || intervalDuration <= 0) {
            console.log('Please enter a valid integer greater than 0.');
            setTimeout(() => {
                askTime();
            }, 0)
            return
        }

        console.log(`The script is running. An action will be performed every ${parsedAnswer} seconds to prevent the PC from going to sleep.`);
        console.log('');
        startCountdown();

        // Imposta un intervallo per eseguire la funzione moveMouse
        setInterval(() => {
            moveMouse();
            startCountdown();
        }, intervalDuration);

        // Chiudi l'interfaccia readline
        rl.close();
    });
}

askTime();
