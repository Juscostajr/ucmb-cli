module.exports = function (nome, maxRepeticoes) {
	maxRepeticoes = maxRepeticoes === undefined ? 99 : maxRepeticoes;
	return {
		id: function (campo, index) {
			return montarIdCampo(campo, index);
		},
		contar: function () {
			var nrRepeticoes = 0;
			for (var i = 1; i <= maxRepeticoes; i++) {
				if (atos.campo(this.id(nome, i)).valor() == "") {
					break;
				}
				nrRepeticoes++;
			}
			return nrRepeticoes;
		},
		campo: function (index, campo) {
			return atos.campo(this.id(campo, index));
		},
		jq: function (index, campo) {
			return $('#\\$' + campo + '_' + ('00' + index).slice(-2))
		},
		each: function (func) {
			for (var i = 1; i <= this.contar(); i++) {
				//callback({campo: atos.campo, jq: jQuery},key)
				func({
					campo: function (c) {
						return atos.campo(montarIdCampo(c, i))
					},
					jq: function (c) {
						return $('#\\' + montarIdCampo(c, i))
					}
				}, i);
			}
		}
	}

	function montarIdCampo(campo, index) {
		return '$' + campo + '_' + ('00' + index).slice(-2)
	}


}