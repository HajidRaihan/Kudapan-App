// src/App.js
import React, { useState } from "react";
import { encrypt, decrypt } from "../helper/Encrypt";

const Tes = () => {
  const [input, setInput] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const handleEncrypt = () => {
    const enc = encrypt(input);
    setEncrypted(enc);
    const dec = decrypt(enc);
    setDecrypted(dec);
  };

  return (
    <div>
      <h1>Encryption and Decryption</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encrypt"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <div>
        <p>Encrypted: {encrypted}</p>
        <p>Decrypted: {decrypted}</p>
      </div>
    </div>
  );
};

export default Tes;
