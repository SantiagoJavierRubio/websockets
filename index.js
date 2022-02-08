const express = require('express')
const { engine } = require('express-handlebars')
const Productos = require('./productos.js')

const productos = new Productos();
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts"
}))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('formulario.hbs')
})
app.get('/productos', (req, res) => {
    const listaDeProductos = productos.getAll()
    res.render('listado.hbs', {listaDeProductos})
})
app.post('/productos', (req, res) => {
    productos.addProduct(req.body)
    res.redirect('/')
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
server.on('error', (err) => {
    console.log(err)
})