require('../../util');
module.exports = {
  camposObj: function(result) {
    let obj = {};
    for (linha in result) {
        let nome = result[linha].nome.replace('_01','');
      obj[nome.toUnderscore()] = "$" + nome;
    }
    return obj;
  }
};
