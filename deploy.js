const fs = require("fs");
const Web3 = require("web3");
const mnemonic= "marine pizza order table produce maze improve super flower sock inquiry recall"
const truffleURL = "https://rinkeby.infura.io/v3/4dda033cb7a4435bbfaef24da6777f98"
const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(mnemonic, truffleURL)
const web3 = new Web3(provider);
const bytecode = fs.readFileSync('./build/__contracts_app_sol_CampaignFactory.bin');
const abi = JSON.parse(fs.readFileSync('./build/__contracts_app_sol_CampaignFactory.abi'));
const bytecode2 = fs.readFileSync('./build/__contracts_app_sol_Campaign.bin');
const abi2 = JSON.parse(fs.readFileSync('./build/__contracts_app_sol_Campaign.abi'));
const deploy = async() => {
    accounts = await web3.eth.getAccounts()
    console.log("Trying to deploy from accounts ", accounts[0]);
    factory = await 
    new web3.eth.Contract(abi)
        .deploy({ 
            data: '0x'+bytecode, 
        }).send({
            from: accounts[0], 
            gas:'1000000'
    });
    console.log('contract factory deployed to',factory.options.address);

    campaign = await 
    new web3.eth.Contract(abi2)
        .deploy({ 
            data: '0x'+bytecode2, 
            arguments: [1,accounts[0]] 
        }).send({
            from: accounts[0], 
            gas:'1000000'
    });
    console.log('contract campaign deployed to',campaign.options.address);
    process.exit();             
};
deploy();