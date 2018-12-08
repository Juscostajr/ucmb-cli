require("../../util.js");
const inquirer = require("inquirer");
const fs = require("fs");
const q = require("q");
const dao = require("./dao");
const camposBO = require('./campos');

const SRC_PATH = "./src/";
let form = {};

dao
  .then(findAll => {
    return findAll.formularios();
  })
  .then(formularios => {
    return inquirer.prompt({
      type: "list",
      name: "modelo",
      message: "Escolha o modelo ao qual deseja versionar:",
      choices: formularios
    });
  })
  .then(response => {
    form.name = response.modelo;
    form.path = SRC_PATH + response.modelo.toCamelCase();
    return dao;
  })
  .then(findAll => {
    return findAll.versoes(form.name);
  })
  .then(versoes => {
    return inquirer.prompt({
      type: "list",
      name: "versao",
      message: "Escolha a versão desejada:",
      choices: versoes
    });
  })
  .then(response => {
    form.version = response.versao;
    if (!fs.exists(form.path)) makeDir(form.path);
    return;
  })
  .then(etapas => {
    return makeDir(form.path + "/v" + form.version);
  })
  .then(success => {
    for (i = form.version; i-- ; i > 0) {
      if (fs.existsSync(`${form.path}/v${i}/`)) {
        return copyFile(
          `${form.path}/v${i}/index.js`,
          `${form.path}/v${form.version}/index.js`
        );
      }
    }
    return copyFile(
      `${SRC_PATH}common/index.js`,
      `${form.path}/v${form.version}/index.ts`
    );
  })
  .then(success => {
    return dao;
  })
  .then(list => {
    return list.etapas(form.name, form.version);
  })
  .then(etapas => {
    return makeFile(
      `${form.path}/v${form.version}/`,
      "etapas.js",
      `module.exports = ${JSON.stringify(etapas)}`
    );
  })
  .then(success => {
    return dao;
  })
  .then(list =>{
    return list.campos(form.name,form.version);
  })
  .then(campos => {
    campos = camposBO.camposObj(campos);
    return makeFile(
      `${form.path}/v${form.version}/`,
      'campos.js',
      `module.exports = ${JSON.stringify(campos)}`
    );
  })
  .then(success => {
    console.log('Operação realizada com sucesso.');
    process.exit();
  })
  .catch(error => {
    console.log(error);
    process.exit();
  })
  .done();

function makeDir(resposta) {
  const deferred = q.defer();
  fs.mkdir(resposta, function(err) {
    if (err) {
      deferred.reject(Error('A versão selecionada já existe!'));
    } else {
      deferred.resolve(`O projeto ${resposta} foi criado!`);
    }
  });
  return deferred.promise;
}

function makeFile(path, file, content) {
  const deferred = q.defer();
  fs.writeFile(`${path}/${file}`, content, function(err) {
    if (err) {
      deferred.reject(Error(err));
    } else {
      deferred.resolve(`Arquivo ${file} salvo com sucesso!`);
    }
  });
  return deferred.promise;
}

function copyFile(source, target) {
  const deferred = q.defer();
  fs.copyFile(source, target, err => {
    if (err) {
      deferred.reject(Error(err));
    } else {
      deferred.resolve("Projeto gerado com sucesso!");
    }
  });
  return deferred.promise;
}
