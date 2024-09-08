// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const ccpPath = path.resolve(__dirname, 'connection.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function createAsset(asset) {
    const wallet = await Wallets.newFileSystemWallet('./wallet');
    const gateway = new Gateway();
    
    await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('asset');

    await contract.submitTransaction('createAsset', asset.DEALERID, asset.MSISDN, asset.MPIN, asset.BALANCE, asset.STATUS);
    
    console.log(`Asset ${asset.DEALERID} created successfully`);
    await gateway.disconnect();
}

app.post('/assets', async (req, res) => {
    try {
        await createAsset(req.body);
        res.status(201).send('Asset created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});