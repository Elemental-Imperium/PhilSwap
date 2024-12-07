const fs = require('fs');
const path = require('path');

// Project structure definition
const structure = {
  root: 'PhilSwap',
  files: ['index.html', 'styles.css', 'script.js', 'README.md', 'package.json'],
  folders: ['assets'],
};

// Template for index.html
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhilSwap</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <h1>PhilSwap</h1>
    <button id="loginButton">Connect MetaMask</button>
    <div id="walletInfo" style="display: none;">
      <p>Connected Wallet: <span id="walletAddress"></span></p>
      <div class="swap-container">
        <input id="tokenA" type="text" placeholder="Token A Address">
        <input id="tokenB" type="text" placeholder="Token B Address">
        <input id="amount" type="number" placeholder="Amount to Swap">
        <button id="swapButton">Swap</button>
      </div>
    </div>
  </div>
  <script src="script.js" type="module"></script>
</body>
</html>`;

// Template for styles.css
const cssTemplate = `body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f9;
  color: #333;
}

#app {
  margin: 2rem auto;
  max-width: 600px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}

.swap-container input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 80%;
}

.swap-container button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}`;

// Template for script.js
const jsTemplate = `import { ethers } from 'ethers';

// MetaMask Login
document.getElementById('loginButton').addEventListener('click', async () => {
  if (!window.ethereum) {
    alert('MetaMask is not installed!');
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById('walletAddress').innerText = address;
    document.getElementById('walletInfo').style.display = 'block';
  } catch (err) {
    console.error(err);
    alert('Connection failed!');
  }
});`;

// Template for README.md
const readmeTemplate = `# PhilSwap

PhilSwap is a Web3 app enabling MetaMask-based login and token swaps.

## Features
- **MetaMask Integration**
- **Token Swap**

## Getting Started
1. Clone the repository.
2. Run \`pnpm install\`.
3. Start the app using \`pnpm dev\`.

## License
This project is licensed under the MIT License.`;

// Template for package.json
const packageJsonTemplate = `{
  "name": "philswap",
  "version": "1.0.0",
  "description": "A Web3 app for token swapping with MetaMask login",
  "main": "index.js",
  "scripts": {
    "dev": "live-server"
  },
  "dependencies": {
    "ethers": "^5.6.9"
  },
  "devDependencies": {
    "live-server": "^1.2.1"
  },
  "author": "Elemental Imperium",
  "license": "MIT"
}`;

// Function to create files and folders
function createProjectStructure(structure) {
  const rootDir = structure.root;

  // Create root folder
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }

  // Create files in root
  structure.files.forEach((file) => {
    const filePath = path.join(rootDir, file);
    let content = '';

    // Match file to corresponding template
    switch (file) {
      case 'index.html':
        content = htmlTemplate;
        break;
      case 'styles.css':
        content = cssTemplate;
        break;
      case 'script.js':
        content = jsTemplate;
        break;
      case 'README.md':
        content = readmeTemplate;
        break;
      case 'package.json':
        content = packageJsonTemplate;
        break;
      default:
        content = '';
    }

    fs.writeFileSync(filePath, content, 'utf8');
  });

  // Create folders in root
  structure.folders.forEach((folder) => {
    const folderPath = path.join(rootDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });

  console.log(`Project '${rootDir}' created successfully.`);
}

// Execute function
createProjectStructure(structure);