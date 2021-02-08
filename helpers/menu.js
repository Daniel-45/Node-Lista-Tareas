const { resolve } = require('path');

require('colors')

const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tarea`);
        console.log(`${'3.'.green} Tareas completadas`);
        console.log(`${'4.'.green} Tareas pendientes`);
        console.log(`${'5.'.green} Completar tareas`);
        console.log(`${'6.'.green} Eliminar tarea`);
        console.log(`${'0.'.green} Salir\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Selecciona una opción: ', (opcion) => {
            readline.close();
            resolve(opcion);
        });
    });
}

const pausa =  () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${'ENTER'.green} para continuar`, (opcion) => {
            readline.close();
            resolve(opcion);
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}