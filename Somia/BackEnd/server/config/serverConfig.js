require('dotenv').config();

module.exports = {

    PORT:process.env.PORT || 3000,
    PINATA_API_KEY:process.env.PINATA_API_KEY,
    PINATA_API_SECRET:process.env.PINATA_API_SECRET,
    JWT_SECRETKEY:process.env.JWT_SECRETKEY,
    MONGODB_URL:process.env.MONGODB_URL,
    RPC_URL:process.env.RPC_URL


}