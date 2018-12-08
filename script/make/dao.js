const mysql = require("./connection");
const q = require("q");
require("../../util.js");

function conn() {
  const deferred = q.defer();
  mysql.connect(function(err) {
    if (err) {
      deferred.reject(Error("Não foi possivel conectar ao banco de dados."));
    } else {
      deferred.resolve("Conexão bem sucedida.");
    }
  });
  return deferred.promise;
}

function toArray(result, attr) {
  let arr = [];
  for (linha in result) {
    arr.push(result[linha][attr]);
  }
  return arr;
}

function makeEtapasObj(result) {
  let obj = {};
  for (linha in result) {
    obj[result[linha].descricao.toUnderscore()] = result[linha].codigo;
  }
  return obj;
}
let findAll = {
  formularios: function() {
    const deferred = q.defer();
    const sql = "SELECT distinct DES_TITULO as nome FROM formulario ORDER BY DES_TITULO ASC";
    mysql.query(sql, function(err, result) {
      if (err) {
        deferred.reject(Error("Houve um erro na consulta SQL"));
      } else {
        deferred.resolve(toArray(result, "nome"));
      }
    });
    return deferred.promise;
  },
  versoes: function(formulario) {
    const deferred = q.defer();
    const sql =
      "SELECT CAST(COD_VERSAO as CHAR) as versao FROM formulario WHERE DES_TITULO = ?";
    mysql.query(sql, [formulario], function(err, result) {
      if (err) {
        deferred.reject(Error("Houve um erro na consulta SQL"));
      } else {
        deferred.resolve(toArray(result, "versao"));
      }
    });
    return deferred.promise;
  },
  etapas: function(formulario, versao) {
    const deferred = q.defer();
    const sql = `SELECT COD_ETAPA as codigo, DES_ETAPA as descricao FROM etapa  
      WHERE COD_FORM = ( 
      SELECT COD_FORM FROM formulario f WHERE f.DES_TITULO = ? AND f.COD_VERSAO = ? 
      ) 
      AND COD_VERSAO = ?`;
    mysql.query(sql, [formulario, versao, versao], function(err, result) {
      if (err) {
        deferred.reject(Error("Houve um erro na consulta SQL"));
      } else {
        deferred.resolve(makeEtapasObj(result));
      }
    });
    return deferred.promise;
  },
  campos: function(formulario, versao) {
    const deferred = q.defer();
    const sql = `SELECT DES_NOME as nome FROM campo 
      where COD_FORM = ( 
        select COD_FORM from formulario where DES_TITULO = ? LIMIT 1 
      ) 
      AND COD_VERSAO = ? 
      AND NUM_LINHA_GRUPO <= 1 
      AND DES_NOME NOT IN ('OBSERVACAO','JAVASCRIPT','SCRIPT','HISTORICO','OBS_USUARIO')`;

    mysql.query(sql, [formulario, versao], function(err, result) {
      if (err) {
        deferred.reject(Error("Houve um erro na consulta SQL"));
      } else {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  }
};

module.exports = conn().then(function(connected) {
  return findAll;
});
