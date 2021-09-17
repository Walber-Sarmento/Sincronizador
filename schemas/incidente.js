const mongoose = require('mongoose')

const incidenteSchema = new mongoose.Schema({
    uuid: { type: String, index: true },
    uuidIncidentePrincipal: String,
    siglaAgencia: String,
    listaNaturezas: [String],
    listaVeiculos: [
        {
            placa: String,
            marca: String,
            modelo: String,
            cor: String,
            restricao: String,
            tipoVeiculo: String,
            evadiu: String,
            condicaoDeslocamento: String,
            caracteristicas: String,
            rouboFurto: String,
            envolvimento: String
        },
    ],
    listaEnvolvidos: [
            {
            nome: String,
            sexo: String,
            racaCor: String,
            dataNascimento: String,
            nomeMae: String,
            envolvimento: String,
            tipoDocumento: String,
            numeroDocumento: String,
            numeroMandado: String,
            siglaOrgao: String
        },
    ],
    listaDrogas: [ String ],
    listaComplementares: [ String ],
    listaVinculados: [ String ],
    listaArmasObjetos: [ String ],
    latitude: Number,
    longitude: Number,
    logradouro: String,
    numero: String,
    complemento: String,
    pontoReferencia: String,
    bairro: String,
    codIBGEMunicipio: String,
    tipoVia: String,
    tipoLocal: String,
    rodovia: String,
    km: String,
    sentidoVia: String,
    pistaRodovia: String,
    trecho: String,
    status: String,
    siglaRA: String,
    prioridade: String,
    cpfOperador: String,
    nomeOperador: String,
    abandonado: Boolean,
    siglaRCAP: String,
    protocolo: String,
    dataRegistro: Date,
    fusoHorarioDataRegistro: String,
    dataClassificacaoAlertaGeral: Date,
    dataOcorrencia: Date,
    horaOcorrencia: String,//hora formato hh:mm:ss
    nomeSolicitante: String,
    telefoneSolicitante: String,
    classificacao: String,
    nomeAtendente: String,
    narrativa: String,
    atividades: String,
    dataFinalizacao: Date,
    cpfUsuarioFinalizacao: String,
    nomeUsuarioFinalizacao: String,
    motivoFinalizacao: String,
    listEnvolvids: [
        {
            nome: String,
            sexo: String,
            racaCor: String,
            idade: String,
            envolvimento: String,
            dataNascimento: String,
            nomeMae: String,
            tipoDocumento: String,
            numeroDocumento: String,
            numeroMandado: String,
            siglaOrgao: String
        },
    ],
    listaDespachos: [
        {
            dataHoraDespacho: Date,
            fusoHorarioDespacho: String,
            nomeOperador: String,
            cpfOperador: String,
            status: {
                nome: String,
                dataHoraStatus: Date,
                fusoHorarioStatus: String,
                localIntermediario: String
            },
            equipe: {
                telefone: String,
                nome: String, listaEquipamentos: [
                    {
                        prefixo: String,
                        placa: String,
                        tipo: String,
                        marca: String,
                        modelo: String,
                        permiteRegistrarKm: Boolean,
                        km: String
                    }
                ],
                listaPessoas: [
                    {
                        cpf: String,
                        nome: String,
                        funcao: String,
                        matricula: String
                    }
                ]
            }
        }
    ],
    listaHistoricos: [
        {
            dataHora: Date,
            cpfResponsavel: String,
            nomeResponsavel: String,
            idEvento: String,
            descEvento: String
        }
    ]
});

module.exports = incidenteSchema
