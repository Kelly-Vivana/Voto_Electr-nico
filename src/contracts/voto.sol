pragma solidity >0.4.1;

contract Voting {


//   ["wt","mayun","liuyifei","zhaoliying","mahuateng"]
//   [1,2,3,4,5]


  // matriz que almacena ID de candidatos
//   bytes32[] candidateNames =new bytes32[](5);
//   bytes32[] candidateNames = ["wt","mayun","liuyifei","zhaoliying","mahuateng"];
  uint[] candidateIds;
  mapping (uint => uint) public votesReceived;
  // Constructor inicializa lista de candidatos
  constructor(uint[] _candidateIds) public {

      candidateIds = _candidateIds;
  }

  // Consulta el número total de votos para un candidato
  function totalVotesFor(uint candidate) public constant returns (uint) {
    require(validCandidate(candidate) == true);
    // o
    // assert(validCandidate(candidate) == true);
    return votesReceived[candidate];
  }

  // vota por un candidato
  function voteForCandidate(uint candidate)public {
    assert(validCandidate(candidate) == true);
    votesReceived[candidate] += 1;
  }

  // Recuperar si la identificación del voto es la identificación del candidato
  function validCandidate(uint candidate) public constant returns (bool) {
    for(uint i = 0; i < candidateIds.length; i++) {
      if (candidateIds[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}