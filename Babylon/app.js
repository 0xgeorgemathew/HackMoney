const { Transaction } = require("@ethereumjs/tx");
const Common = require("@ethereumjs/common").default;

const Web3 = require("web3");
const ABI = require("./abi");
let Tx = require("ethereumjs-tx").Transaction;

const contractAddress = "0xebC912b213a66e7bf70e1d322aDDdd7Fe624588b";
const chainName = "localhost";
const chainId = 31337;

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:8545/")
);

const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(contract);

async function run() {
  const from = "0x1012432aE0043A58aEc074B5F7EE77EBa88caD9f";
  const nonce = await web3.eth.getTransactionCount(from);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = "100000";

  const reserveAsset = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const name = "Kenobi Garden";
  const symbol = "KGB";
  const tokenURI =
    "https://ipfs.io/ipfs/QmWarDG6KA5wTvvWB2WtRZvPULxJ1bZWZNhbFGY7zgX7an";
  const seed = "1000000";
  const gardenParams = [
    2000000000000, 100000000000, 1, 20000000000, 12600, 5000000000, 86400,
    12960000, 1, 0, 2500000000, 1000000000000, 0,
  ];
  //
  //[100000000000,2000000000000000,1,2000000000000000,12600,120,86400,150,250,0,2000000000000000,2000000000000000,86400]
  const initialContribution = "1000";
  const publicGardenStrategistsStewards = [true, true, true];
  const profitSharing = [0, 0, 0];

  const inputData = contract.methods
    .createGarden(
      reserveAsset,
      name,
      symbol,
      tokenURI,
      seed,
      gardenParams,
      initialContribution,
      publicGardenStrategistsStewards,
      profitSharing
    )
    .encodeABI();

  const createGardentxnData = {
    to: await web3.utils.toChecksumAddress(contractAddress),
    from: await web3.utils.toChecksumAddress(from),
    nonce: await web3.utils.toHex(nonce),
    gasPrice: await web3.utils.toHex(gasPrice),
    gasLimit: await web3.utils.toHex(gasLimit),
    data: inputData,
    value: await web3.utils.toHex("0x"),
    chainID: await web3.utils.toHex(chainId),
  };

  const common = Common.custom({ chainId: chainId });

  const promise = new Promise(async (resolve, reject) => {
    const privateKey =
      "e9caa29eea68183f1739dc3e830a60266b34fbb1e11f1bdc0c628b92069d8bda";
    const privKey = Buffer.from(privateKey, "hex");
    const tx = Transaction.fromTxData(createGardentxnData, { common });
    tx.sign(privKey);
    var serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction(
      "0x" + serializedTx.toString("hex"),
      function (err, hash) {
        if (!err) {
          console.log("Txn Sent and hash is " + hash);
          resolve("Txn Sent and hash is " + hash);
        } else {
          console.error(err);
        }
      }
    );
  });
}

run();
