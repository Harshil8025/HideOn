import React from "react";

export default function Vigenere({ mode, text, key }) {
  if (!key || typeof key !== "string" || key.length === 0)
    return (
      <div>
        Invalid key! Key must be a non-empty string.
        <br />
        <br />
        Type `vigenere --help` to get examples of key.
      </div>
    );

  const vigenereCipher = (str, key, encrypt = true) => {
    // Convert both text and key to uppercase and remove non-alphabetic characters
    str = str.replace(/[^A-Za-z]/g, "").toUpperCase();
    key = key.replace(/[^A-Za-z]/g, "").toUpperCase();

    let result = "";
    let keyIndex = 0;
    let keyLength = key.length;

    for (let i = 0; i < str.length; i++) {
      let textChar = str.charCodeAt(i) - 65; // Convert character to 0-25 range
      let keyChar = key.charCodeAt(keyIndex % keyLength) - 65; // Get key character (cycling through)

      let newChar;
      if (encrypt) {
        newChar = (textChar + keyChar) % 26; // Encrypt character
      } else {
        newChar = (textChar - keyChar + 26) % 26; // Decrypt character
      }

      result += String.fromCharCode(newChar + 65); // Convert back to letter
      keyIndex++;
    }

    return result;
  };

  let result;
  if (mode === "encrypt") {
    result = vigenereCipher(text, key, true);
  } else if (mode === "decrypt") {
    result = vigenereCipher(text, key, false);
  } else {
    result = "Invalid mode! Use '-e' for encryption or '-d' for decryption.";
  }

  return <div>Result : {result}</div>;
}
