const fs = require('fs');
const path = require('path');

// Ruta donde se guardarán los mensajes eliminados
const dataDir = path.join(__dirname, 'mensajesEliminados');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Función para guardar mensajes en un archivo
function guardarMensaje(groupId, mensaje) {
    const filePath = path.join(dataDir, `${groupId}.json`);
    let mensajes = [];
    if (fs.existsSync(filePath)) {
        mensajes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    mensajes.push(mensaje);
    fs.writeFileSync(filePath, JSON.stringify(mensajes, null, 2));
}

// Función para cargar mensajes de un grupo
function cargarMensajes(groupId) {
    const filePath = path.join(dataDir, `${groupId}.json`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return [];
}

// Función para borrar el archivo de un grupo
function eliminarMensajes(groupId) {
    const filePath = path.join(dataDir, `${groupId}.json`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

// Exportar funciones
module.exports = {
    guardarMensaje,
    cargarMensajes,
    eliminarMensajes,
};
