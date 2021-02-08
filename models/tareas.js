require('colors');
const Tarea = require("./tarea");

class Tareas {
    _lista = {};

    constructor() {
        this._lista = {};
    }

    // Convertir objeto a un array
    get listaArray() {
        const listado = [];
        Object.keys(this._lista).forEach(key => {
            const tarea = this._lista[key]
            listado.push(tarea);
        })
        return listado;
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._lista[tarea.id] = tarea;
    }

    cargarTareasArray(tareas = []) {
        tareas.forEach(tarea =>  {
            this._lista[tarea.id] = tarea;
        });
    }

    listadoTareas() {
        console.log();
        this.listaArray.forEach((tarea, i) => {
            let index = (i + 1);
            const { descripcion, completada } = tarea;
            const estado  = (completada) ? 'completada'.green : 'pendiente'.red
            if (completada) {
                console.log(`${index + '.'} ${descripcion} :: `.green + `${estado}`);
            } else {
                console.log(`${index + '.'} ${descripcion} :: `.red + `${estado}`);
            }
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let index = 0;
        this.listaArray.forEach((tarea) => {
            const { descripcion, completada } = tarea;
            const estado  = (completada) ? 'completada'.green : 'pendiente'.red
            if (completadas && completada) {
                index += 1;
                console.log(`${index.toString() + '.'} ${descripcion} :: ${completada}`.green);
            } 
            if (!completadas && !completada) {
                index += 1;
                console.log(`${index.toString() + '.'} ${descripcion} :: `.red + `${estado}`);
            }
        });
    }

    eliminarTarea(id) {
        console.log();
        if (this._lista[id]) {
            delete this._lista[id];
        }
    }

    cambiarCompletadasPendientes(ids = []) {
        ids.forEach(id  => {
            const tarea  = this._lista[id];
            if (!tarea.completada) {
                tarea.completada = new Date().toLocaleDateString();
            }
        });

        this.listaArray.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._lista[tarea.id].completada = null;
            }
        });
    }
}

module.exports = Tareas;