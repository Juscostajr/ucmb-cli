var AtosCampos = {

    init: function (options, elem) {
        this.options = $.extend({}, this.options, options);

        this.elem = elem;
        this.id = options.id;
        this.indice = options.indice;

        if (options.isCampoExistente) {
            this._reseleciona(options, elem, this._arrayElementos());
        }

        this._instanciaFuncoesCampo(this.options);

        return this;
    },

    _refreshInstance: function (options, elem) {
        this.elem = elem;
        this.id = options.id;
        this.indice = options.indice;

        this.options = $.extend({}, this.options, options);
        // apenas atualiza a instancia com o options passado
        this._instanciaFuncoesCampo(options);
    },

    _arrayElementos: function () {
        return ['label', 'campo', 'container', 'bloco', 'campoLeituraMostrado', 'campoUploadMostrado', 'form', 'botaoAdiciona', 'botaoRemove', 'botoesRepeticao', 'botaoLupa', 'botaoData', 'botaoRefresh', 'obrigatoriedade'];
    },

    elementos: {},

    _reseleciona: function (options, elem, arrayElementos) {
        this.$elem = $(elem);
        this.elementos = this.elementos || {};

        arrayElementos = arrayElementos || this._arrayElementos();

        for (var i = 0; i < arrayElementos.length; i++) {
            this.elementos[arrayElementos[i]] = this._retornaElemento(arrayElementos[i]);
        }
        //TODO:teste se � invisivel pelo options do template
    },

    _retornaElemento: function (elemento) {
        switch (elemento) {
        case 'label':
            return document.getElementById(this.id + '_0');
            break;
        case 'obrigatoriedade':
            return (document.getElementById(this.id + '_0')) ? document.getElementById(this.id + '_0').getElementsByTagName('EM')[0] : null;
            break;
        case 'container':
            return this.elem;
            break;
        case 'campo':
            if (this.options.isCampoGrid) {
                if (typeof this.options.id_data !== 'undefined' && this.options.id_data !== null) {
                    return document.getElementById(this.options.id_campo + '_' + this.options.id_data);
                } else {
                    return $('input[id^=\\' + this.options.id + ']:visible, select[id^=\\' + this.options.id + ']:visible');
                }
            } else {
                return document.getElementById(this.id);
            }
            break;
        case 'campoLeituraMostrado':
            if (this.options.tipo == 'leitura') {
                return document.getElementById(this.id + '_conteudo');
            }
            break;
        case 'campoUploadMostrado':
            if (this.options.tipo == 'template') {
                return document.getElementById(this.id + 'Apresentacao');
            }
            break;
        case 'form':
            return this.$elem.closest('form')[0];
            break;
        case 'botaoAdiciona':
            if (this.options.isBloco) {
                return $(this.elementos.bloco).find('[id^=add_]')[0];
            } else if (this.options.isRepeticao) {
                return this.$elem.find('[id^=add_]')[0];
            } else if (this.options.isGrid) {
                return this.$elem.find('a[id$="_add"]')[0];
            }
            break;
        case 'botaoRemove':
            if (this.options.isBloco) {
                return $(this.elementos.bloco).find('[id^=remover_]')[0];
            } else if (this.options.isRepeticao) {
                return this.$elem.find('[id^=remover_]')[0];
            } else if (this.options.isGrid) {
                return this.$elem.find('a[id$="_remove"]')[0];
            }
            break;
        case 'botoesRepeticao':
            if (this.options.isBloco) {
                return $(this.elementos.bloco).find('[id^=campos_repeticao_]')[0];
            } else if (this.options.isRepeticao) {
                return this.$elem.find('[id^=campos_repeticao_]')[0];
            }
            break;
        case 'bloco':
            if (this.options.isBloco) {
                return document.getElementById(this.options.idBloco);
            }
            break;
        case 'botaoLupa':
            if (this.options.isLupa) {
                return this.$elem.find('[id^=lupa_]')[0];
            }
            break;
        case 'botaoData':
            if (this.options.isData) {
                return this.$elem.find('[id^=btn_]')[0];
            }
            break;
        case 'botaoRefresh':
            if (this.options.isRefresh) {
                return this.$elem.find('[id$=_refresh]')[0];
            }
            break;
        }
    },

    _retornaQueryElemento: function (elemento, options) {
        switch (elemento) {
        case 'label':
            if (options.repInteira) {
                return 'label[for^="\\' + this.options.idRepeticao + '_"]';
            } else if (options.isRepeticao) {
                return 'label[for="\\' + this.options.id + '"]';
            }
            break;
        case 'obrigatoriedade':
            if (options.repInteira) {
                return (document.getElementById(this.id + '_0')) ? 'label[for^="\\' + this.options.idRepeticao + '_"] em' : '';
            } else if (options.isRepeticao) {
                //Teste feito com "this.options.idCampoOriginal", pois como é para campo inexistente as vezes, não terá como saber se é um campo obrigatório ou não;
                return (document.getElementById(this.options.idCampoOriginal + '_0')) ? 'label[for="\\' + this.options.id + '"] em' : '';
            }
            break;
        case 'container':
            return 'li[id$="_1"].campo';
            break;
        case 'campo':
            if (options.repInteira) {
                return 'input[id^="\\' + this.options.idRepeticao + '_"]:visible, select[id^="\\' + this.options.idRepeticao + '_"]:visible';
            } else if (options.isRepeticao) {
                return 'input[id="\\' + this.options.id + '"], select[id="\\' + this.options.id + '"]';
            }
            break;
        case 'campoLeituraMostrado':
            return (this.options.tipo == 'leitura') ? 'span[id$="_conteudo"]' : '';
            break;
        case 'campoUploadMostrado':
            return (this.options.tipo == 'template') ? 'input[id$="Apresentacao"]' : '';
            break;
        case 'form':
            return 'div.container form#form';
            break;
        case 'botaoAdiciona':
            if (options.repInteira) {
                return '[id^=add_]';
            } else if (options.isRepeticao) {
                return '[id^=add_][id*=\\' + this.options.id + ']';
            }
            break;
        case 'botaoRemove':
            if (options.repInteira) {
                return '[id^=remover_]';
            } else if (options.isRepeticao) {
                return '[id^=remover_][id*=\\' + this.options.id + ']';
            }
            break;
        case 'botoesRepeticao':
            if (options.repInteira) {
                return '[id^=campos_repeticao_]';
            } else if (options.isRepeticao) {
                return '[id^=campos_repeticao_][id*=\\' + this.options.id + ']';
            }
            break;
        case 'bloco':
            return (this.options.isBloco) ? 'li[id^=id_bloco]' : '';
            break;
        case 'botaoLupa':
            if (options.repInteira) {
                return (this.options.isLupa) ? '[id^=lupa_]' : '';
            } else if (options.isRepeticao) {
                return (this.options.isLupa) ? '[id^=lupa_\\' + this.options.id + ']' : '';
            }
            break;
        case 'botaoData':
            if (options.repInteira) {
                return (this.options.isData) ? '[id^=btn_]' : '';
            } else if (options.isRepeticao) {
                return (this.options.isData) ? '[id^=btn_\\' + this.options.id + ']' : '';
            }
            break;
        case 'botaoRefresh':
            if (options.repInteira) {
                return (this.options.isRefresh) ? '[id$=_refresh]' : '';
            } else if (options.isRepeticao) {
                return (this.options.isRefresh) ? '[id=\\' + this.options.id + '_botao_refresh] ' : '';
            }
            break;
        }
    },
    //TODO: levar para o mesmo objeto, passando como segundo parametro o options para poder selecionar os corretos;
    _retornaQueryElementoGrid: function (elemento, idColuna) {
        switch (elemento) {
        case 'label':
            return '';
            break;
        case 'obrigatoriedade':
            return '';
            break;
        case 'campo':
            if (typeof idColuna === 'string' && idColuna != null) {
                return 'input[id^="\\' + idColuna + '"]:visible, select[id^="\\' + idColuna + '"]:visible';
            } else {
                return 'input:not(.checkboxGridEtapa):visible, select:visible';
            }
            break;
        case 'campoLeituraMostrado':
            return '';
            break;
        case 'botaoAdiciona':
            if (typeof idColuna === 'undefined' && !idColuna) {
                return 'a[id$="_add"]';
            } else {
                return '';
            }
            return '';
            break;
        case 'botaoRemove':
            if (typeof idColuna === 'undefined' && !idColuna) {
                return 'a[id$="_remove"]';
            } else {
                return '';
            }
            return '';
            break;
        case 'botaoData':
            return '';
            break;
        }
    },

    _instanciaFuncoesCampo: function (options) {
        if (options.isCampoExistente) {
            if (options.isGrid) {
                this._grid();
            } else if (options.isCampoGrid) {
                this._campoGrid(this);
            } else {
                this.campo();
            }

            (options.isLupa) ? this._lupa(): undefined;
            (options.isData) ? this._data(): undefined;
            (options.isRefresh) ? this._refresh(): undefined;
            (options.isRepeticao) ? this._repeticao(): undefined;
            (options.isLista) ? this._lista(): undefined;
        } else if (options.isCampoGrid) {
            this._campoGrid(this);

            if (window.console && window.console.info && atos.verbose) {
                console.info('O campo (grid) ainda não está inicializado (em tela), os únicos métodos disponíveis nesse momento serão: "configurar()".');
            }
        } else {
            this.campoInexistente();
        }

    },
    bindToElements: function (funcao, arguments, indice) {
        if (typeof indice === 'undefined' && !indice) {
            indice = this.indice;
        }

        var propCamposRepeticao = atos._propCampos[this.options.idRepeticao + '_' + this.indice + '_1'];

        if (funcao == 'escondeBotaoRepeticao' || funcao == 'mostraBotaoRepeticao') {
            if (propCamposRepeticao) {
                propCamposRepeticao.elementosRetornoRepeticao = true;
            }
        }

        var bindTo;
        var args = arguments;

        if (this.options.isBloco) {
            bindTo = $('#' + formataIdCampos(this.options.idBloco)).closest('li.blocosContainer')[0];
        } else {
            bindTo = $('#' + formataIdCampos(this.options.idCampoOriginal)).closest('li.repeticaoContainer')[0];
        }

        var functionBindToElements = $.proxy(function (e, dados) {
            if (funcao == 'escondeBotaoRepeticao' || funcao == 'mostraBotaoRepeticao') {
                if (propCamposRepeticao) {
                    propCamposRepeticao.elementosRetornoRepeticao = true;
                }
            }

            atos.campo(this.id)[funcao].apply(this, args);

            //O comportamento padrão esperado ao remover uma repetição de tela, é que ela seja limpa, então não deixamos o evento de preenchimento acontecer mais de 1 vez;
            //Tem que acontecer 1 vez, pois a repetição pode não estar em tela, e passar a existir posteriormente, nesse caso o evento deve ser disparado 1 vez;
            if (funcao == 'valor') {
                $(bindTo).off('retornoRepeticao' + (parseInt(indice) - 1), functionBindToElements);
            }
        }, this);

        $(bindTo).on('retornoRepeticao' + (parseInt(indice) - 1), functionBindToElements);
    },
    campoInexistente: function () {
        var _function = this.bindToElements;

        this.escondeLinha = function () {
            if (this.options.isRepeticao && !this.options.isBloco && $('#\\' + this.options.idCampoOriginal + '_1').hasClass('semQuebra')) {
                escondeLinha(this.options.idCampoOriginal);
            } else {
                _function.apply(this, ['escondeLinha', arguments, this.indice]);
            }
        };
        this.mostraLinha = function () {
            if (this.options.isRepeticao && !this.options.isBloco && $('#\\' + this.options.idCampoOriginal + '_1').hasClass('semQuebra')) {
                mostraLinha(this.options.idCampoOriginal);
            } else {
                _function.apply(this, ['mostraLinha', arguments, this.indice]);
            }
        };

        this.adicionarObrigatoriedade = function (obj) {
            _function.apply(this, ['adicionarObrigatoriedade', arguments, this.indice]);
        };
        this.removerObrigatoriedade = function () {
            _function.apply(this, ['removerObrigatoriedade', arguments, this.indice]);
        };
        this.addEvent = function () {
            var method = 'addEvent';
            var that = this;
            var propCamposPrimeiraRepeticao = atos._propCampos[this.options.idRepeticao + '_01_1'];

            if (propCamposPrimeiraRepeticao && propCamposPrimeiraRepeticao.repInteira) {
                propCamposPrimeiraRepeticao.repInteira = false;
                var args = Array.prototype.slice.call(arguments);
                var clientFunction = args[2]; // it takes the function passed
                var _currentEvent; //guarda o event para acessar o target caso data.campo seja invocado
                args[2] = function (e) {
                    _currentEvent = e;
                    return clientFunction.apply(this, arguments);
                };
                var target = args.shift();
                var $bindTo;
                this._reseleciona(this.options, formataIdCampos(this.elem));
                var $el = $(this.elementos[target]);
                args.splice(1, 0, {
                    get campo() {
                        var _campo = {};
                        //pega os dados do campo com base no target
                        var idCampo = $(_currentEvent.target).closest('.campo').attr('id'); // ex: "$CAMPO1_03_1"
                        var idCampomatch = idCampo.match(/(.*)_([\d]*)_1$/);
                        var idRepeticao = idCampomatch[1]; // ex: "$CAMPO1"
                        var idIndice = idCampomatch[2]; //ex: "03"

                        //se for retornoAdicionarRepeticao, passar o campo recem chegado como parametro do handler
                        if (_currentEvent.type == 'retornoAdicionarRepeticao') {
                            idIndice++;
                            _campo = atos.campo(idRepeticao + "_" + ((idIndice) < 10 ? '0' : '') + idIndice);
                        } else {
                            _campo = atos.campo(idRepeticao + '_' + idIndice);
                        }
                        return _campo;
                    }
                });
                args.splice(1, 0, this._retornaQueryElemento(target, this.options));

                if (this.options.isBloco) {
                    $bindTo = $('#' + formataIdCampos(this.options.idBloco)).closest('li.blocosContainer');
                } else {
                    $bindTo = $('#' + formataIdCampos(this.options.idCampoOriginal)).closest('li.repeticaoContainer');
                }

                $bindTo.on.apply($bindTo, args);
            } else if (this.options.isRepeticao) {
                var args = Array.prototype.slice.call(arguments);
                var target = args.shift();
                this._reseleciona(this.options, formataIdCampos(this.elem));

                args.splice(1, 0, {
                    get campo() {
                        atos.campo(that.id);
                        return that;
                    }
                });
                args.splice(1, 0, this._retornaQueryElemento(target, this.options));

                if (this.options.isBloco) {
                    $bindTo = $('#' + formataIdCampos(this.options.idBloco)).closest('li.blocosContainer');
                } else {
                    $bindTo = $('#' + formataIdCampos(this.options.idCampoOriginal)).closest('li.repeticaoContainer');
                }

                $bindTo.on.apply($bindTo, args);
            } else {
                var args = Array.prototype.slice.call(arguments);
                var target = args.shift();
                this._reseleciona(this.options, formataIdCampos(this.elem));
                var $el = $(this.elementos[target]);
                args.splice(1, 0, {
                    get campo() {
                        atos.campo(that.id);
                        return that;
                    }
                });
                $el.on.apply($el, args);
            }
        };
        this.configuraMascara = function (obj) {
            _function.apply(this, ['configuraMascara', arguments, this.indice]);
        };
        this.removeMascara = function (arrayOptions) {
            _function.apply(this, ['removeMascara', arguments, this.indice]);
        };
        this.mostraCampo = function () {
            _function.apply(this, ['mostraCampo', arguments, this.indice]);
        };
        this.escondeCampo = function () {
            _function.apply(this, ['escondeCampo', arguments, this.indice]);
        };
        this.escondeElementoRepeticao = function () {
            _function.apply(this, ['escondeElementoRepeticao', arguments, this.indice]);
        };
        this.mostraElementoRepeticao = function () {
            _function.apply(this, ['mostraElementoRepeticao', arguments, this.indice]);
        };
        this.bloqueiaCampo = function () {
            _function.apply(this, ['bloqueiaCampo', arguments, this.indice]);
        };
        this.bloqueiaLista = function () {
            _function.apply(this, ['bloqueiaLista', arguments, this.indice]);
        };
        this.desbloqueiaCampo = function () {
            _function.apply(this, ['desbloqueiaCampo', arguments, this.indice]);
        };
        this.desbloqueiaLista = function () {
            _function.apply(this, ['desbloqueiaLista', arguments, this.indice]);
        };
        this.label = function () {
            return '';
        };
        this.valor = function (valor) {
            if (valor != undefined) {
                _function.apply(this, ['valor', arguments, this.indice]);
            } else {
                return '';
            }
        };
        this.valorCriptografado = function (valor) {
            if (valor != undefined) {
                _function.apply(this, ['valorCriptografado', arguments, this.indice]);
            } else {
                return '';
            }
        };

        this.existe = function () {
            return false;
        };
        this.css = function () {
            _function.apply(this, ['css', arguments, this.indice]);
        };
        this.mostraLupa = function () {
            _function.apply(this, ['mostraLupa', arguments, this.indice]);
        };
        this.escondeLupa = function () {
            _function.apply(this, ['escondeLupa', arguments, this.indice]);
        };
        this.mostraCalendario = function () {
            _function.apply(this, ['mostraCalendario', arguments, this.indice]);
        };
        this.escondeCalendario = function () {
            _function.apply(this, ['escondeCalendario', arguments, this.indice]);
        };
        this.mostraRefresh = function () {
            _function.apply(this, ['mostraRefresh', arguments, this.indice]);
        };
        this.escondeRefresh = function () {
            _function.apply(this, ['escondeRefresh', arguments, this.indice]);
        };
        this.mostraBotaoRepeticao = function () {
            _function.apply(this, ['mostraBotaoRepeticao', arguments, this.indice]);
        };
        this.escondeBotaoRepeticao = function () {
            _function.apply(this, ['escondeBotaoRepeticao', arguments, this.indice]);
        };
        this.adicionaCampoRepeticao = function () {
            _function.apply(this, ['adicionaCampoRepeticao', arguments, this.indice]);
        };
        this.retiraCampoRepeticao = function () {
            _function.apply(this, ['retiraCampoRepeticao', arguments, this.indice]);
        };
        this.getElemHTML = function (elem) {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('O campo não está em tela.');
            }
        };
        this.focus = function () {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('O campo não está em tela.');
            }
        };
        this.adicionarCalendario = function () {
            _function.apply(this, ['adicionarCalendario', arguments, this.indice]);
        };
        this.removerCalendario = function () {
            _function.apply(this, ['removerCalendario', arguments, this.indice]);
        };
        this.adicionaItemLista = function (arrayOptions) {
            _function.apply(this, ['adicionaItemLista', arguments, this.indice]);
        };
        this.removeItemLista = function (arrayOptions) {
            _function.apply(this, ['removeItemLista', arguments, this.indice]);
        };

        this.botaoMais = function () {};
        this.botaoMenos = function () {};
    },
    debuncedRedefineWidth: redefineWidth,
    //se auto extende com as fun��es basicas de campo
    objFiltrarGrid: {
        _objDados: {},

        set: function (obj) {
            if (typeof obj === 'object' && obj != null) {
                var uniqueGrid = Object.keys(obj)[0];

                if (typeof this._objDados[uniqueGrid] === 'undefined') {
                    this._objDados[uniqueGrid] = obj[uniqueGrid];
                } else {
                    if (window.console && window.console.warn && atos.verbose) {
                        console.warn('Só é possível setar o filtro 1 vez por grid.');
                    }
                }
            }
        },

        get: function (sChave) {
            if ((typeof sChave === 'number' || typeof sChave === 'string') && sChave != null) {
                return this._objDados[sChave] || '';
            }
        }
    },
    campo: function (idCampo) {
        var _function = function (funcao, arguments) {
            atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
            for (var i = 1; i <= this.options.numRepeticao; i++) {
                var indice = (i < 10) ? ('0' + i) : (i);
                var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                contextoApply.options.repInteira = false;
                contextoApply[funcao].apply(contextoApply, arguments);

                //O comportamento padrão esperado ao remover uma repetição de tela, é que ela seja limpa, então não deixamos o evento de preenchimento acontecer mais de 1 vez;
                if (funcao != 'valor') {
                    this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
                }
            };
        };

        //Funcao que esconde todo o container de um determinado campo
        this.escondeLinha = function () {
            var method = 'escondeLinha';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                escondeLinha(this.id);

                this.debuncedRedefineWidth();
            }
        };

        //Funcao que mostra todo o container de um determinado campo
        this.mostraLinha = function () {
            var method = 'mostraLinha';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                mostraLinha(this.id);

                this.debuncedRedefineWidth();
            }
        };

        //Funcao que adiciona obrigatoriedade de um determinado campo
        this.adicionarObrigatoriedade = function (obj) {
            if ((!this.options.isInvisivel) && (this.options.tipo != 'leitura')) {
                var method = 'adicionarObrigatoriedade';
                if (this.options.repInteira) {
                    _function.apply(this, [method, arguments]);
                } else {
                    if (this.options.isRepeticao) {
                        this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                    }

                    adicionarObrigatoriedade(this.id, (typeof obj === "string") ? obj : obj.tipo);
                }
            } else {
                if (window.console && window.console.warn && atos.verbose) {
                    console.warn('Não é possível adicionar obrigatoriedade ao campo ' + this.id + ' pois ele é ' + ((this.options.isInvisivel) ? 'invisível' : 'somente leitura'));
                }
            }
        };

        //Funcao que remove obrigatoriedade de um determinado campo
        this.removerObrigatoriedade = function () {
            if ((!this.options.isInvisivel) && (this.options.tipo != 'leitura')) {
                var method = 'removerObrigatoriedade';

                if (this.options.repInteira) {
                    _function.apply(this, [method, arguments]);
                } else {
                    if (this.options.isRepeticao) {
                        this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                    }

                    removerObrigatoriedade(this.id);
                }
            } else {
                if (window.console && window.console.warn && atos.verbose) {
                    console.warn('Não é possível remover obrigatoriedade do campo ' + this.id + ' pois ele é ' + ((this.options.isInvisivel) ? 'invisível' : 'somente leitura'));
                }
            }
        };

        //Funcao que adiciona evento para campos em tela, ou nao
        this.addEvent = function () {
            var method = 'addEvent';
            var that = this;
            var propCamposPrimeiraRepeticao = atos._propCampos[this.options.idRepeticao + '_01_1'];

            if (propCamposPrimeiraRepeticao && propCamposPrimeiraRepeticao.repInteira) {
                propCamposPrimeiraRepeticao.repInteira = false;
                var args = Array.prototype.slice.call(arguments);
                var clientFunction = args[2]; // it takes the function passed
                var _currentEvent; //guarda o event para acessar o target caso data.campo seja invocado
                args[2] = function (e) {
                    _currentEvent = e;
                    return clientFunction.apply(this, arguments);
                };
                var target = args.shift();
                var $bindTo;
                this._reseleciona(this.options, this.elem);
                var $el = $(this.elementos[target]);
                args.splice(1, 0, {
                    get campo() {
                        var _campo = {};
                        //pega os dados do campo com base no target
                        var idCampo = $(_currentEvent.target).closest('.campo').attr('id'); // ex: "$CAMPO1_03_1"
                        var idCampomatch = idCampo.match(/(.*)_([\d]*)_1$/);
                        var idRepeticao = idCampomatch[1]; // ex: "$CAMPO1"
                        var idIndice = idCampomatch[2]; //ex: "03"

                        //se for retornoAdicionarRepeticao, passar o campo recem chegado como parametro do handler
                        if (_currentEvent.type == 'retornoAdicionarRepeticao') {
                            idIndice++;
                            _campo = atos.campo(idRepeticao + "_" + ((idIndice) < 10 ? '0' : '') + idIndice);
                        } else {
                            _campo = atos.campo(idRepeticao + '_' + idIndice);
                        }
                        return _campo;
                    }
                });
                args.splice(1, 0, this._retornaQueryElemento(target, this.options));

                if (this.options.isBloco) {
                    $bindTo = $('#' + formataIdCampos(this.options.idBloco)).closest('li.blocosContainer');
                } else {
                    $bindTo = $('#' + formataIdCampos(this.options.idCampoOriginal)).closest('li.repeticaoContainer');
                }

                $bindTo.on.apply($bindTo, args);
            } else if (this.options.isRepeticao) {
                var args = Array.prototype.slice.call(arguments);
                var target = args.shift();
                this._reseleciona(this.options, this.elem);

                args.splice(1, 0, {
                    get campo() {
                        atos.campo(that.id);
                        return that;
                    }
                });
                args.splice(1, 0, this._retornaQueryElemento(target, this.options));
                if (this.options.isBloco) {
                    $bindTo = $('#' + formataIdCampos(this.options.idBloco)).closest('li.blocosContainer');
                } else {
                    $bindTo = $('#' + formataIdCampos(this.options.idCampoOriginal)).closest('li.repeticaoContainer');
                }
                $bindTo.on.apply($bindTo, args);
            } else {
                var args = Array.prototype.slice.call(arguments);
                var target = args.shift();
                this._reseleciona(this.options, this.elem);
                var $el = $(this.elementos[target]);
                args.splice(1, 0, {
                    get campo() {
                        atos.campo(that.id);
                        return that;
                    }
                });
                $el.on.apply($el, args);
            }
        };

        //Funcao que configura a mascara de um determinado campo
        this.configuraMascara = function () {
            var method = 'configuraMascara';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                var args = Array.prototype.slice.call(arguments);
                this._reseleciona(this.options, this.elem, ['campo']);
                var $el = $(this.elementos['campo']);
                $el.mask.apply($el, args);
            }
        };

        //Funcao que remove a marcara
        this.removeMascara = function () {
            var method = 'removeMascara';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['campo']);
                $(this.elementos.campo).unmask();
            }
        };

        //Funcao que mostra um determinado campo
        this.mostraCampo = function () {
            var method = 'mostraCampo';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['container']);
                this.elementos.container.style.display = '';

                this.debuncedRedefineWidth();
            }
        };

        //Funcao que esconde um determinado campo
        this.escondeCampo = function () {
            var method = 'escondeCampo';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['container']);
                this.elementos.container.style.display = 'none';

                this.debuncedRedefineWidth();
            }
        };

        //Funcao que bloqueia um determinado campo
        this.bloqueiaCampo = function () {
            var method = 'bloqueiaCampo';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['campo']);
                $(this.elementos.campo).attr('disabled', 'disabled').addClass('isDisable');
            }
        };

        this.desbloqueiaCampo = function () {
            var method = 'desbloqueiaCampo';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['campo']);
                $(this.elementos.campo).removeAttr('disabled').removeClass('isDisable');
            }
        };

        this.label = function (valor) {
            this._reseleciona(this.options, this.elem, ['label']);
            var $label = $(this.elementos.label);

            if (typeof valor !== 'undefined') {
                var method = 'label';

                if (this.options.repInteira) {
                    _function.apply(this, [method, arguments]);
                } else {
                    if (this.options.isRepeticao) {
                        this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                    }

                    var $em = $label.find('EM');

                    $label.html(valor).append($em);
                }
            } else {
                var $textLabel = $label.text();

                if ($textLabel.length > 0) {
                    $textLabel = $textLabel.substring(0, $textLabel.length - 2);
                    return $textLabel.trim();
                } else {
                    return '';
                }
            }
        };

        this.valor = function (valor) {
            this._reseleciona(this.options, this.elem, ['campo']);
            var campo = this.elementos.campo;

            if (campo) {
                if (valor != undefined) {
                    var method = 'valor';

                    if (this.options.repInteira) {
                        _function.apply(this, [method, arguments]);
                    } else {
                        if (this.options.tipo == 'leitura') {
                            this._reseleciona(this.options, this.elem, ['campoLeituraMostrado']);
                            this.elementos.campoLeituraMostrado.innerHTML = valor;
                            campo.value = valor;
                        } else if (this.options.tipo == 'template') {
                            this._reseleciona(this.options, this.elem, ['campoUploadMostrado']);
                            this.elementos.campoUploadMostrado.value = valor;
                            this.elementos.campoUploadMostrado.title = valor;
                        } else if (this.options.tipo == 'monetario') {
                            campo.value = valor;
                            $(campo).trigger('atualizaValor.price_format');
                        } else {
                            campo.value = valor;
                        }
                    }
                } else {
                    if (this.options.tipo == 'template') {
                        this._reseleciona(this.options, this.elem, ['campoUploadMostrado']);
                        return this.elementos.campoUploadMostrado.value.trim();
                    } else {
                        return campo.value.trim();
                    }
                }
            } else {
                if (!valor) {
                    return "";
                }
            }
        };

        this.valorCriptografado = function (valor) {
            this._reseleciona(this.options, this.elem, ['campo']);
            var campo = this.elementos.campo;

            if (campo) {
                if (valor != undefined) {
                    var method = 'valorCriptografado';

                    if (this.options.repInteira) {
                        _function.apply(this, [method, arguments]);
                    } else {
                        if (this.options.isRepeticao) {
                            this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                        }

                        if (this.options.tipo == 'leitura') {
                            this.elementos.campo.value = valor;
                        } else if (this.options.tipo == 'template') {
                            this.elementos.campo.value = valor;
                        }
                    }
                } else {
                    if (this.options.tipo == 'template') {
                        return campo.value.trim();
                    } else {
                        return "";
                    }
                }
            } else {
                if (!valor) {
                    return "";
                }
            }
        };

        this.existe = function () {
            return true;
        };

        this.css = function () {
            var method = 'css';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                var args = Array.prototype.slice.call(arguments);
                var target = args.shift();
                this._reseleciona(this.options, this.elem, [target]);
                var $el = $(this.elementos[target]);
                $el.css.apply($el, args);
            }
        };

        this.getElemHTML = function (elem) {
            this._reseleciona(this.options, this.elem, [elem]);
            return this.elementos[elem];
        };

        this.focus = function () {
            this._reseleciona(this.options, this.elem, ['campo']);
            this.elementos.campo.focus();
        };

        this.adicionarCalendario = function () {
            var method = 'adicionarCalendario';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                if (!this.options.isData) {
                    var args = Array.prototype.slice.call(arguments);

                    var dayNames = atosI18n.messages['dayNames'].replace(/\'/gm, '');
                    dayNames = dayNames.split(',');
                    var dayNamesMin = atosI18n.messages['dayNamesMin'].replace(/\'/gm, '');
                    dayNamesMin = dayNamesMin.split(',');
                    var dayNamesMinShort = atosI18n.messages['dayNamesShort'].replace(/\'/gm, '');
                    dayNamesMinShort = dayNamesMinShort.split(',');
                    var monthNames = atosI18n.messages['monthNames'].replace(/\'/gm, '');
                    monthNames = monthNames.split(',');
                    var monthNamesShort = atosI18n.messages['monthNamesShort'].replace(/\'/gm, '');
                    monthNamesShort = monthNamesShort.split(',');

                    args[0] = $.extend({}, args[0], {
                        dayNames: dayNames,
                        dayNamesMin: dayNamesMin,
                        dayNamesMinShort: dayNamesMinShort,
                        monthNames: monthNames,
                        monthNamesShort: monthNamesShort,
                        nextText: atosI18n.messages['nextText'],
                        prevText: atosI18n.messages['prevText'],
                        showOtherMonths: true,
                        selectOtherMonths: true
                    });

                    atos._propCampos[this.id + '_1'].isData = true;
                    this.options.isData = true;
                    this._data();
                    this._reseleciona(this.options, this.elem, ['campo']);
                    var $el = $(this.elementos['campo']);
                    $el.after('<a id="btn_' + this.id + '" class="mini_botao"><img src="atos/images/calendar-month.png"></a>');
                    $el.datepicker.apply($el, args);
                    this.addEvent(atos.elemBotaoData, 'click', function () {
                        $el.datepicker('show');
                    });
                }
            }
        };

        this.removerCalendario = function () {
            var method = 'removerCalendario';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['campo']);
                $(this.elementos['campo']).datepicker('destroy');
                delete atos._propCampos[this.id + '_1']['isData'];
                delete this.options['isData'];
                atos.campo(this.id);
                $(this.elem).find('#btn_\\' + this.id).off().remove();
            }
        };

        this.mostraLupa = function () {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "mostraLupa()" não suportado para o campo ' + this.id);
            }
        };
        this.escondeLupa = function () {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "escondeLupa()" não suportado para o campo ' + this.id);
            }
        };
        this.mostraCalendario = function () {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "mostraCalendario()" não suportado para o campo ' + this.id);
            }
        };
        this.escondeCalendario = function () {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "escondeCalendario()" não suportado para o campo ' + this.id);
            }
        };
        this.mostraRefresh = function () {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "mostraRefresh()" não suportado para o campo ' + this.id);
            }
        };
        this.escondeRefresh = function () {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "escondeRefresh()" não suportado para o campo ' + this.id);
            }
        };
        this.mostraBotaoRepeticao = function (botao) {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "mostraBotaoRepeticao()" não suportado para o campo ' + this.id);
            }
        };
        this.escondeBotaoRepeticao = function (botao) {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "escondeBotaoRepeticao()" não suportado para o campo ' + this.id);
            }
        };
        this.adicionaCampoRepeticao = function (maxRepeticao) {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "adicionaCampoRepeticao()" não suportado para o campo ' + this.id);
            }
        };
        this.retiraCampoRepeticao = function (numRodadas) {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "retiraCampoRepeticao()" não suportado para o campo ' + this.id);
            }
        };
        this.adicionaItemLista = function (arrayOptions) {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "adicionaItemLista()" não suportado para o campo ' + this.id);
            }
        };
        this.removeItemLista = function (arrayOptions) {
            if (window.console && window.console.warn && atos.verbose) {
                console.warn('Método "removeItemLista()" não suportado para o campo ' + this.id);
            }
        };

    },
    _campoGrid: function (atosCampos) {
        var that = this;
        var metodosCampo = (function () {
            var classCampo = function () {
                atosCampos.campo.apply(this);
            };

            return new classCampo();
        })();

        var metodosLista = new this._lista();

        this.propCampo = gridDict[this.options.dataGridId].getArrayCampos(this.id)['id_campo'] ? gridDict[this.options.dataGridId].getArrayCampos(this.id) : null;
        this.data = gridDict[this.options.dataGridId].dataInterface.getLocalDataById(that.options.id_data);

        if (typeof this.propCampo === 'object' && this.propCampo) {
            var _function = function (funcao, arguments) {
                atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
                for (var i = 1; i <= this.options.numRepeticao; i++) {
                    var indice = (i < 10) ? ('0' + i) : (i);
                    var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                    contextoApply[funcao].apply(contextoApply, arguments);

                    this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
                };
            };

            this.addEvent = function () {
                var args = Array.prototype.slice.call(arguments);
                var clientFunction = args[2]; // it takes the function passed    
                var newFunction = function (e) {
                    //só pra campo...
                    var aId = e.target.id.split('_');
                    var idData = aId.pop();
                    var id = aId.join('_');
                    var contextoColuna = {};
                    contextoColuna.campo = atos.campo(id);
                    contextoColuna.campo.options.id_data = +idData;
                    contextoColuna.campo.data = gridDict[contextoColuna.campo.options.dataGridId].dataInterface.getLocalDataById(+idData);
                    contextoColuna.campo.linha().setContextData(+idData);
                    contextoColuna.linha = contextoColuna.campo.linha;
                    return (clientFunction)(e, contextoColuna);
                };
                args[2] = newFunction;
                var target = args.shift();
                args.splice(1, 0, {
                    campo: ''
                });
                args.splice(1, 0, that._retornaQueryElementoGrid(target, this.propCampo['id_campo']));
                var $bindTo = $('#\\' + this.options.dataGridId + '_3');
                $bindTo.on.apply($bindTo, args);
            };

            this.valor = function (valor) {
                if (typeof valor !== 'undefined' && valor != null) {
                    if (this.data[this.options.iCol].valorSelecionado !== undefined) {
                        this.data[this.options.iCol].valorSelecionado = valor;
                    } else {
                        this.data[this.options.iCol].valor = valor;
                    }
                    atos._propCampos[this.options.dataGridId + '_1'].dataInterface.setData(this.data[0], this.data, true);
                    metodosCampo.valor.apply(this, [valor]);
                } else {
                    return (this.data[this.options.iCol].valorSelecionado !== undefined) ? this.data[this.options.iCol].valorSelecionado : this.data[this.options.iCol].valor;
                }
            };

            this.template = function (obj) {
                if (this.options.visibilidade_campo == 'INVISIVEL' && window.console && window.console.warn && atos.verbose) {
                    console.warn('O campo ' + this.options.id_campo + ' está invisível.');
                } else {
                    atos._propCampos[this.options.dataGridId + '_1'].adicionarTemplate(obj, this.options.id);
                }
            };

            this.configurar = function (objConf) {
                if (typeof objConf !== 'undefined' && objConf !== null) {
                    if (objConf.width) {
                        atos._propCampos[this.options.dataGridId + '_1'].setNewWidth(objConf.width, this.options.id);
                    }
                } else {
                    if (window.console && window.console.warn && atos.verbose) {
                        console.warn('Por favor, passe como parâmetro um objeto de configuração. Ex.: { width: "35px" }');
                    }
                }
            };

            this.linha = (function () {
                var id_data;
                return function () {
                    return {
                        setContextData: function (data) {
                            id_data = data;
                        },
                        metodosCampo: metodosCampo,
                        campo: function (sNome) {
                            if (typeof sNome !== 'undefined' && sNome != null) {
                                this.dadosCampo = _.clone(atos._propCampos[that.options.dataGridId + '_1'].dataInterface.getLocalDataById(id_data));

                                if (this.dadosCampo != {}) {
                                    var contextoCampo = atos.campo(sNome);
                                    contextoCampo.options.id_data = this.dadosCampo[0];
                                    this.valor = function (valor) {
                                        if (typeof valor !== 'undefined' && valor != null) {
                                            if (this.dadosCampo[contextoCampo.options.iCol].valorSelecionado !== undefined) {
                                                this.dadosCampo[contextoCampo.options.iCol].valorSelecionado = valor;
                                            } else {
                                                this.dadosCampo[contextoCampo.options.iCol].valor = valor;
                                            }

                                            atos._propCampos[contextoCampo.options.dataGridId + '_1'].dataInterface.setData(this.dadosCampo[0], this.dadosCampo, true);
                                            this.metodosCampo.valor.apply(contextoCampo, [valor]);
                                        } else {
                                            return (this.dadosCampo[contextoCampo.options.iCol].valorSelecionado !== undefined) ? this.dadosCampo[contextoCampo.options.iCol].valorSelecionado : this.dadosCampo[contextoCampo.options.iCol].valor;
                                        }
                                    };
                                } else {
                                    return false;
                                }

                                return this;
                            } else {
                                if (window.console && window.console.warn && atos.verbose) {
                                    console.warn('Passe o nome do campo que você deseja manipular na linha. Ex.: "variavel.linha().campo("$CAMPO");"');
                                }
                                return false;
                            }
                        }
                    };
                }
            })();

            if (this.options.tipo_campo == "LISTA") {
                this.adicionaItemLista = function (arrayOptions) {
                    if (typeof this.data[0] === 'object') {
                        for (var i = 0; i < this.data.length; i++) {
                            this.data[i][this.options.iCol].valor = ';' + arrayOptions.join(';');
                        }
                    } else if (this.data.length > 0) {
                        this.data[this.options.iCol].valor = ';' + arrayOptions.join(';');
                    }

                    atos._propCampos[this.id].dataGridInst.setNewValue(';' + arrayOptions.join(';'), this.id);

                    atos._propCampos[this.options.dataGridId + '_1'].dataInterface.setData(this.data[0], this.data, true);
                    metodosLista.adicionaItemLista.apply(this, [arrayOptions]);
                }
            }
        }
    },

    _lupa: function () {
        var _function = function (funcao, arguments) {
            atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
            for (var i = 1; i <= this.options.numRepeticao; i++) {
                var indice = (i < 10) ? ('0' + i) : (i);
                var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                contextoApply.options.repInteira = false;
                contextoApply[funcao].apply(contextoApply, arguments);

                this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
            };
        };

        //Funcao que mostra o botao de "lupa" de um determinado campo
        this.mostraLupa = function () {
            var method = 'mostraLupa';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['botaoLupa']);
                $(this.elementos.botaoLupa).removeClass('desaparece');
            }
        };

        //Funcao que esconde o botao de "lupa" de um determinado campo
        this.escondeLupa = function () {
            var method = 'escondeLupa';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['botaoLupa']);
                $(this.elementos.botaoLupa).addClass('desaparece');
            }
        };
    },
    _data: function () {
        var _function = function (funcao, arguments) {
            atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
            for (var i = 1; i <= this.options.numRepeticao; i++) {
                var indice = (i < 10) ? ('0' + i) : (i);
                var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                contextoApply.options.repInteira = false;
                contextoApply[funcao].apply(contextoApply, arguments);

                this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
            };
        };

        //Funcao que mostra o botao de "calendario" de um determinado campo
        this.mostraCalendario = function () {
            var method = 'mostraCalendario';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['botaoData']);
                $(this.elementos.botaoData).removeClass('desaparece');
            }
        };

        //Funcao que esconde o botao de "calendario" de um determinado campo
        this.escondeCalendario = function () {
            var method = 'escondeCalendario';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['botaoData']);
                $(this.elementos.botaoData).first().addClass('desaparece');
            }
        };
    },
    _refresh: function () {
        var _function = function (funcao, arguments) {
            atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
            for (var i = 1; i <= this.options.numRepeticao; i++) {
                var indice = (i < 10) ? ('0' + i) : (i);
                var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                contextoApply.options.repInteira = false;
                contextoApply[funcao].apply(contextoApply, arguments);

                this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
            };
        };

        //Funcao que mostra o botao de "refresh" de um determinado campo
        this.mostraRefresh = function () {
            var method = 'mostraRefresh';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['botaoRefresh']);
                $(this.elementos.botaoRefresh).removeClass('desaparece');
            }
        };

        //Funcao que esconde o botao de "refresh" de um determinado campo
        this.escondeRefresh = function () {
            var method = 'escondeRefresh';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['botaoRefresh']);
                $(this.elementos.botaoRefresh).addClass('desaparece');
            }
        };
    },
    _repeticao: function () {
        var nomeRepeticao = this.options.idRepeticao;
        var numRepeticao = atos._propCampos[this.options.idRepeticao].numRepeticao;
        var numRepeticaoCorrente = parseInt(atos._propCampos[this.options.idRepeticao].numRepeticaoCorrente) + 1;
        var idRepeticaoCorrente = nomeRepeticao + '_' + ((((numRepeticaoCorrente) < 10) ? '0' : '') + (numRepeticaoCorrente));
        var IE = (navigator.appVersion.indexOf("MSIE") > -1);

        var _function = function (funcao, arguments) {
            atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
            for (var i = 1; i <= this.options.numRepeticao; i++) {
                var indice = (i < 10) ? ('0' + i) : (i);
                if (atos._propCampos[this.options.idRepeticao + indice + '_1']) {
                    atos._propCampos[this.options.idRepeticao + indice + '_1'].elementosRetornoRepeticao = true;
                }

                var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                contextoApply.options.repInteira = false;
                contextoApply[funcao].apply(contextoApply, arguments);

                this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
            };
        };

        //Funcao que mostra os botoes da repeticao de um determinado campo
        this.mostraBotaoRepeticao = function (botao) {
            if (typeof botao === "undefined") {
                botao = false;
            }

            if (atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira) {
                atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
                atos.campo(idRepeticaoCorrente).mostraBotaoRepeticao(botao);
            } else {
                this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), ['mostraBotaoRepeticao', arguments, this.indice]);

                if (botao) {
                    this._reseleciona(this.options, this.elem, ['campo', 'bloco', botao]);
                    $(this.elementos[botao]).css('display', '');
                } else {
                    this._reseleciona(this.options, this.elem, ['campo', 'bloco', 'botaoAdiciona', 'botaoRemove']);
                    $(this.elementos.botaoAdiciona).css('display', '');
                    $(this.elementos.botaoRemove).css('display', '');
                }
            }
        };

        //Funcao que esconde os botoes da repeticao de um determinado campo
        this.escondeBotaoRepeticao = function (botao) {
            var method = 'escondeBotaoRepeticao';

            if (typeof botao === "undefined") {
                botao = false;
            }

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);

                if (botao) {
                    this._reseleciona(this.options, this.elem, ['campo', 'bloco', botao]);
                    $(this.elementos[botao]).css('display', 'none');
                } else {
                    this._reseleciona(this.options, this.elem, ['campo', 'bloco', 'botaoAdiciona', 'botaoRemove']);
                    $(this.elementos.botaoAdiciona).css('display', 'none');
                    $(this.elementos.botaoRemove).css('display', 'none');
                }
            }
        };

        var adicionaCampoRepeticaoLegado = function adicionaCampoRepeticaoLegado(maxRepeticao) {
            if (numRepeticaoCorrente < parseInt(numRepeticao)) {
                atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
                if (typeof maxRepeticao === "undefined") {
                    maxRepeticao = 1;
                }
                this._reseleciona(this.options, this.elem, ['campo', 'bloco', botao]);
                maxRepeticao = maxRepeticao > parseInt(numRepeticao) ? parseInt(numRepeticao) : maxRepeticao;
                var nrcPlus = numRepeticaoCorrente + 1;
                var dadosRepeticao = atos._propCampos[idRepeticaoCorrente + '_1'];
                var elementosAppend = new Array();
                var reqPendentes;
                var repeticaoDoFuturo = numRepeticaoCorrente + maxRepeticao;

                if (numRepeticaoCorrente + maxRepeticao > parseInt(numRepeticao)) {
                    reqPendentes = parseInt(numRepeticao) - numRepeticaoCorrente;
                } else {
                    reqPendentes = maxRepeticao;
                }

                var conteudoParametro = this.options.isBloco ? 'AjaxBlocoRepeticaoController' : 'AjaxRepeticaoController';
                var ajax = new AjaxUtil();
                var indice = "";
                var display;

                var $selector = $(document.getElementById(this.options.idCampoOriginal.replace(/_01/g, ((((numRepeticaoCorrente) < 10) ? '_0' : '_') + (numRepeticaoCorrente)))));
                $selector.find('[id^=remover_]').css('display', 'none');
                $selector.find('[id^=add_]').css('display', 'none');

                for (var i = numRepeticaoCorrente; i < (maxRepeticao + numRepeticaoCorrente); i++) {
                    dadosRepeticao.idCampo = dadosRepeticao.idCampoOriginal.replace(/_01/g, ((((i + 1) < 10) ? '_0' : '_') + (i + 1)));

                    if (!document.getElementById(dadosRepeticao.idCampo)) {
                        dadosRepeticao.numRepeticaoCorrente = (i - 1);
                        indice = ((((i + 1) < 10) ? '_0' : '_') + (i + 1));
                        dadosRepeticao.numLinhaGrupo = i;
                        dadosRepeticao.idCampoAnterior = dadosRepeticao.idCampoOriginal.replace(/_01/g, ((((i) < 10) ? '_0' : '_') + (i)));;
                        dadosRepeticao.resposta = null;
                        dadosRepeticao.isBloco = this.options.isBloco;

                        var dadosSerializado = $('form').find('[id^="$"]').serialize();
                        dadosSerializado += "&idCampoOriginal=" + dadosRepeticao.idCampoOriginal +
                            "&numRepeticao=" + numRepeticao +
                            "&idCampoAnterior=" + dadosRepeticao.idCampoAnterior +
                            "&numRepeticaoCorrente=" + (i - 1) +
                            "&codCampo=" + dadosRepeticao.codCampo +
                            "&codFormulario=" + dadosRepeticao.codFormulario +
                            "&codVersao=" + dadosRepeticao.codVersao +
                            "&codProcesso=" + dadosRepeticao.codProcesso +
                            "&codCiclo=" + dadosRepeticao.codCiclo +
                            "&codEtapa=" + dadosRepeticao.codEtapa +
                            "&visibilidadeCampo=" + dadosRepeticao.visibilidadeCampo +
                            "&numLinhaGrupo=" + i +
                            "&codCampoBloco=" + dadosRepeticao.codCampoBloco +
                            "&codFormularioBloco=" + dadosRepeticao.codFormularioBloco +
                            "&codVersaoBloco=" + dadosRepeticao.codVersaoBloco +
                            "&codProcessoBloco=" + dadosRepeticao.codProcessoBloco +
                            "&codCicloBloco=" + dadosRepeticao.codCicloBloco +
                            "&codEtapaBloco=" + dadosRepeticao.codEtapaBloco +
                            "&indiceLinhaCampos=" + dadosRepeticao.indiceLinhaCampos +
                            "&isForcarQuebra=" + dadosRepeticao.isForcarQuebra +
                            "&isZebradoFraco=" + dadosRepeticao.isZebradoFraco;

                        ajax.init(conteudoParametro, dadosSerializado, 'POST', true);
                        ajax.chamarAjax(function (conteudoPagina) {
                            dadosRepeticao.resposta = $(conteudoPagina);

                            if (dadosRepeticao.resposta[0]) {
                                var idResposta = dadosRepeticao.resposta[0].id;
                                if (dadosRepeticao.isBloco) {
                                    var numRepeticaoAtual = parseInt(idResposta.substring(idResposta.length - 2, idResposta.length));
                                } else {
                                    var numRepeticaoAtual = idResposta;
                                    numRepeticaoAtual = numRepeticaoAtual.split('_');
                                    numRepeticaoAtual.pop();
                                    numRepeticaoAtual = parseInt(numRepeticaoAtual.pop());
                                }

                                elementosAppend[numRepeticaoAtual] = dadosRepeticao.resposta;
                                reqPendentes--;

                                if (reqPendentes < 1) {
                                    for (var j = 2; j < (maxRepeticao + numRepeticaoCorrente + 1); j++) {
                                        indice = ((((j) < 10) ? '_0' : '_') + (j));

                                        if (elementosAppend[j]) {
                                            $("#conteudo_repeticao_" + formataIdCampos(dadosRepeticao.idCampoOriginal)).append(elementosAppend[j]);
                                            $("#conteudo_repeticao_" + formataIdCampos(dadosRepeticao.idCampoOriginal)).trigger("retornoRepeticao" + (j - 1), [dadosRepeticao]);

                                            var containerBtn = dadosRepeticao.idCampoOriginal.replace(/_01/g, indice);
                                            var triggerRep = ((((j) < 10) ? '_0' : '_') + (j));

                                            $('#\\' + dadosRepeticao.idRepeticao + triggerRep).trigger('retornoRepeticao_' + dadosRepeticao.idRepeticao + triggerRep, [triggerRep]);

                                            function getSelector(index) {
                                                if (dadosRepeticao.isBloco) {
                                                    return $('#campos_repeticao_' + formataIdCampos(containerBtn));
                                                } else {
                                                    return $(document.getElementById(atos._propCampos[dadosRepeticao.idRepeticao + index + '_1'].idButtonRepeticao));
                                                }
                                            }

                                            for (var x = 1; x < j; x++) {
                                                var index = ((((x) < 10) ? '_0' : '_') + (x));

                                                if (atos._propCampos[dadosRepeticao.idRepeticao + index + '_1']) {
                                                    getSelector(index).find('[id^=add_]').css('display', 'none');
                                                    getSelector(index).find('[id^=remover_]').css('display', 'none');
                                                }
                                            }

                                            var $selector = $(document.getElementById(elementosAppend[j][0].id));

                                            if (j == parseInt(numRepeticao)) {
                                                $selector.find('[id^=add_]').css('display', 'none');
                                                $selector.find('[id^=remover_]').css('display', ''); 
                                            } else if (j == repeticaoDoFuturo) {
                                                $selector.find('[id^=add_]').css('display', '');
                                                $selector.find('[id^=remover_]').css('display', '');
                                            }

                                            if (dadosRepeticao.isBloco) {
                                                $('#add_' + formataIdCampos(containerBtn)).trigger('retornoAdicionarRepeticao', [j]);
                                            } else {
                                                $('#add_' + formataIdCampos(dadosRepeticao.idRepeticao + indice)).trigger('retornoAdicionarRepeticao', [j]);
                                            }
                                        }
                                    }
                                }

                                redefineWidth();
                            }
                        });
                    } else {
                        reqPendentes--;
                    }
                }
            }
        }

        var adicionaBlocoRepeticao = function adicionaBlocoRepeticao(obj) {

            if (obj.numRepeticaoCorrente < parseInt(obj.numRepeticao)) {

                var dados = obj,
                    dadosSerializado = $('form').find('[id^="$"]').serialize(),
                    dadosSerializadosTemplate = _.template("&numRepeticaoCorrente=<&=numRepeticaoCorrente-1&>" +
                        "&numRepeticao=<&=numRepeticao&>&codCampoBloco=<&=codCampoBloco&>" +
                        "&codFormularioBloco=<&=codFormularioBloco&>" +
                        "&codVersaoBloco=<&=codVersaoBloco&>" +
                        "&codProcessoBloco=<&=codProcessoBloco&>" +
                        "&idCampoOriginal=<&=idCampoOriginal&>" +
                        "&codCicloBloco=<&=codCicloBloco&>" +
                        "&codEtapaBloco=<&=codEtapaBloco&>" +
                        "&codFormularioBloco=<&=codFormularioBloco&>" +
                        "&numLinhaGrupo=<&=numLinhaGrupo&>" +
                        "&idCampoAnterior=<&=idCampoAnterior&>" +
                        "&visibilidadeCampo=<&=visibilidadeCampo&>" +
                        "&indiceLinhaCampos=<&=indiceLinhaCampos&>" +
                        "&isForcarQuebra=<&=isForcarQuebra&>" +
                        "&isZebradoFraco=<&=isZebradoFraco&>" +
                        "&qtdeRepeticoes=<&=qtdeRepeticoes&>");

                dadosSerializado += dadosSerializadosTemplate(obj);

                var urlAjax = "AjaxBlocoRepeticaoController";
                var ajax = new AjaxUtil();

                ajax.init(urlAjax, dadosSerializado, 'POST', true);
                ajax.chamarAjax(
                    function (conteudoPagina) {
                        var idCampo = obj.idCampoAnterior,
                            idCampoOriginal = obj.idCampoOriginal;
                        if (conteudoPagina != "") {
                            for (var i = 0; i < conteudoPagina.length; i++) {
                                document.getElementById("campos_repeticao_" + idCampo).style.display = 'none';
                                document.getElementById("campos_repeticao_" + idCampo).style.borderRight = '5px';
                                var $DOM = $(conteudoPagina[i]);
                                $("#conteudo_repeticao_" + formataIdCampos(idCampoOriginal)).append($DOM);
                                $("#conteudo_repeticao_" + formataIdCampos(idCampoOriginal)).trigger("retornoRepeticao" + numRepeticaoCorrente, [dados]);
                                $DOM.find('[id^=add_]').trigger('retornoAdicionarRepeticao');
                                idCampo = $DOM.find('[id^=campos_repeticao_id_bloco_]').attr("id").replace('campos_repeticao_', '');
                                numRepeticaoCorrente += 1;
                            }
                            redefineWidth();
                            arrumaLabelEmBranco("#conteudo_repeticao_" + formataIdCampos(idCampoOriginal));
                        } else {
                            atosMensagensGeral.criaModalAvisoJS({
                                id: 'AvisoMaisDeUmProcessoSelecionado',
                                titulo: '',
                                mensagem: atosI18n.messages['msg.falha_ao_carregar_bloco_repeticao'],
                                botoes: [{
                                    rotulo: atosI18n.messages['bot.ok'],
                                    funcao: function () {
                                        fechaModal('#AvisoMaisDeUmProcessoSelecionado');
                                    }
                                }],
                                classeAviso: 'aviso_modal',
                                classeImg: 'icoFalha'
                            });
                            document.getElementById("campos_repeticao_" + idCampo).style.display = '';
                            document.getElementById("campos_repeticao_" + idCampo).style.borderRight = '';
                        }
                    }
                );
            }
        }

        //Funcao para adicionar uma nova repeticao na tela
        this.adicionaCampoRepeticao = function (maxRepeticao) {
        	maxRepeticao = typeof maxRepeticao === "undefined" ? 1 : maxRepeticao;
        	if(maxRepeticao > 0){
        		if (this.options.isBloco) {
                    var dadosRepeticao = atos._propCampos[idRepeticaoCorrente + '_1'];
                    var obj = {
                        numRepeticaoCorrente: numRepeticaoCorrente,
                        numRepeticao: dadosRepeticao.numRepeticao,
                        codCampoBloco: dadosRepeticao.codCampoBloco,
                        codFormularioBloco: dadosRepeticao.codFormularioBloco,
                        codVersaoBloco: dadosRepeticao.codVersaoBloco,
                        codProcessoBloco: dadosRepeticao.codProcessoBloco,
                        idCampoOriginal: dadosRepeticao.idCampoOriginal,
                        codCicloBloco: dadosRepeticao.codCicloBloco,
                        codEtapaBloco: dadosRepeticao.codEtapaBloco,
                        numLinhaGrupo: dadosRepeticao.numLinhaGrupo,
                        idCampoAnterior: dadosRepeticao.idCampo,
                        visibilidadeCampo: dadosRepeticao.visibilidadeCampo,
                        indiceLinhaCampos: dadosRepeticao.indiceLinhaCampos,
                        isForcarQuebra: dadosRepeticao.isForcarQuebra,
                        isZebradoFraco: dadosRepeticao.isZebradoFraco,
                        qtdeRepeticoes: maxRepeticao
                    }
                    return adicionaBlocoRepeticao(obj);
                } else {
                    return adicionaCampoRepeticaoLegado.apply(this, [maxRepeticao]);
                }
        	}            
        };

        //Funcao que retira a ultima repeticao na tela
        this.retiraCampoRepeticao = function (numRodadas) {
            if (numRepeticaoCorrente >= 1) {
                atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;

                if (typeof numRodadas === "undefined") {
                    numRodadas = 1;
                }

                numRodadas = numRepeticaoCorrente - numRodadas;
                // Caso seja selecionado um numero de rodadas maior do que a quantidade total de repetições ele é zerado
                // para que o for não rode mais vezes do que o necessário
                numRodadas = (numRodadas >= 0) ? numRodadas : 0;

                var dadosRepeticao = atos._propCampos[idRepeticaoCorrente + '_1'];

                for (var i = numRepeticaoCorrente; i > numRodadas; i--) {
                    if (i > 1) {
                        dadosRepeticao.idCampo = dadosRepeticao.idCampoOriginal.replace(/_01/g, ((((i) < 10) ? '_0' : '_') + (i)));
                        dadosRepeticao.numLinhaGrupo = i;
                        var replaceIdCampoAnterior = (i > 1) ? ((((i - 1) < 10) ? '_0' : '_') + (i - 1)) : ((((i) < 10) ? '_0' : '_') + (i));
                        dadosRepeticao.idCampoAnterior = dadosRepeticao.idCampoOriginal.replace(/_01/g, replaceIdCampoAnterior);
                        dadosRepeticao.idConteudoCampo = dadosRepeticao.idCampo + '_1';
                        dadosRepeticao.idButtonRepeticao = 'campos_repeticao_' + dadosRepeticao.idCampo;
                        dadosRepeticao.conteudoRepeticao = 'conteudo_repeticao_' + dadosRepeticao.idCampo;
                        dadosRepeticao.campoQuebra = 'quebra_' + dadosRepeticao.idCampo;

                        if (this.options.isBloco) {
                            removeCampoRepeticaoGrupo(
                                dadosRepeticao.idCampo,
                                dadosRepeticao.idCampoOriginal,
                                dadosRepeticao.idCampoAnterior,
                                atos._propCampos[nomeRepeticao].numRepeticaoCorrente
                            );
                        } else {
                            removeCampoRepeticao(
                                dadosRepeticao.idConteudoCampo,
                                dadosRepeticao.idButtonRepeticao,
                                dadosRepeticao.idCampoOriginal,
                                dadosRepeticao.numRepeticao,
                                dadosRepeticao.conteudoRepeticao,
                                atos._propCampos[nomeRepeticao].numRepeticaoCorrente,
                                dadosRepeticao.idCampoAnterior,
                                dadosRepeticao.campoQuebra
                            );
                        }
                    }

                    // Caso haja apenas uma campo ou bloco de repetição a rotina limpa o(s) campo(s)
                    else {
                        var $selector = $(document.getElementById(dadosRepeticao.idCampoOriginal))

                        if (this.options.isBloco) {
                            $selector.find("input:visible,textarea").each(function () {
                                this.value = "";
                            });
                            $selector.find("select").each(function () {
                                this[0].selectedIndex = 0;
                            });
                        } else {
                            if ($("#" + $selector + "Template").val() != undefined &&
                                $("#" + $selector + "Template").val() != '') {
                                alertaDesvincularDocumento($selector);
                            } else if ($selector[0].tagName == "INPUT" || $selector[0].tagName == "TEXTAREA") {
                                $selector.val("");
                            } else if ($selector[0].tagName == "SELECT") {
                                $selector[0].selectedIndex = 0;
                            }
                        }
                    }
                }
            }
        };

        //Funcao que esconde um determinado elemento da repeticao
        this.escondeElementoRepeticao = function () {
            var method = 'escondeElementoRepeticao';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);

                $(this.elem).find('#conteudo_\\' + this.id)[0].style.display = 'none';
            }
        };

        //Funcao que mostrar um determinado elemento da repeticao
        this.mostraElementoRepeticao = function () {
            var method = 'mostraElementoRepeticao';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);

                $(this.elem).find('#conteudo_\\' + this.id)[0].style.display = '';
            }
        };

        /**
         * deprecated
         */
        this.botaoMais = function () {
            if (window.console && window.console.warn) {
                console.warn('O método "botaoMais()" está depreciado, use: atos.campo("$id").addEvent(atos.elemBotaoAdiciona, "evento", funcao(){});');
            }
            return new Botao(this.options.idRepeticao, this.indice, 'add');
        };
        /**
         * deprecated
         */
        this.botaoMenos = function () {
            if (window.console && window.console.warn) {
                console.warn('O método "botaoMenos()" está depreciado, use: atos.campo("$id").addEvent(atos.elemBotaoRemove, "evento", funcao(){});');
            }
            return new Botao(this.options.idRepeticao, this.indice, 'remover');
        };
    },

    _lista: function () {
        var _function = function (funcao, arguments) {
            atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
            for (var i = 1; i <= this.options.numRepeticao; i++) {
                var indice = (i < 10) ? ('0' + i) : (i);
                var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                contextoApply.options.repInteira = false;
                contextoApply[funcao].apply(contextoApply, arguments);

                this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
            };
        };

        this.adicionaItemLista = function (arrayOptions) {
            var method = 'adicionaItemLista';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                var valor = '';
                var label = '';

                if (typeof arrayOptions === 'string') {
                    arrayOptionsString = arrayOptions;
                    arrayOptions = [];
                    arrayOptions.push(arrayOptionsString);
                }

                for (var i = 0; i < arrayOptions.length; i++) {
                    if (typeof arrayOptions[i] === 'object') {
                        valor = arrayOptions[i].valor;
                        label = arrayOptions[i].label;
                    } else {
                        label = valor = arrayOptions[i];
                    }
                    //TODO: fazer append s� no final...
                    this._reseleciona(this.options, this.elem, ['campo']);
                    $(this.elementos.campo).each(function (i, elem) {
                        var $elem = $(elem);
                        var selectOption = false;

                        if (typeof $elem !== 'undefined' && $elem.val() !== null && $elem.val().indexOf(valor) > -1) {
                            selectOption = $elem.find('option[value="' + valor + '"]').prop('selected');
                        }

                        $elem.find('option[value="' + valor + '"]').remove();
                        $elem.append("<option value='" + valor + "'>" + label + "</option>");

                        if (selectOption) {
                            $elem.find('option[value="' + valor + '"]').attr('selected', true);
                        }
                    });
                }
            }
        };

        this.removeItemLista = function (arrayOptions) {
            var method = 'removeItemLista';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['campo']);
                var options = $(this.elementos.campo).find('option');

                if (typeof arrayOptions === "undefined") {
                    options.remove();
                } else {
                    for (var i = 0; i < arrayOptions.length; i++) {
                        if (options[arrayOptions[i]]) {
                            options.eq(arrayOptions[i]).remove();
                        }
                    }
                }
            }
        };

        this.bloqueiaLista = function () {
            var method = 'bloqueiaLista';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['campo']);
                $(this.elementos.campo).attr('disabled', 'disabled');
            }
        };

        this.desbloqueiaLista = function () {
            var method = 'desbloqueiaLista';

            if (this.options.repInteira) {
                _function.apply(this, [method, arguments]);
            } else {
                if (this.options.isRepeticao) {
                    this.bindToElements.apply(atos.campo(this.options.idRepeticao + '_' + this.indice), [method, arguments, this.indice]);
                }

                this._reseleciona(this.options, this.elem, ['campo']);
                $(this.elementos.campo).removeAttr('disabled');
            }
        };
    },
    _grid: function () {
        var _function = function (funcao, arguments) {
                atos._propCampos[this.options.idRepeticao + '_01_1'].repInteira = false;
                for (var i = 1; i <= this.options.numRepeticao; i++) {
                    var indice = (i < 10) ? ('0' + i) : (i);
                    var contextoApply = atos.campo(this.options.idRepeticao + '_' + indice);
                    contextoApply[funcao].apply(contextoApply, arguments);

                    this.bindToElements.apply(contextoApply, [funcao, arguments, indice]);
                };
            },
            grid = this;

        this.on = function (eventName, callback) {
            atos._propCampos[this.options.id + '_1'].on(eventName, callback);
        };

        this.buscar = function (objParam, callback) {
            var extraData = {
                uniqueGrid: gridDict[this.id].getUniqueGrid(),
                pesquisar: []
            };

            if (typeof objParam === 'object' && objParam != null) {
                if (objParam.length > 0) {
                    extraData.pesquisar = objParam;
                } else {
                    extraData.pesquisar.push(objParam);
                }

                $.ajax("grid?action=pesquisar", {
                    "data": {
                        "data": JSON.stringify(extraData)
                    },
                    "dataType": "JSON",
                    "type": "POST"
                }).error(function () {
                    if (window.console && window.console.warn && atos.verbose) {
                        console.warn('Houve um erro na requisição, verifique o objeto passado como parâmetro ou o status do servidor.');
                    }
                }).done(function (dt) {
                    if (typeof dt !== 'undefined' && dt !== null) {
                        if (typeof callback === 'function' && callback != null) {
                            callback({
                                linhas: (function () {
                                    return function () {
                                        return {
                                            tamanho: dt['aaData'].length
                                        };
                                    }
                                })()
                            });
                        } else {
                            if (window.console && window.console.warn && atos.verbose) {
                                console.warn('Para realizar uma operação ao final da pesquisa, passe como segundo parâmetro uma function de callback. Ex.: "function(ret) { /*ret.linhas().tamanho*/ }".');
                            }
                        }
                    }
                });
            } else {
                if (window.console && window.console.warn && atos.verbose) {
                    console.warn('O primeiro parâmetro deve ser um Objeto único ou um Array com objetos. Ex.: "[{ "campo": "CAMPO1", "valor": "Valor CAMPO1"}, { "campo": "CAMPO2", "valor": ""}]".');
                }
            }
        };

        this.filtrar = function (sFiltro) {
            if (typeof sFiltro === 'string' && sFiltro != null) {
                var objParam = {};
                objParam[gridDict[this.id].getUniqueGrid()] = sFiltro;

                this.objFiltrarGrid.set(objParam);
            } else {
                if (window.console && window.console.warn && atos.verbose) {
                    console.warn('Para que o filtro aconteça corretamente, um parâmetro String deve ser passado. Ex.: "campo=valor".\nO parâmetro deve ser exatamente como o WHERE de uma instrução SQL. Ex.: "(CAMPO1_GRID1 LIKE "G1-1" AND CAMPO2_GRID1 = 6051.00) OR (CAMPO1_GRID1 LIKE "G1-5" AND CAMPO2_GRID1 = 4661.00)"');
                }
            }
        };

        this.addEvent = function () {
            var args = Array.prototype.slice.call(arguments);
            var clientFunction = args[2]; // it takes the function passed    
            var newFunction = function (e) {
                //só pra campo...
                var aId = e.target.id.split('_');
                aId.pop();
                var id = aId.join('_');

                e.data.campo = atos.campo(id);
                return (clientFunction)(e);
            };
            args[2] = newFunction;
            var target = args.shift();
            args.splice(1, 0, {
                campo: ''
            });
            args.splice(1, 0, this._retornaQueryElementoGrid(target));
            var $bindTo = $('#\\' + this.id + '_3');
            $bindTo.on.apply($bindTo, args);
        }

        this.coluna = (function () {
            return function (sNome) {
                var coluna = atos.campo(sNome);

                coluna.esconder = function esconder() {
                    grid.esconderColuna(sNome);
                };
                coluna.mostrar = function mostrar() {
                    grid.mostrarColuna(sNome);
                };

                return coluna;
            }
        })();

        this.esconderColuna = function esconderColuna(col) {
            if (_.isArray(col)) {
                _.forEach(col, function (col) {
                    grid.options.hideColumn(col);
                });
            } else {
                grid.options.hideColumn(col);
            }
        };

        this.mostrarColuna = function mostrarColuna(col) {
            if (_.isArray(col)) {
                _.forEach(col, function (col) {
                    grid.options.showColumn(col);
                });
            } else {
                grid.options.showColumn(col);
            }
        };

        this.esconderBotao = function (botao) {
            if (typeof botao !== 'undefined' && botao != null) {
                this._reseleciona(this.options, this.elem, [botao]);
                $(this.elementos[botao]).addClass('desaparece');
            } else {
                this._reseleciona(this.options, this.elem, [atos.elemBotaoAdiciona, atos.elemBotaoRemove]);
                $(this.elementos[atos.elemBotaoAdiciona]).addClass('desaparece');
                $(this.elementos[atos.elemBotaoRemove]).addClass('desaparece');
            }
        };

        this.mostrarBotao = function (botao) {
            if (typeof botao !== 'undefined' && botao != null) {
                this._reseleciona(this.options, this.elem, [botao]);
                $(this.elementos[botao]).removeClass('desaparece');
            } else {
                this._reseleciona(this.options, this.elem, [atos.elemBotaoAdiciona, atos.elemBotaoRemove]);
                $(this.elementos[atos.elemBotaoAdiciona]).removeClass('desaparece');
                $(this.elementos[atos.elemBotaoRemove]).removeClass('desaparece');
            }
        };
    }
};

// Object.create support test, and fallback for browsers without it
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}
//camada que ser� apresentada aos consultores
var atos = {
    campo: function (id) {

        var _verificarRepeticao = function (id, isCampoExistente) {
            var isCampoGrid = false;
            var dadosCampoGrid = {};

            if (typeof gridDict !== 'undefined' && gridDict !== null) {
                for (key in gridDict) {
                    if (gridDict[key].getArrayCampos(id)['id_campo']) {
                        isCampoGrid = true;
                        dadosCampoGrid = gridDict[key].getArrayCampos(id);
                        dadosCampoGrid['dataGridId'] = key;
                    }
                }
            }

            if (isCampoGrid) {
                dadosCampoGrid['isCampoGrid'] = isCampoGrid;
                this._propCampos[id + '_1'] = $.extend({}, this._propCampos[id + '_1'], dadosCampoGrid);
            } else {
                var arrayElem = id.split('_');
                var indice = arrayElem.pop();
                var idRepeticao = arrayElem.join('_');
                if (parseInt(indice) && this._propCampos[idRepeticao + '_01_1']) {
                    if (this._propCampos[idRepeticao + '_01_1'].tipo == 'leitura' && this._propCampos[idRepeticao + '_01_1'].idRepeticao == undefined) {
                        var numRepeticao = $("[id^='" + idRepeticao + "']").find("[id$='_1']").length;
                        this._propCampos[idRepeticao + '_01_1'] = $.extend({}, this._propCampos[arrayElem.join('_') + '_01_1'], this._propCampos[id + '_1'], {
                            indice: '01',
                            idRepeticao: idRepeticao,
                            isRepeticao: false,
                            numRepeticao: numRepeticao
                        });
                    }
                } else {
                    if (!isCampoExistente && window.console && window.console.warn && atos.verbose) {
                        console.warn('O campo ' + id + ' não existe ou está oculto.');
                    }
                }


                if (!isCampoExistente) {
                    if (parseInt(indice)) {
                        this._propCampos[id + '_1'] = $.extend({}, this._propCampos[idRepeticao + '_01_1'], this._propCampos[id + '_1'], {
                            'indice': indice
                        });
                    } else {
                        return false;
                    }
                }
            }

            return this._propCampos[id + '_1'];
        };

        var elem = document.getElementById(id + '_1');
        var options = {};
        options = $.extend({}, options, this._propCampos[id + '_1']);

        options.isCampoExistente = elem ? true : false;
        options.id = id;
        elem = elem || id + '_1';

        options = $.extend({}, options, _verificarRepeticao.apply(this, [id, options.isCampoExistente]));

        if (options.isCampoGrid) {
            elem = [].slice.call($('input[id^="\\' + options['id_campo'] + '"]:visible, select[id^="\\' + options['id_campo'] + '"]:visible'));
            options.isCampoExistente = true;
        }

        if (this[id + '_1']) {
            this[id + '_1']._refreshInstance(options, elem);
        } else {
            this[id + '_1'] = Object.create(AtosCampos).init(options, elem);
        }

        return this[id + '_1'];
    },

    repeticao: function (id, indice) {
        var repInteira = (indice) ? false : true;
        indice = indice || '01';
        if (typeof indice !== "string") {
            indice = ((indice) < 10 ? '0' : '') + indice;
        }
        this._propCampos[id + '_' + indice + '_1'] = $.extend({}, this._propCampos[id + '_' + indice + '_1'], {
            repInteira: repInteira
        });
        return this.campo(id + '_' + indice);
    },

    grid: function (id) {
        return this.campo(id);
    },

    buscaCampos: function (tipo, strCampo) {
        var aCampos = Object.keys(this._propCampos);
        var arrayRetorno = [];

        var _verificarRepeticao = function (id) {
            var arrayElem = id.split('_');
            var indice = arrayElem.pop();
            var nomeRep = arrayElem.join('_');
            if (indice === "01") {
                return [this._propCampos[nomeRep + '_01_1'], nomeRep];
            } else {
                return false;
            }
        };

        /** Elimina as repeticoes **/
        aCampos = aCampos.filter(function (campo) {
            return campo.endsWith('_1');
        });
        var propCampos = [];

        /** Remove os '_1' e adiciona os campos inexistentes**/
        for (var i = aCampos.length - 1; i >= 0; i--) {
            arrayRetorno[i] = aCampos[i].slice(0, -2);
            propCampos = _verificarRepeticao.apply(this, [arrayRetorno[i]]);
            if (propCampos[0]) {
                for (var j = 1; j <= propCampos[0].numRepeticao; j++) {
                    var campoIne = propCampos[1] + '_' + (((j) < 10) ? '0' : '') + (j);
                    if (!this._propCampos[campoIne + '_1']) {
                        arrayRetorno.push(campoIne);
                    }
                }
            }
        };

        switch (tipo) {
        case '*':
            arrayRetorno = arrayRetorno.filter(function (campo) {
                return campo.contains(strCampo);
            });
            break;
        case '^':
            arrayRetorno = arrayRetorno.filter(function (campo) {
                return campo.startsWith(strCampo);
            });
            break;
        case '$':
            arrayRetorno = arrayRetorno.filter(function (campo) {
                return campo.endsWith(strCampo);
            });
            break;
        }
        return arrayRetorno;
    },

    addEvent: function () {
        var args = Array.prototype.slice.call(arguments);
        var target = args.shift();
        this._reseleciona([target]);
        var $el = $(this.elementos[target]);
        $el.on.apply($el, args);
    },

    ajustarTamanhos: function () {
        redefineWidth();
    },

    salvarEtapa: function () {
        this._reseleciona(['form']);
        var url = "salva_etapa?action=salva";
        var _DATA = $(this.elementos.form).serialize();
        var ajax = new AjaxUtil();
        ajax.init(url, _DATA, 'POST', true);
        ajax.chamarAjax(function (conteudoPagina) {});
    },

    adicionarMensagem: function (obj) {
        document.body.scrollTop = 0;
        var retorno = atosMensagensGeral.aviso('containerValidacaoCarregamento', obj.mensagem, obj.tipo, obj.ico, obj.fechavel);
        return retorno.guid;
    },

    elemMensagem: function (guid) {
        return guid;
    },

    removerMensagem: function (guid) {
        atosMensagensGeral.removeLiCriada(guid);
        delete this.elementos[guid];
    },

    configurarBotao: function (elem, obj) {
        this._reseleciona([elem]);
        if (atos.elementos[elem]) {
            if (obj.display) {
                atos.elementos[elem].style.display = obj.display;
            }

            if (obj.label) {
                atos.elementos[elem].innerHTML = obj.label;
            }
        }
    },

    adicionarMensagemModal: function (obj) {

        obj.modalInterna = document.getElementById('aprovacaoModal').value == 'true' ? true : false;

        atosMensagensGeral.criaModalAvisoJS({
            titulo: obj.titulo,
            mensagem: obj.mensagem,
            classeAviso: obj.tipo,
            classeImg: obj.ico,
            botoes: obj.botoes,
            modalInterna: obj.modalInterna
        });


    },

    _eventos: _.extend({}, Backbone.Events),
    on: function () {
        this._eventos.on.apply(this, arguments);
    },

    trigger: function () {
        this._eventos.trigger.apply(this, arguments);
    },

    _reseleciona: function (arrayElementos) {
        arrayElementos = arrayElementos || ['botaoAprovar', 'botaoRejeitar', 'botaoFinalizar', 'botaoCancelar', 'form'];

        for (var i = 0; i < arrayElementos.length; i++) {
            this.elementos[arrayElementos[i]] = this._retornaElemento(arrayElementos[i]);
        }
    },

    _retornaElemento: function (elemento) {
        switch (elemento) {
        case 'botaoAprovar':
            return document.getElementById('btnAprovar');
            break;
        case 'botaoRejeitar':
            return document.getElementById('btnRejeitar');
            break;
        case 'botaoFinalizar':
            return document.getElementById('btnFinalizar');
            break;
        case 'botaoCancelar':
            return document.getElementById('btnCancelar');
            break;
        case 'form':
            return $('.listaFinal').find('.botao').closest('form')[0];
            break;
        default:
            return document.getElementById(elemento);
            break;
        }
    },

    _propCampos: {},
    elementos: {},
    elemLabel: 'label',
    elemCampo: 'campo',
    elemCampoContainer: 'container',
    elemLeituraMostrado: 'campoLeituraMostrado',
    elemUploadMostrado: 'campoUploadMostrado',
    elemForm: 'form',
    elemBotaoAdiciona: 'botaoAdiciona',
    elemBotaoRemove: 'botaoRemove',
    elemBotoesRepeticao: 'botoesRepeticao',
    elemBotaoLupa: 'botaoLupa',
    elemBotaoData: 'botaoData',
    elemBotaoRefresh: 'botaoRefresh',
    elemObrigatoriedade: 'obrigatoriedade',
    elemBotaoAprova: 'botaoAprovar',
    elemBotaoRejeita: 'botaoRejeitar',
    elemBotaoFinaliza: 'botaoFinalizar',
    elemBotaoCancela: 'botaoCancelar',
    versao: '1.01',
    verbose: true,
    countReadys: 0,
    listaController: {}
};

/**
 * Deprecated
 */
function Botao(idCampo, numeroRepeticao, acao) {
    this.idCampo = idCampo;
    this.numeroRepeticao = numeroRepeticao;

    //Funcao que adiciona evento para campos em tela
    this.addEvent = function (evento, funcao) {
        var botao = $("#\\" + this.idCampo + "_01_1").find('[id^=' + acao + '_]');

        var $formulario = botao.closest('form');

        var idBotao = botao[0].id.replace(/_01/g, '_' + numeroRepeticao);

        $formulario.on(evento, "#" + idBotao.replace(/\$/g, "\\$"), funcao);

    };
}

atos.on('_apiReady', function () {
    var countGrids = 0; //Contador para saber quantas Grids existem em tela;
    var documentReady = 1; //Contador para saber se o document.ready ja foi carregado;
    var countListas = Object.keys(atos.listaController).length; //Contador para saber quantas as listas ja foram carregadas;
    var countListasReady = 0;
    var listasReady = false;

    if (typeof gridDict === 'object' && gridDict !== null) {
        countGrids = Object.keys(gridDict).length;
    }

    _.forEach(atos.listaController, function (value) {
        if (value) {
            countListasReady++; //Incrementa para saber quantas listas estão prontas;
        }
    });

    atos.countReadys++; //Incrementa para saber quantos _apiReady foram disparados;

    listasReady = (countListasReady == countListas);

    if ((countGrids + documentReady + countListasReady) == atos.countReadys && listasReady) {
        atos.trigger('etapaReady');
    }
});
module.exports = atos;