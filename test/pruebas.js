var Votaciones = artifacts.require("Votaciones.sol");

//Instancia del contrato que trae las cuentas de prueba
contract("Votaciones", (accounts) =>{
    before(async () => {
        this.votaciones = await Votaciones.deployed();
      });

  //Numero de candidatos inicializados
  it("empieza con dos listas", async () => {
    const candidatesCount = await this.votaciones.candidatesCount(); 
      assert.equal(candidatesCount, 2);
  });

  //Los valores de candidatos inicializados con valores correctos
  it("inicializa las listas con valores correctos", async () => {
    const candidate = await this.votaciones.candidates(1); 
      assert.equal(candidate[0], 1, "contiene el correcto id");
      assert.equal(candidate[1], "Lista 1", "contiene el correcto nombre");
      assert.equal(candidate[2], 0, "contiene la inicializacion de votos correcto");
      const candidate2 = await this.votaciones.candidates(2); 
      assert.equal(candidate2[0], 2, "contains the correct id");
      assert.equal(candidate2[1], "Lista 2", "contiene el correcto nombre");
      assert.equal(candidate2[2], 0, "contiene la inicializacion de votos correcto");
  });

  it("permite que un votante emita un voto", async () => {
    candidateId = 1;
    const voto = await this.votaciones.vote(candidateId, { from: accounts[0] });
    const voted = await this.votaciones.voters(accounts[0]);
      assert(voted, "El votante fue marcado como votado");
      const candidate = await this.votaciones.candidates(candidateId);
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "Incrementa el conteo de votos del candidato");
  });

  it("lanza una excepción para candidatos inválidos", function() {
    return Votaciones.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "el mensaje de error debe contener revertir");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "el candidato 1 no recibió ningún voto");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "El candidato 2 no recibió ningún voto.");
    });
  });
  it("lanza una excepción para la doble votación", function() {
    return Votaciones.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 2;
      electionInstance.vote(candidateId, { from: accounts[1] });
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "acepta el primer voto");
      // Try to vote again
      return electionInstance.vote(candidateId, { from: accounts[1] });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "el mensaje de error debe contener revertir");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "el candidato 1 no recibió ningún voto");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 1, "El candidato 2 no recibió ningún voto");
    });
  });
  it("permite que un votante emita un voto", async () =>{
    return Votaciones.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, { from: accounts[0] });
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, "se desencadenó un evento");
      assert.equal(receipt.logs[0].event, "votedEvent", "el tipo de evento es correcto");
      assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "la identificación del candidato es correcta");
      return electionInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "El votante fue marcado como votado");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "Incrementa el conteo de votos del candidato");
    })
  });
});