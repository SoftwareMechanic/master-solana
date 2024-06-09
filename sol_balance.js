const { Keypair,Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com');
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
const walletPublicKey = new PublicKey(Keypair.fromSecretKey(secretKey).publicKey);

async function checkSolBalance() {
    const balance = await connection.getBalance(walletPublicKey);
    console.log(`SOL balance for ${walletPublicKey.toBase58()}: ${balance / LAMPORTS_PER_SOL} SOL`);
}

checkSolBalance().catch(console.error);