const mongoose = require('mongoose')

const ocorrenciaSchema = new mongoose.Schema({
  uuid: String,
  siglaRCAP: String,
  protocolo: String,
  dataRegistro: Date,
  fusoHorarioDataRegistro: String,
  nomeSolicitante: String,
  telefoneSolicitante: String,
  classificacao: String,
  nomeAtendente: String,
  narrativa: String,
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

module.exports = ocorrenciaSchema