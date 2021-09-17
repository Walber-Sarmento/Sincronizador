class Certificado {

    static getToken(cert) {

        let token = cert.replace(/[\r\n]/g, '')
        if (token.startsWith('-----BEGIN CERTIFICATE-----')) {
            token = token.substring(27)
        }
    
        if (token.endsWith('-----END CERTIFICATE-----')) {
            token = token.substring(0, token.length - 25)
        }
    
        return token
    }

}

module.exports = Certificado