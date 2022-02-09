const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { engine } = require('express-handlebars')
const Productos = require('./productos.js')
const Mensajes = require('./mensajes.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productos = new Productos()
const mensajes =  new Mensajes()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts"
}))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('main.hbs')
})
app.post('/productos', (req, res) => {
    productos.addProduct(req.body)
    io.sockets.emit('productList', productos.getAll())
    res.redirect('/')
})


io.on('connection', async socket => {
    console.log(`User connected with socket id: ${socket.id}`)
    socket.emit('productList', productos.getAll())
    const msjs = await mensajes.getAll()
    socket.emit('messageBoard', msjs)
    socket.on('userMessage', msg => {
        const timeStamp = new Date(Date.now())
        let timeString = `[${timeStamp.toLocaleDateString()} ${timeStamp.toTimeString()}`
        let cutoffIndex = timeString.indexOf("G")-1
        let formatedTimeStamp = timeString.slice(0, cutoffIndex) + "]"
        msgData = { ...msg, date: formatedTimeStamp }
        mensajes.saveMessage(msgData)
        io.sockets.emit('newMessage', msgData)
    })
})

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
server.on('error', (err) => {
    console.log(err)
})