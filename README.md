# Ethereum Wallet Automation Tool

## Deskripsi
Tools ini digunakan untuk melakukan deposit dan withdraw secara otomatis pada kontrak WETH di jaringan Ethereum.

## Struktur Proyek
- `weth.js`: File utama yang menjalankan deposit dan withdraw secara paralel untuk 100 wallet.
- `weth_deposit.js`: File yang menangani logika deposit WETH.
- `weth_withdraw.js`: File yang menangani logika withdraw WETH.
- `config.json`: File konfigurasi untuk gas price dan jumlah iterasi.
- `package.json`: File konfigurasi untuk dependensi Node.js.
- `abi.json`: File yang berisi ABI dari kontrak WETH.

## Persyaratan
- Node.js dan npm harus terinstal pada sistem Anda.
- File `.env` harus berisi private keys dan alamat wallet.

## Cara Menggunakan
1. **Instalasi**:
   - Jalankan `npm install` untuk menginstal dependensi.

2. **Konfigurasi**:
   - Buat file `.env` dan isi dengan private keys dan alamat wallet:
     ```
     PRIVATE_KEYS1=your_private_key_1
     WALLET1=your_wallet_address_1
     ...
     ```

3. **Menjalankan Tools**:
   - Jalankan `node weth.js` untuk memulai proses deposit dan withdraw.

4. **Pengaturan**:
   - Ubah pengaturan di `config.json` jika diperlukan, seperti gas price dan jumlah iterasi.

## Catatan
- Pastikan Anda memiliki cukup saldo pada setiap wallet untuk melakukan transaksi.
- Transaksi blockchain tidak dapat dipastikan waktunya, jadi berikan jeda waktu yang cukup antara setiap transaksi.
