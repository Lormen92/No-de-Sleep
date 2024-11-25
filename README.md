# No(de)Sleep
No(de)Sleep prevents the PC from entering sleep mode.

## Introduction

No(de)Sleep is a simple tool that prevents your computer from going into sleep mode. This can be useful during long-running processes or when you want to ensure your PC stays awake.

## Installation
To use No(de)Sleep, you need to have Node.js installed on your computer. Follow these steps to install the necessary dependencies:

1. **Install Node.js:**
   - Download and install Node.js from the [official website](https://nodejs.org/). This will also install npm (Node Package Manager) which is required to manage dependencies.

2. **Install project dependencies:**
   - Open a terminal or command prompt.
   - Navigate to the project directory where No(de)Sleep is located.
   - Run the following command to install the required dependencies:
     ```
     npm install
     ```

## Usage on Windows

For convenience, a `.bat` file is included to simplify and speed up the execution process on Windows. This file allows you to start the application without having to manually open the terminal and type commands.

### Running the .bat file

1. Locate the `No(de)Sleep.bat` file in the project directory.
2. Double-click the `.bat` file to start No(de)Sleep.

The `.bat` file automates the process of launching the application, making it quicker and easier for users.

## Setting the Execution Interval  
No(de)Sleep allows you to configure a default interval for its execution (starting from version 1.0.4).
This value determines the frequency (in seconds) at which the application sends signals to prevent the PC from sleeping.
You can set this value in two ways:

1. **Using an environment variable:**  
   Set an environment variable named `NO_DE_SLEEP_INTERVAL`.

2. **Using a JSON configuration file:**
   Create a config.json file in the root directory of the project with the following structure: 
   ```bash
   {
    "actionInterval": 50
   }
   ```

In both cases, the value should represent the number of SECONDS for the interval. 
If neither method is used, the application will ask to set the interval every time.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
