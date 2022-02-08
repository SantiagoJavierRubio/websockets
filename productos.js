class Productos {
    constructor() {
        this.listaDeProductos = []
        this.id = 0
    }
    getAll () {
        return this.listaDeProductos;
    }
    getById (id) {
        return this.listaDeProductos.filter(product => product.id === id)
    }
    addProduct (obj) {
        const newObject = { ...obj, id: ++this.id }
        this.listaDeProductos = [ ...this.listaDeProductos, newObject ]
        return newObject
    }
    updateProduct (id, obj) {
        const productIndex = this.listaDeProductos.findIndex(product => product.id === id)
        if(productIndex === -1) return false
        this.listaDeProductos[productIndex] = { ...obj, id: id }
        return true
    }
    deleteProduct (id) {
        const newList = this.listaDeProductos.filter(product => product.id != id)
        if(newList.length === this.listaDeProductos.length) return false
        this.listaDeProductos = newList
        return true
    }
}

module.exports = Productos