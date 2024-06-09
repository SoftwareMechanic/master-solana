const { createMint, TOKEN_PROGRAM_ID  } = require('@solana/spl-token');
const { Connection, Keypair, PublicKey, Transaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com');
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
const wallet = Keypair.fromSecretKey(secretKey);


async function createToken() {
    // Create a new token

    //Signature method
    // export async function createMint(
    //     connection: Connection,
    //     payer: Signer,
    //     mintAuthority: PublicKey,
    //     freezeAuthority: PublicKey | null,
    //     decimals: number,
    //     keypair = Keypair.generate(),
    //     confirmOptions?: ConfirmOptions,
    //     programId = TOKEN_PROGRAM_ID
    // ): Promise<PublicKey>


    const token = await createMint(
        connection,
        wallet,
        wallet.publicKey,
        null,
        9,
        undefined,
        {},
        TOKEN_PROGRAM_ID, // optional, can be omitted
    );

    console.log('Token created:', token.toBase58())

    // Save the token's public key to a file
    fs.writeFileSync('token.json', JSON.stringify(token.toBase58()));

    //console.log('Token created:', token.publicKey.toBase58());
}

createToken().catch(console.error);