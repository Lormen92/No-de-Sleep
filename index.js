const { printAsciiArt } = require('./printAsciiArt');
printAsciiArt();
const packageJson = require('./package.json');
console.log(`${packageJson.version}\n`);
const { mouse, left, right, Button, Key, keyboard } = require('@nut-tree-fork/nut-js');

const readline = require('readline');
let countdownInterval;
let countdownStartTime;
let intervalDuration;

// Create a readline interface to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getEnvVariableValue() {
    return process.env['NO_DE_SLEEP_INTERVAL'] || null;
  };

// Function perform an action to prevent sleep mode
async function doAction() {
    // await mouse.releaseButton(Button.MIDDLE)
    await keyboard.pressKey(Key.F24);
    // await mouse.move(right(1));
    // await mouse.move(left(1));
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

async function askTime() {
    const envInterval = getEnvVariableValue();
    if (envInterval && !isNaN(envInterval) && envInterval > 0) {
        intervalDuration = parseInt(envInterval) * 1000;
        console.log(`Using environment variable. The script is running every ${envInterval} seconds to prevent sleep mode.`);
    } else {
        let isValid = false;
        while(!isValid) {
            const answer = await new Promise((resolve) => {
                rl.question('How many seconds do you want to wait between each action to prevent sleep mode? ', resolve);
            });
            const parsedAnswer = Number(parseInt(answer))
                
            if (isNaN(parsedAnswer) || parsedAnswer <= 0) {
                console.log('Please enter a valid integer greater than 0.');
            }
            else {
                intervalDuration = parsedAnswer * 1000;
                console.log(`The script is running. An action will be performed every ${parsedAnswer} seconds to prevent the PC from going to sleep.`);
                // Chiudi l'interfaccia readline
                rl.close();
                isValid = true;
            }
        }
    }
    console.log('');
    startCountdown();

    // Imposta un intervallo per eseguire la funzione doAction
    setInterval(() => {
        doAction();
        startCountdown();
    }, intervalDuration);
}

askTime();
