class Database {

    constructor() {

        const config = require('../config.json')
        this.fusos_horarios = require('../fusos_horarios.json')

        this.mongoose = require('mongoose')
        this.mongoose.connect(config.database, { autoIndex: false, useUnifiedTopology: true, useNewUrlParser: true })

        this.Ocorrencia = this.mongoose.model('Ocorrencia', require('../schemas/ocorrencia'))
        this.Incidente = this.mongoose.model('Incidente', require('../schemas/incidente'))
    }

    upsertPacote(pacote) {
        if (!pacote.idPacote) {
            console.log('Não é pacote')
            return Promise.reject('Não é pacote')
        }
        if (pacote.incidente) {
            if (pacote.incidente.dataRegistro) {
                pacote.incidente.dataRegistro = this.dataUTC(pacote.incidente.dataRegistro, pacote.incidente.fusoHorarioDataRegistro)
            }
            return this.upsertIncidente(pacote.incidente)
        }

        if (pacote.ocorrencia) {
            if (pacote.ocorrencia.dataRegistro) {
                pacote.ocorrencia.dataRegistro = this.dataUTC(pacote.ocorrencia.dataRegistro, pacote.ocorrencia.fusoHorarioDataRegistro)
            }
            return this.upsertOcorrencia(pacote.ocorrencia)
        }

        if (pacote.tipoPacote === 'ABANDONADO') {
            return Promise.resolve('Incidente abandonado')
        }

        return Promise.reject('Pacote desconhecido')
    }

    upsertIncidente(incidente) {
        return this.Incidente.findOneAndUpdate({ 'uuid': incidente.uuid }, incidente, {
            upsert: true,
            useFindAndModify: false
        })
    }

    upsertOcorrencia(ocorrencia) {
        return this.Ocorrencia.findOneAndUpdate({ 'uuid': ocorrencia.uuid }, ocorrencia, {
            upsert: true,
            useFindAndModify: false
        })
    }

    dataUTC(data, fuso_horario) {
        return new Date(data + '' + this.fusos_horarios[fuso_horario])
    }

}

module.exports = Database
