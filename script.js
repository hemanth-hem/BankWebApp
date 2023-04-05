var contract;
        $(document).ready(function(){
            web3 = new Web3(web3.currentProvider);
            console.log(web3);
            
            var address = "0x9e4C3099Fd76ECB4CF7eaf71ee05202C08037Df9"
            
            var abi = [
	{   "constant" : false,
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
            
            
            contract = new web3.eth.Contract(abi,address);
            contract.methods.getBalance().call().then(function(bal)
            {
                $('#balance').html(bal);
            })

            $('#deposit').click(function(){
                var amt = 0;
                amt = parseInt($('#amount').val());
                console.log(amt);
                
                web3.eth.requestAccounts().then(function(accounts)
                {
                    var acc = accounts[0];
                    console.log(acc);
                    web3.eth.getBalance(acc).then(console.log);
                    return contract.methods.deposit(amt).send({from: acc});
                }).then(function(tx)
                {
                    console.log(tx);
                    contract.methods.getBalance().call().then(function(bal)
            {
                $('#balance').html(bal);
            })
            $('#amount').val() = ''
                }).catch(function(tx)
                {
                    console.log(tx);
                })
            })
            $('#withdraw').click(function(){
                var amt = 0;
                amt = parseInt($('#amount').val());
                console.log(amt);

                web3.eth.requestAccounts().then(function(accounts)
                {
                    var acc = accounts[0];
                    console.log(acc);
                    return contract.methods.withdraw(amt).send({from: acc});
                }).then(function(tx)
                {
                    console.log(tx);
                    contract.methods.getBalance().call().then(function(bal)
            {
                $('#balance').html(bal);
            })
            $('#amount').val() = '';
                }).catch(function(tx)
                {
                    console.log(tx);
                })
            })

        })