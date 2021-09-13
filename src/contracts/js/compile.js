const path= require('path');
const fs = require('fs');
const solc= require('solc');

const enviaVotoPath= path.join(__dirname, '../voto.sol');
const code = fs.readFileSync(enviaVotoPath, 'utf8');
//objeto que se pasara posteriormente a Solc
const input={
    languaje:'Solidity', //lenuaje del contrato
    sources: { //se pasa el codio del contrato
        'voto.sol':{
            content: code
        }
    },
    // configuracion
    setting:{ 
        outputSelection:{
            '*':{
                '*':['*']
            }
        }
    }
};

console.log(output);
//convierte el objeto JSON en string y se lo compila y a JSON
    const output= JSON.parse(solc.compile(JSON.stringify(input)));
    module.exports={
        abi: output.contracts['voto.sol'].voto.abi,
        bytecode: output.contracts['voto.sol'].voto.evm.bytecode.object
    }
