const fs = require('fs');
const archivo = './database/data.json';

const guardarTareas = (datos) => {
    fs.writeFileSync(archivo, JSON.stringify(datos));
}

const leerTareas = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const datos  = JSON.parse(info);
    return datos;
}

module.exports = {
    guardarTareas,
    leerTareas
}