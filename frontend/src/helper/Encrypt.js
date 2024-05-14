// src/utils/crypto.js
import CryptoJS from "crypto-js";

const secretKey = "rahasia_sekali"; // Kunci rahasia Anda

// Fungsi untuk mengenkripsi teks
export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Fungsi untuk mendekripsi teks
export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
