const fs = require('fs')
class Mensajes {
    directorio = './mensajesLog.txt'

    async getAll() {
        try{
            const readFile = await fs.promises.readFile(this.directorio)
            return JSON.parse(readFile)
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async saveMessage(msgData) {
        try {
            if(fs.existsSync(this.directorio)){
                const fileRead = await fs.promises.readFile(this.directorio)
                const fileData = JSON.parse(fileRead);
                const newData = [ ...fileData, msgData  ]
                await fs.promises.writeFile(this.directorio, JSON.stringify(newData, null, 2))
            } else {
                await fs.promises.writeFile(this.directorio, JSON.stringify([ msgData ], null, 2))
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Mensajes