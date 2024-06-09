const { Keypair } = require('@solana/web3.js');
const fs = require('fs');

// Generate a new wallet keypair
const wallet = Keypair.generate();

// Save the wallet's secret key to a file
fs.writeFileSync('wallet.json', JSON.stringify(Array.from(wallet.secretKey)));

console.log('Wallet created:');
console.log('Public Key:', wallet.publicKey.toBase58());