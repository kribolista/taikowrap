require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

// Konfigurasi provider
const provider = new ethers.providers.JsonRpcProvider("https://rpc.taiko.tools/");

// Ambil private key dari environment variable
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
  throw new Error("Private key is not defined");
}

// Menghubungkan wallet menggunakan private key dari environment
const wallet = new ethers.Wallet(privateKey, provider);

// Baca file konfigurasi (gas price, dll.)
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

// Baca ABI dari file
const contractABI = JSON.parse(fs.readFileSync("abi.json", "utf8"));

// Alamat kontrak WETH (sesuaikan jika perlu)
const contractAddress = "0xA51894664A773981C6C112C43ce576f315d5b1B6";

// Inisialisasi kontrak dengan ABI dan wallet
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Fungsi untuk mendapatkan saldo WETH saat ini
async function getBalance() {
  const balance = await contract.balanceOf(wallet.address);
  return balance;
}

// Fungsi withdraw WETH
async function withdraw() {
  // Ambil saldo saat ini dari kontrak
  const amount = await getBalance();
  
  // Pastikan ada saldo yang bisa ditarik
  if (amount.isZero()) {
    console.log("No balance to withdraw");
    return;
  }

  try {
    // Kirim transaksi withdraw
    const tx = await contract.withdraw(amount, {
      gasPrice: ethers.utils.parseUnits(config.gasPrice, "gwei"), // Gas price dari config
      gasLimit: 104817, // Batas gas
    });

    // Cetak hash transaksi
    console.log("Transaction Hash:", tx.hash);

    // Tunggu sampai transaksi di-mined
    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
  } catch (error) {
    // Cetak error jika transaksi gagal
    console.error("Transaction failed:", error);
  }
}

// Memanggil fungsi withdraw
withdraw().catch(console.error);
