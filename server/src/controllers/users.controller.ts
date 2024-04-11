import { Request, Response } from "express";
import Users from "../models/users.model";
import Role from "../models/role.model";
import * as bcrypt from 'bcrypt';


class AuthController {
    // Methode zur Benutzeranmeldung
    public async loginUser(req: Request, res: Response) {
        const { benutzerName, passwort } = req.body; // Extrahieren der Anmeldeinformationen aus dem Request-Body
        const user = await Users.findOne({ where: { benutzerName } }); // Suchen des Benutzers in der Datenbank

        // Überprüfen, ob der Benutzer existiert und ein Passwort hat
        if (!user || !user.passwort) {
            return res.status(404).send({ message: 'Benutzer nicht gefunden.' });
        }

        // Überprüfen des Passworts
        const validPassword = await bcrypt.compare(passwort, user.passwort);
        if (!validPassword) {
            return res.status(401).send({ message: 'Ungültiges Passwort.' });
        }

    }
}

class UsersController {
    // Methode zum Erstellen eines neuen Benutzers
    public async createUser(req: Request, res: Response): Promise<void> {
        const { benutzerName, email, passwort, roleId } = req.body;

        try {
            // Passwort Hash
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(passwort, salt);

            // Überprüfung, ob die Rolle gültig ist
            const role = await Role.findByPk(roleId || 1); // Standardrolle, falls keine Rolle angegeben ist
            if (!role) {
                res.status(400).send({ message: "Ungültige Rolle angegeben." });
                return;
            }

            // Erstellung des neuen Benutzerobjekts
            const newUser = await Users.create({
                benutzerName,
                email,
                passwort: hashedPassword,
                roleId: role.id
            });

            res.status(201).send({ message: "Benutzer erfolgreich erstellt", user: { id: newUser.id, benutzerName, email, roleId: newUser.roleId } });
        } catch (err) {
            console.error("Fehler beim Erstellen des Benutzers: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Benutzer zu erstellen." });
        }
    }

    // Methode zum Abrufen aller Benutzer mit ihren Rollen
    public async getAllUsersWithRoles(req: Request, res: Response): Promise<void> {
        try {
            const users = await Users.findAll({ include: [Role] });
            res.status(200).send(users);
        } catch (err) {
            console.error('Fehler beim Abrufen der Benutzer: ', err);
            res.status(500).send({ message: 'Ein Fehler ist aufgetreten.' });
        }
    }

    // Methode zum Aktualisieren von Benutzerdaten
    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { benutzerName, newPassword, roleId } = req.body;

        try {
            const user = await Users.findByPk(id);
            if (!user) {
                res.status(404).send({ message: "Benutzer nicht gefunden." });
                return;
            }

            // Aktualisieren des Benutzernamens, falls gegeben
            if (benutzerName) {
                user.benutzerName = benutzerName;
            }

            // Aktualisieren des Passworts, falls gegeben
            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                user.passwort = hashedPassword;
            }

            // Aktualisieren der Rolle, falls gegeben
            if (roleId) {
                const role = await Role.findByPk(roleId);
                if (!role) {
                    res.status(400).send({ message: "Ungültige Rolle angegeben." });
                    return;
                }
                user.roleId = roleId;
            }

            await user.save();
            res.status(200).send({ message: "Benutzerdaten erfolgreich aktualisiert." });
        } catch (err) {
            console.error("Fehler beim Aktualisieren des Benutzers: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Benutzer zu aktualisieren." });
        }
    }

    // Methode zum Löschen eines Benutzers
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const user = await Users.findByPk(id);
            if (!user) {
                res.status(404).send({ message: "Benutzer nicht gefunden." });
                return;
            }

            await user.destroy();
            res.status(200).send({ message: "Benutzer erfolgreich gelöscht." });
        } catch (err) {
            console.error("Fehler beim Löschen des Benutzers: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Benutzer zu löschen." });
        }
    }
}


// Exportieren der Controller-Instanzen
export const usersController = new UsersController();
export const authController = new AuthController();
