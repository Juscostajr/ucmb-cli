const initLayout = require('../../common/style');
const atos = require('../../common/atos.js');
const repeticao = require('../../common/repeticao.js');
const e:etapa = require('./etapas');
const c:campo = require('./campos');
//Códigos das etapas do processo

atos.verbose = true;
$(document).ready(function () {
    codEtapa = toNumber(atos.codigoEtapa);
    initLayout();
    setLayout();
    if (document.form) {
        if (document.form.sCodEtapa) {
            initForm();
            setForm();
            setValidators();
        }
    }
});

/*
 * Formata o layout geral
 */
function setLayout(){

}
/*
 *Inicia forumlário Listeners/Eventos
*/
function initForm() {

}

/*
 * Formata o formulário Condicionais
 */
function setForm() {
}

/*
 * Seta obrigatoriedade aos campos / Valida valores
 */
function setValidators() {

}
