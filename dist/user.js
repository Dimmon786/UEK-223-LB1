"use strict";
class User {
    constructor(id, benutzerName, passwort, eMail, role) {
        this._id = id;
        this._benutzerName = benutzerName;
        this._passwort = passwort;
        this._eMail = eMail;
        this._role = role;
    }
    // Getter und Setter ID
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    // Getter und Setter Benutzername
    getBenutzterName() {
        return this._benutzerName;
    }
    setBenutzterName(benutzerName) {
        this._benutzerName = benutzerName;
    }
    // Getter und Setter Passwort
    getPasswort() {
        return this._passwort;
    }
    setPasswort(passwort) {
        this._passwort = passwort;
    }
    // Getter und Setter E-Mail
    getEMail() {
        return this._eMail;
    }
    setEMail(eMail) {
        this._eMail = eMail;
    }
    getRole() {
        return this._role;
    }
    setRole(role) {
        this._role = role;
    }
}
const myUser = new User(1, "Deine Mudda", "Passwort", "Gmail.com", UserRole.User);
console.log(myUser);
