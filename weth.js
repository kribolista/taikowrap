require('dotenv').config();
const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

// Ambil private keys dan wallet addresses dari .env
const privateKeys = [
  process.env.PRIVATE_KEYS1,
  process.env.PRIVATE_KEYS2,
  process.env.PRIVATE_KEYS3,
  process.env.PRIVATE_KEYS4,
  process.env.PRIVATE_KEYS5,
  process.env.PRIVATE_KEYS6,
  process.env.PRIVATE_KEYS7,
  process.env.PRIVATE_KEYS8,
  process.env.PRIVATE_KEYS9,
  process.env.PRIVATE_KEYS10,
  process.env.PRIVATE_KEYS11,
  process.env.PRIVATE_KEYS12,
  process.env.PRIVATE_KEYS13,
  process.env.PRIVATE_KEYS14,
  process.env.PRIVATE_KEYS15,
  process.env.PRIVATE_KEYS16,
  process.env.PRIVATE_KEYS17,
  process.env.PRIVATE_KEYS18,
  process.env.PRIVATE_KEYS19,
  process.env.PRIVATE_KEYS20,
];

const wallets = [
  process.env.WALLET1,
  process.env.WALLET2,
  process.env.WALLET3,
  process.env.WALLET4,
  process.env.WALLET5,
  process.env.WALLET6,
  process.env.WALLET7,
  process.env.WALLET8,
  process.env.WALLET9,
  process.env.WALLET10,
  process.env.WALLET11,
  process.env.WALLET12,
  process.env.WALLET13,
  process.env.WALLET14,
  process.env.WALLET15,
  process.env.WALLET16,
  process.env.WALLET17,
  process.env.WALLET18,
  process.env.WALLET19,
  process.env.WALLET20,
];

// Inisialisasi log sukses dan gagal untuk tiap wallet
const successLog = Array(wallets.length).fill(0);
const failureLog = Array(wallets.length).fill(0);

async function runCommand(command, privateKey, wallet) {
  try {
    const { stdout, stderr } = await execPromise(`PRIVATE_KEY=${privateKey.trim()} WALLET=${wallet.trim()} ${command}`);
    return {
      output: stdout,
      error: stderr,
      retval: 0,
    };
  } catch (error) {
    return {
      output: error.stdout,
      error: error.stderr,
      retval: error.code,
    };
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fungsi utama
async function main() {
  const totalIterations = 45; // Jumlah iterasi yang ingin dilakukan
  const interval = 60; // Interval waktu dalam detik

  for (let i = 0; i < totalIterations; i++) {
    console.log("================");
    console.log(`Iterasi ${i + 1}`);
    console.log("================");

    const depositPromises = [];
    for (let j = 0; j < privateKeys.length; j++) {
      const privateKey = privateKeys[j];
      const wallet = wallets[j];
      console.log(`Wallet ${j + 1}: deposit dimulai..`);
      depositPromises.push(runCommand("node weth_deposit.js", privateKey, wallet)
        .then((result) => {
          console.log(`Wallet ${j + 1}: deposit sukses`);
          console.log(`Wallet ${j + 1}: tx hash: ${result.output}`);
          return wallet; // Return wallet for withdraw
        }));
    }

    const depositResults = await Promise.all(depositPromises);
    
    // Jeda setelah semua deposit selesai
    await sleep(interval * 1000);

    const withdrawPromises = depositResults.map((wallet, j) => {
      console.log(`Wallet ${j + 1}: withdraw dimulai...`);
      return runCommand("node weth_withdraw.js", privateKeys[j], wallet)
        .then((result) => {
          console.log(`Wallet ${j + 1}: withdraw sukses`);
          console.log(`Wallet ${j + 1}: tx hash: ${result.output}`);
        });
    });

    await Promise.all(withdrawPromises);
    
    // Jeda setelah semua withdraw selesai
    await sleep(interval * 1000);
  }

  console.log("Semua iterasi selesai.");
}

// Jalankan fungsi utama
main().catch(console.error);
