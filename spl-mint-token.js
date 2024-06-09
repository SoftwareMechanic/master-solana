const { Connection, Keypair, PublicKey, Transaction, SystemProgram } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, createMintToInstruction } = require('@solana/spl-token');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com');
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
const wallet = Keypair.fromSecretKey(secretKey);

async function mintTokens() {
    // Load the token's public key from the file
    const tokenPublicKey = new PublicKey(JSON.parse(fs.readFileSync('token.json')));

    // Create an associated token account for the wallet if it doesn't exist
    const walletTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet, // payer
        tokenPublicKey, // mint
        wallet.publicKey // owner
    );

    console.log("walletTokenAccount: ", walletTokenAccount)

    // Create a transaction to mint tokens
    const mintToInstruction = createMintToInstruction(
        tokenPublicKey, // mint
        walletTokenAccount.address, // destination
        wallet.publicKey, // authority
        100 * 10 ** 9 // amount, considering 9 decimal places
    );

    const transaction = new Transaction().add(mintToInstruction);

    // Sign and send the transaction
    const signature = await connection.sendTransaction(transaction, [wallet]);
    await connection.confirmTransaction(signature);

    console.log('Minted 100 tokens to:', walletTokenAccount.address.toBase58());
}

mintTokens().catch(console.error);