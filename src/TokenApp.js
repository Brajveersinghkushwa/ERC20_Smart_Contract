import { useState } from "react";
import { ethers } from "ethers";
import "./TokenApp.css";

const contractAddress = "0xBCBcF7950299e277eF71e2c7fECD82FC1B36DdD1";
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "add",
                "type": "address"
            }
        ],
        "name": "blockAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "burnAmount",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "mintAmount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "add",
                "type": "address"
            }
        ],
        "name": "unblockAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "blocked",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "circulatingSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenDecimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenName",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenSymbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


function TokenApp() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState("0");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [spender, setSpender] = useState("");
    const [allowanceAmount, setAllowanceAmount] = useState("");
    const [contract, setContract] = useState(null);

    // Connect to MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);

            const tokenContract = new ethers.Contract(contractAddress, abi, signer);
            setContract(tokenContract);

            const bal = await tokenContract.balanceOf(address);
            setBalance(ethers.formatUnits(bal, 18)); // Convert from Wei
        } else {
            alert("MetaMask not detected!");
        }
    };

    // Transfer tokens
    const transferTokens = async () => {
        if (contract) {
            try {
                const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
                await tx.wait();
                alert("Transfer Successful!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Approve spender
    const approveSpender = async () => {
        if (contract) {
            try {
                const tx = await contract.approve(spender, ethers.parseUnits(allowanceAmount, 18));
                await tx.wait();
                alert("Spender Approved!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Transfer from spender
    const transferFromSpender = async () => {
        if (contract) {
            try {
                const tx = await contract.transferFrom(spender, recipient, ethers.parseUnits(amount, 18));
                await tx.wait();
                alert("Transfer from spender successful!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Mint tokens (onlyOwner)
    const mintTokens = async () => {
        if (contract) {
            try {
                const tx = await contract.mint(ethers.parseUnits(amount, 18));
                await tx.wait();
                alert("Minting Successful!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Burn tokens
    const burnTokens = async () => {
        if (contract) {
            try {
                const tx = await contract.burn(ethers.parseUnits(amount, 18));
                await tx.wait();
                alert("Burning Successful!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Block an address (onlyOwner)
    const blockAddress = async () => {
        if (contract) {
            try {
                const tx = await contract.blockAddress(recipient);
                await tx.wait();
                alert("Address Blocked!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Unblock an address (onlyOwner)
    const unblockAddress = async () => {
        if (contract) {
            try {
                const tx = await contract.unblockAddress(recipient);
                await tx.wait();
                alert("Address Unblocked!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Transfer ownership (onlyOwner)
    const transferOwnership = async () => {
        if (contract) {
            try {
                const tx = await contract.transferOwnership(recipient);
                await tx.wait();
                alert("Ownership Transferred!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="token-container">
            <h1>BRS Token Management</h1>
            <button onClick={connectWallet}>Connect MetaMask</button>
            {account && <p>Connected: {account}</p>}
            {account && <p>Balance: {balance} BRS</p>}

            <hr />

            {/* Transfer Tokens */}
            <h3>Transfer Tokens</h3>
            <input type="text" placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
            <input type="text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={transferTokens}>Transfer</button>

            {/* Approve Spender */}
            <h3>Approve Spender</h3>
            <input type="text" placeholder="Spender Address" onChange={(e) => setSpender(e.target.value)} />
            <input type="text" placeholder="Allowance Amount" onChange={(e) => setAllowanceAmount(e.target.value)} />
            <button onClick={approveSpender}>Approve</button>

            {/* Transfer From Spender */}
            <h3>Transfer From Spender</h3>
            <input type="text" placeholder="Spender Address" onChange={(e) => setSpender(e.target.value)} />
            <input type="text" placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
            <input type="text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={transferFromSpender}>Transfer From</button>

            {/* Mint Tokens */}
            <h3>Mint Tokens</h3>
            <input type="text" placeholder="Mint Amount" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={mintTokens}>Mint</button>

            {/* Burn Tokens */}
            <h3>Burn Tokens</h3>
            <input type="text" placeholder="Burn Amount" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={burnTokens}>Burn</button>

            {/* Block Address */}
            <h3>Block Address</h3>
            <input type="text" placeholder="Address to Block" onChange={(e) => setRecipient(e.target.value)} />
            <button onClick={blockAddress}>Block</button>

            {/* Unblock Address */}
            <h3>Unblock Address</h3>
            <input type="text" placeholder="Address to Unblock" onChange={(e) => setRecipient(e.target.value)} />
            <button onClick={unblockAddress}>Unblock</button>

            {/* Transfer Ownership */}
            <h3>Transfer Ownership</h3>
            <input type="text" placeholder="New Owner Address" onChange={(e) => setRecipient(e.target.value)} />
            <button onClick={transferOwnership}>Transfer Ownership</button>
        </div>
    );
}

export default TokenApp;
