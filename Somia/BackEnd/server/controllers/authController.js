const jwt = require('jsonwebtoken');

const { getUserCollection } = require('../config/database');
const ethers = require('ethers');
const {JWT_SECRETKEY} = require('../config/serverConfig');

const authenticateUser = async (req,res) => {
    const {account, signature } = req.body;
    const message = "Authenticate with Somnia";
    const signerAddress = ethers.verifyMessage(message, signature);

    if (signerAddress.toLowerCase() === account.toLowerCase()) {
        const accessToken = jwt.sign({account}, JWT_SECRETKEY, {expiresIn: '1h'});

        const usersCollection = getUserCollection();
        const user = await usersCollection.findOne({account});

        if (!user) {
            await usersCollection.insertOne({account});
        }

        res.json({ accessToken });
    }   else {
        res.status(401).json({message: "Authentication failed"});
    }
}
module.exports = { authenticateUser };

