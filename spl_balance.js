const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, getAccount } = require('@solana/spl-token');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com');
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
const wallet = Keypair.fromSecretKey(secretKey);

console.log(wallet.publicKey.toBase58());


const secretKey2 = Uint8Array.from(JSON.parse(fs.readFileSync('wallet2.json')));
const wallet2 = Keypair.fromSecretKey(secretKey2);

console.log(wallet2.publicKey.toBase58());


// Load the token's public key from the file
const tokenPublicKey = new PublicKey(JSON.parse(fs.readFileSync('token.json')));

async function checkSplBalance() {
    // Get the associated token account for the wallet
    const walletTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet, // payer
        tokenPublicKey, // mint
        wallet.publicKey // owner
    );

    // Fetch the account info to get the balance
    const accountInfo = await getAccount(connection, walletTokenAccount.address);

    console.log(`Token balance for ${walletTokenAccount.address.toBase58()}: ${accountInfo.amount} tokens`);


    const walletTokenAccount2 = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet2, // payer
        tokenPublicKey, // mint
        wallet2.publicKey // owner
    );

    // Fetch the account info to get the balance
    const accountInfo2 = await getAccount(connection, walletTokenAccount2.address);

    console.log(`Token balance for ${walletTokenAccount2.address.toBase58()}: ${accountInfo2.amount} tokens`);
}

checkSplBalance().catch(console.error);