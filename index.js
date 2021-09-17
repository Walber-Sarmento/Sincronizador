const fs = require('fs')
const WebSocket = require('ws')
const config = require('./config.json')
const http = require('http')

const Database = require('./lib/database')
const Certificado = require('./lib/certificado')

const dao = new Database()

let last_message

function WebSocketClient() {
    this.autoReconnectInterval = 70 * 1000; // ms
}
WebSocketClient.prototype.open = function (url) {
    this.url = url;
    this.instance = new WebSocket(this.url, {
        headers: {
            'certificado-x509-base64': Certificado.getToken(fs.readFileSync('./certificados/cliente.pem').toString())
        },
        rejectUnauthorized: false
    });

    this.instance.on('open', () => {
        if (this.timeoutMessage) {
            clearTimeout(this.timeoutMessage);
        }
        this.onopen();
        this.timeoutMessage = setTimeout(() => this.reconnect(), this.autoReconnectInterval)
    });
    this.instance.on('message', (data, flags) => {
        if (this.timeoutMessage) {
            clearTimeout(this.timeoutMessage);
        }
        this.onmessage(data, flags);
        this.timeoutMessage = setTimeout(() => this.reconnect(), this.autoReconnectInterval)
    });
    this.instance.on('close', (e) => {
        switch (e.code) {
            case 1000:
                console.log("WebSocket: closed");
                break;
            default:
                this.reconnect(e);
                break;
        }
        this.onclose(e);
    });
    this.instance.on('error', (e) => {
        switch (e.code) {
            case 'ECONNREFUSED':
                this.reconnect(e);
                break;
            default:
                this.onerror(e);
                break;
        }
    });
}
WebSocketClient.prototype.send = function (data, option) {
    try {
        this.instance.send(data, option);
    } catch (e) {
        this.instance.emit('error', e);
    }
}

WebSocketClient.prototype.reconnect = function (e) {
    console.log("WebSocketClient: reconnecting...");
    this.instance.removeAllListeners();
    this.open(this.url);
}
WebSocketClient.prototype.onopen = function (e) {
    last_message = Date.now()
    console.log("WebSocketClient: open", arguments);
}
WebSocketClient.prototype.onerror = function (e) {
    last_message = null
    console.log("WebSocketClient: error", arguments);
}
WebSocketClient.prototype.onclose = function (e) {
    last_message = null
    console.log("WebSocketClient: closed", arguments);
}

var wsc = new WebSocketClient();
wsc.open(config.endpoint);
wsc.onopen = function () {
    last_message = Date.now()
    console.log("WebSocketClient connected:");
}
wsc.onmessage = function (message, flags, number) {
    last_message = Date.now()

    if (message === 'KEEP_ALIVE') {
        console.log(message)
        wsc.send('KEEP_ALIVE')
        return
    }
    let data = JSON.parse(message)

    dao.upsertPacote(data).then(() => {
        console.log('Inserido', data.idPacote)
        wsc.send(data.idPacote)
    }).catch(err => {
        console.log(err)
    })
}

const requestListener = function (req, res) {
    if (Date.now() > last_message + 90 * 1000) { // 90 segundos
        res.writeHead(500)
        res.end('unhealthy')
        return process.exit(1)
    }
    res.writeHead(200)
    res.end('healthy')
}

const server = http.createServer(requestListener)
server.listen(80)