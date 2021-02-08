const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    descripcion = '';
    completada = null;

    constructor(descripcion) {
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completada = null;
    }
}

module.exports = Tarea;