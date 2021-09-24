// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//Así se declara el contrato, de forma parecida a una clase 
contract Votaciones{

  struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("Lista 1");
        addCandidate("Lista 2");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    //trae la identificacion del candidato
    function vote (uint _candidateId) public {
         // requiere que no hayan votado antes
        require(!voters[msg.sender]);

        // requiere un candidato válido, la id del candidato debe ser mayor a cero y menor igual que el total del candidatos
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // registra que el votante ha votado, agregando la cuenta al mapeo de votantes
        voters[msg.sender] = true;

         // actualizar el recuento de votos del candidato
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}