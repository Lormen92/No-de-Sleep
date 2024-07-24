const asciiArt = `%c\n
  _   _        __   _    __  ____  _                 
 | \\ | | ___  / /__| | __\\ \\/ ___|| | ___  ___ _ __  
 |  \\| |/ _ \\| |/ _\` |/ _ \\ \\___ \\| |/ _ \\/ _ \\ '_ \\ 
 | |\\  | (_) | | (_| |  __/ |___) | |  __/  __/ |_) |
 |_| \\_|\\___/| |\\__,_|\\___| |____/|_|\\___|\\___| .__/ 
              \\_\\        /_/                  |_|    
\n`;

const printAsciiArt = ()=>{
    console.log(asciiArt,`font-family: monospace`)
}

exports.printAsciiArt = printAsciiArt;