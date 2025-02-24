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

// Baca file konfigurasi (amount, gas price, dll.)
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

// Baca ABI dari file
const contractABI = JSON.parse(fs.readFileSync("abi.json", "utf8"));

// Alamat kontrak WETH (sesuaikan jika perlu)
const contractAddress = "0xA51894664A773981C6C112C43ce576f315d5b1B6";

// Inisialisasi kontrak dengan ABI dan wallet
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Fungsi untuk menghasilkan nilai amount acak
function getRandomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(4); // Menghasilkan angka acak dengan 4 desimal
}

// Fungsi deposit WETH
async function deposit() {
  // Menghasilkan jumlah deposit acak dalam rentang yang ditentukan
  const randomAmount = getRandomAmount(0.399, 0.401); // Ubah rentang sesuai kebutuhan
  const amount = ethers.utils.parseEther(randomAmount); // Konversi jumlah deposit ke satuan ether

  try {
    // Kirim transaksi deposit
    const tx = await contract.deposit({
      value: amount,
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

// Memanggil fungsi deposit
deposit().catch(console.error);
