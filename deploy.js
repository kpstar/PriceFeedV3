const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const bytecode = fs.readFileSync('./build/FirstContract.bin');
const abi = JSON.parse(fs.readFileSync('./build/FirstContract.abi'));

const bytecode1 = fs.readFileSync('./build/PriceConsumerv3.bin');
const abi1 = JSON.parse(fs.readFileSync('./build/PriceConsumerv3.abi'));



(async function () {
  const ganacheAccounts = await web3.eth.getAccounts();
  const myWalletAddress = ganacheAccounts[0];


  const myContract = new web3.eth.Contract(abi);
  const myContract1 = new web3.eth.Contract(abi1);

  myContract1.deploy({
    data: bytecode1.toString()
  }).send({
    from: myWalletAddress,
    gas: 5000000
  }).then((deployment) => {
    console.log('ConsumerContract was successfully deployed!');
    console.log('ConsumerContract can be interfaced with at this address:');
    console.log(deployment.options.address);
  }).catch((err) => {
    console.error(err);
  });

  myContract.deploy({
    data: bytecode.toString()
  }).send({
    from: myWalletAddress,
    gas: 5000000
  }).then((deployment) => {
    console.log('FirstContract was successfully deployed!');
    console.log('FirstContract can be interfaced with at this address:');
    console.log(deployment.options.address);
  }).catch((err) => {
    console.error(err);
  });
})();


