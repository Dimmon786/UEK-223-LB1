class User {
   private _id: number;
   private _benutzerName: string;
   protected _passwort: string;
   private _eMail: string;
   private _role: UserRole;

    constructor(id: number, benutzerName: string, passwort: string, eMail: string, role: UserRole) {
        this._id = id;
        this._benutzerName = benutzerName;
        this._passwort = passwort;
        this._eMail = eMail;
        this._role = role;
    }

    // Getter und Setter ID
    getId(): number {
        return this._id;
    }

    setId(id: number): void {
        this._id = id;
    }
    
    // Getter und Setter Benutzername
    getBenutzterName(): string {
        return this._benutzerName;
    }

    setBenutzterName(benutzerName: string): void {
        this._benutzerName = benutzerName;
    }

    // Getter und Setter Passwort
    getPasswort(): string {
        return this._passwort;
    }

    setPasswort(passwort: string): void {
        this._passwort = passwort;
    }

    // Getter und Setter E-Mail
    getEMail(): string {
        return this._eMail;
    }

    setEMail(eMail: string): void {
        this._eMail = eMail;
    }

    getRole(): UserRole {
        return this._role;
    }

    setRole(role: UserRole): void {
        this._role = role;
    }

}

const myUser = new User(1, "Deine Mudda", "Passwort", "Gmail.com", UserRole.User);

console.log(myUser);
