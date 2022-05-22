const Web3 = require('web3');
const ABI = require('./abi')
let Tx = require("ethereumjs-tx").Transaction;

const contractAddress = '0xebC912b213a66e7bf70e1d322aDDdd7Fe624588b'
const chainName = 'mainnet'
const chainId = 1

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d4e4ffb90cda4ed1bf0098d333d2a108'));

const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(contract);

async function run(){
const from = '0x24Ec0F23F3BF6809F1490e8abCd5A23b9C778FBd'
const nonce = await web3.eth.getTransactionCount(from);
const gasPrice = await web3.eth.getGasPrice(); 
const gasLimit = '100000'

const reserveAsset = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
const name = 'Kenobi Garden'
const symbol = 'KGB'
const tokenURI = 'https://ipfs.io/ipfs/QmWarDG6KA5wTvvWB2WtRZvPULxJ1bZWZNhbFGY7zgX7an'
const seed = '1000000'
const gardenParams = ['1000', '100', '120', '100', '180', '1', '60', '120', '2', '1', '100', '150']
const initialContribution = '1000'
const publicGardenStrategistsStewards = [true, true, true]
const profitSharing = [0,0,0]


const inputData = contract.methods.createGarden(reserveAsset, name, symbol, tokenURI, seed, gardenParams, initialContribution, publicGardenStrategistsStewards, profitSharing).encodeABI();

const createGardentxnData = {
    to: await web3.utils.toChecksumAddress(contractAddress),
    from: await web3.utils.toChecksumAddress(from),
    nonce: await web3.utils.toHex(nonce),
    gasPrice: await web3.utils.toHex(gasPrice),
    gasLimit: await web3.utils.toHex(gasLimit),
    data: inputData,
    value: await web3.utils.toHex('0x'),
    chainID: await web3.utils.toHex(chainId)
};

const promise = new Promise(async (resolve, reject) => {
    const privateKey = '9feba9b50ab2a6e223c4e4f60ae6f3b837b567d0fc96b1ab2a0053ee32324bfd';
    const privKey = Buffer.from(privateKey, 'hex');
        const tx = new Tx(createGardentxnData, {
            chain: chainName
        });
        tx.sign(privKey);
        var serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (!err) {
                console.log('Txn Sent and hash is ' + hash);
                resolve('Txn Sent and hash is ' + hash);
            } else {
                console.error(err);
            }
        });
    
});

}

run()





