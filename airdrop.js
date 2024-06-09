const { Keypair, Connection, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');

// Load the wallet's secret key
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
const wallet = Keypair.fromSecretKey(secretKey);

// Connect to the Devnet cluster
const connection = new Connection('https://api.devnet.solana.com');

async function requestAirdrop() {
    console.log('Requesting airdrop...');
    const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log('signature: ' + airdropSignature )
    // TODO 
    await connection.confirmTransaction(airdropSignature);

    console.log('Airdrop received.');
}

requestAirdrop().catch(console.error);