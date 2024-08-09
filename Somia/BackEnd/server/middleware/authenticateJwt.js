const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const pinataSDK = require('@pinata/sdk');
const ethers = require('ethers');
require('dotenv').config();
const app = express();
const {JWT_SECRETKEY} = require('../config/serverConfig');


async function authenticateJWT(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, JWT_SECRETKEY, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });

    }   else {
        res.sendStatus(401);
    }
}

module.exports = authenticateJWT;
