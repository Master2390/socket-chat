const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utilidades')
const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('ingresoChat', (user, callback) => {
        if (!user.nombre || !user.sala) {
            callback({
                ok: false,
                msg: 'El nombre/sala es requerido'
            });
        }

        client.join(user.sala);
        let personas = usuarios.addPersona(client.id, user.nombre, user.sala);
        client.broadcast.to(user.sala).emit('listaActivos', usuarios.getPersonasBySala(user.sala));

        callback(personas);
    });

    client.on('crearMensaje', data => {
        let persona = usuarios.getPersona(client.id)
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let borrado = usuarios.borrarPersona(client.id);
        client.broadcast.to(borrado.sala).emit('crearMensaje', crearMensaje('Admin', `${borrado.nombre} salio`));
        client.broadcast.to(borrado.sala).emit('listaActivos', usuarios.getPersonasBySala(borrado.sala));
    });

    client.on('sendPrivate', data => {
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.to).emit('sendPrivate', crearMensaje(persona.nombre, data.mensaje));
    });
});