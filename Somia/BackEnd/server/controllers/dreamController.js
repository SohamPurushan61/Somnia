const { getDreamsCollection } = require('../config/database');
const ethers = require('ethers');
const pinataSDK = require('@pinata/sdk');
const { PINATA_API_KEY, PINATA_API_SECRET, RPC_URL } = require('../config/serverConfig');


const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
const provider = new ethers.JsonRpcProvider(RPC_URL);

const contractAddress = '0x89692e58058de318e49b44eeb317e74b41b86eff';
const contractABI = [
    {
        "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
        "name": "getDreams",
        "outputs": [{
            "components": [
                { "internalType": "string", "name": "cid", "type": "string" },
                { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
            ],
            "internalType": "struct DreamLog.Dream[]",
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "string", "name": "_cid", "type": "string" }],
        "name": "logDream",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);

const uploadDream = async (req, res) => {
    const { content, userAddress } = req.body;

    try {
        const result = await pinata.pinJSONToIPFS(content);
        const cid = result.IpfsHash;

        const dream = {
            userAddress,
            cid,
            content,
            timestamp: new Date()
        };

        await getDreamsCollection().insertOne(dream);
        res.json({ cid });
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        res.status(500).json({ error: 'Could not upload to IPFS' });
    }
};

const getDreams = async (req, res) => {
    const { userAddress } = req.params;

    try {
        const dreams = await getDreamsCollection().find({ userAddress }).toArray();
        res.json(dreams);
    } catch (error) {
        console.error('Error getting dreams:', error);
        res.status(500).json({ error: 'Could not get dreams' });
    }
};

module.exports = { uploadDream, getDreams };