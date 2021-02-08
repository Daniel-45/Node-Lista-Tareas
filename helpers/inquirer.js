require('colors');
const inquirer = require('inquirer');

const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Selecciona una opción:',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Tareas completadas'
            },
            {
                value: '4',
                name: '4. Tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Eliminar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
];

const menuOpciones = async () => {
    console.clear();
    const { opcion } = await inquirer.prompt(opciones);

    return opcion;
}

const pausa = async () => {
    const opcion = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiona ${'ENTER'.green} para continuar`
        }
    ]
    console.log();
    await inquirer.prompt(opcion);
}

// Leer datos por teclado
const leerDatos = async (message) => {
    const input = [
        {
            type: 'input',
            name: 'datos',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor introduce un valor';
                }
                return true;
            }
        }
    ];

    const { datos } = await inquirer.prompt(input);

    return datos;
}

// Eliminar una tarea
const eliminarTareaListado = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const index = (i + 1);
        return {
            value: tarea.id,
            name: `${index + '.'} ${tarea.descripcion}`
        }
    });

    // Añadir opción cancelar
    choices.unshift({
        value: 0,
        name: '0. Cancelar'
    });

    const opciones  = [
        {
            type: 'list',
            name: 'id',
            message: 'Eliminar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(opciones);
    return id;
}

// Pregunta de confirmación para eliminar tarea
const confirmar = async (message) =>  {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

// Tareas completadas o pendientes
const mostrarListaVerificacion = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const index = (i + 1);
        return {
            value: tarea.id,
            name: `${index + '.'} ${tarea.descripcion}`,
            checked: (tarea.completada) ? true : false
        }
    });

    const opcion  = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciona',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(opcion);
    return ids;
}

module.exports = {
    menuOpciones,
    pausa,
    leerDatos,
    eliminarTareaListado,
    confirmar,
    mostrarListaVerificacion
};