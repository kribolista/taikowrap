# Ether Deposit & Withdraw Tool

Alat ini digunakan untuk melakukan deposit dan withdraw Ether menggunakan kontrak WETH pada jaringan Ethereum. Alat ini memungkinkan Anda untuk berinteraksi dengan kontrak WETH melalui wallet yang telah Anda siapkan.

## Prerequisites

- Node.js (versi 14 atau lebih baru)
- npm (versi 6 atau lebih baru)
- File .env dengan private keys dan wallet addresses

## Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/username/repo.git
   cd repo

2. Instal dependensi yang diperlukan:

   ```bash
   npm install

3. Buat file .env di root proyek dan tambahkan private keys serta wallet addresses Anda:

   ```bash
   PRIVATE_KEYS1=your_private_key_1
   WALLET1=your_wallet_address_1
   ...
Ulangi untuk setiap wallet hingga 20 wallet.

4. Sesuaikan file config.json jika diperlukan, terutama untuk gasPrice, iterations, dan interval.

