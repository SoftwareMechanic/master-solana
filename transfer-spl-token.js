const { Connection, Keypair, PublicKey, Transaction } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com');
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
const wallet = Keypair.fromSecretKey(secretKey);

// Load the token's public key from the file
const tokenPublicKey = new PublicKey(JSON.parse(fs.readFileSync('token.json')));

// Load the recipient's public key from the file
const recipientSecretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet2.json')));
const recipient = Keypair.fromSecretKey(recipientSecretKey);

async function transferTokens() {
    // Get or create the sender's associated token account
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet, // payer
        tokenPublicKey, // mint
        wallet.publicKey // owner
    );

    // Get or create the recipient's associated token account
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet, // payer
        tokenPublicKey, // mint
        recipient.publicKey // owner
    );

    // Create the transfer instruction
    const transferInstruction = createTransferInstruction(
        senderTokenAccount.address,
        recipientTokenAccount.address,
        wallet.publicKey,
        50 * 10 ** 9 // Transfer 50 tokens with 9 decimal places
    );

    // Create and send the transaction
    const transaction = new Transaction().add(transferInstruction);
    const signature = await connection.sendTransaction(transaction, [wallet]);
    await connection.confirmTransaction(signature);

    console.log('Transferred 50 tokens to:', recipientTokenAccount.address.toBase58());
}

transferTokens().catch(console.error);