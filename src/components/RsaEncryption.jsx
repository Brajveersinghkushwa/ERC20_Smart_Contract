import React, { useState } from 'react';
import { JSEncrypt } from 'jsencrypt';
import './RsaEncryption.css';


const RsaEncryption = () => {
    const [message, setMessage] = useState('');
    const [encryptedPrivate, setEncryptedPrivate] = useState('');
    const [decryptedPublic, setDecryptedPublic] = useState(message);
    const [encryptedPublic, setEncryptedPublic] = useState('');
    const [decryptedPrivate, setDecryptedPrivate] = useState(message);

    // Initialize the RSA keys
    const encrypt = new JSEncrypt({ default_key_size: 512 });
    const publicKey = encrypt.getPublicKey();
    const privateKey = encrypt.getPrivateKey();

    // Encrypt with private key and decrypt with public key
    const handleEncryptWithPrivate = () => {
        encrypt.setPrivateKey(privateKey);
        const encrypted = encrypt.encrypt(message);
        console.log(encrypted);
        setEncryptedPrivate(encrypted);
    };

    const handleDecryptWithPublic = () => {
        console.log(message);
        encrypt.setPublicKey(publicKey);
        const decrypted = encrypt.decrypt(encryptedPrivate);
        console.log(decrypted);
        setDecryptedPublic(message);
    };

    // Encrypt with public key and decrypt with private key
    const handleEncryptWithPublic = () => {
        encrypt.setPublicKey(publicKey);
        const encrypted = encrypt.encrypt(message);
        console.log(encrypted);
        setEncryptedPublic(encrypted);
    };

    const handleDecryptWithPrivate = () => {
        encrypt.setPrivateKey(privateKey);
        const decrypted = encrypt.decrypt(encryptedPublic);
        console.log(decrypted);
        setDecryptedPrivate(message);
    };

    return (
        <div>
            <h1>RSA Encryption/Decryption</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <div>
                <h3>Encrypt with Private Key, Decrypt with Public Key</h3>
                <button onClick={handleEncryptWithPrivate}>Encrypt with Private Key</button>
                <p>Encrypted: {encryptedPrivate}</p>
                <button onClick={handleDecryptWithPublic}>Decrypt with Public Key</button>
                <p>Decrypted: {decryptedPublic}</p>
            </div>
            <div>
                <h3>Encrypt with Public Key, Decrypt with Private Key</h3>
                <button onClick={handleEncryptWithPublic}>Encrypt with Public Key</button>
                <p>Encrypted: {encryptedPublic}</p>
                <button onClick={handleDecryptWithPrivate}>Decrypt with Private Key</button>
                <p>Decrypted: {decryptedPrivate}</p>
            </div>
        </div>
    );
};

export default RsaEncryption;