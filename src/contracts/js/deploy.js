    const HDWalletProvider = require('truffle-hdwallet-provider');
    const Web3 = require('web3');
    const {abi, bytcode}= require('./compile'); 

    //Clave semilla que utiliza ganache (es un texto aleatorio)
    const mnemonic=' wait manage narrow clutch flame pigeon dwarf muffin fly hat finish real';
    //Permite tener acceso a todas las address
    const provider= new HDWalletProvider(mnemonic, 'http://localhost:8545');
    const web3 = new web3(provider); //instaciamos web3 pasandole las cuentas y la conexion
    
    //Funcion que ejecuta la logica del contrato
    const deploy = async()=>{
        // Objeto(parametros de la funcion constructora, que se la ejecuta inicializando los valores
        //y poner el codigo en marcha en la blockchain)
        const accounts = await web3.eth.getAccounts(); // el objeto eth hace referencia a la blockchain

        const argumentsConstructor=[
            "Votaciones", //nombre de la criptomonedas
            "UG",         // siglas de la moneda
            18,            // decimales
            21000000
        ]

     //Calculo del gas 
    const gasEstimate= await new web3.eth.Contract(abi).deploy({data:bytcode, arguments: argumentsConstruct})
    .gasEstimate({from: accounts[0]});
    
    //objeto transaccion para subir el contrato, este genera un recibo
    //Cuando se pide datos(code) y escritura, es decir transaccion firmada(send)
    const result= await new web3.eth.Contract(abi).deploy({data:bytcode, arguments: argumentsConstruct})
    .send({gas: gasEstimate, from: accounts[0]})

    }