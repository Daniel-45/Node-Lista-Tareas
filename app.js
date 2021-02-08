require('colors')
const {
    menuOpciones,
    pausa,
    leerDatos,
    eliminarTareaListado,
    confirmar,
    mostrarListaVerificacion
} = require('./helpers/inquirer');
const { guardarTareas, leerTareas } = require('./database/operacionesBaseDatos');
const Tareas = require('./models/tareas');

const main = async () => {

    let opcion = '';

    const tareas = new Tareas();

    const tareasBaseDatos = leerTareas();

    // Cargar tareas
    if (tareasBaseDatos) {
        tareas.cargarTareasArray(tareasBaseDatos);
    }

    do {
        opcion = await menuOpciones();

        switch (opcion) {
            case '1':
                const tarea = await leerDatos('Descripción:');
                tareas.crearTarea(tarea);
                break;
            case '2':
                tareas.listadoTareas();
                break;
            case '3':
                tareas.listarPendientesCompletadas(completadas = true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(completadas = false);
                break;
            case '5':
                const ids = await mostrarListaVerificacion(tareas.listaArray);
                tareas.cambiarCompletadasPendientes(ids);
                break;
            case '6':
                const id = await eliminarTareaListado(tareas.listaArray);
                if (id !== 0) {
                    const ok = await confirmar('¿Seguro que quieres eliminar esta tarea?')
                    if (ok) {
                        tareas.eliminarTarea(id);
                        console.log('Tarea eliminada correctamente'.green); 
                    }
                }
                break;
            default:
                break;
        }

        guardarTareas(tareas.listaArray);

        await pausa();
    } while (opcion !== '0');

}

main();