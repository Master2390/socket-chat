class Usuarios {
    constructor() {
        this.personas = [];
    }

    addPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(pers => pers.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasBySala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {
        let borrado = this.getPersona(id)
        this.personas = this.personas.filter(pers => pers.id !== id);
        return borrado;
    }

}

module.exports = {
    Usuarios,
}