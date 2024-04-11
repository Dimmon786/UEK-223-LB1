import { Request, Response } from "express";
import Users from "../models/users.model";
import * as bcrypt from 'bcrypt';


const userPayload = {
    id: '123',
    username: 'exampleUser'
};

class AuthController {
    public async loginUser(req: Request, res: Response) {
        const { benutzerName, passwort } = req.body;
        const user = await Users.findOne({ where: { benutzerName } });

        if (!user || !user.passwort) {
            return res.status(404).send({ message: 'Benutzer nicht gefunden.' });
        }

        const validPassword = await bcrypt.compare(passwort, user.passwort);
        if (!validPassword) {
            return res.status(401).send({ message: 'Ungültiges Passwort.' });
        }

    }
}

class UsersController {
    public async createUser(req: Request, res: Response) {
        const { benutzerName, email, passwort, role } = req.body;

        // Passwort Hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwort, salt);

        try {
            const newUser = await Users.create({
                benutzerName,
                email,
                passwort: hashedPassword,
                role
            });

            newUser.passwort = undefined;

            res.status(201).send({ message: "Benutzer erfolgreich erstellt", user: newUser });
        } catch (err) {
            console.error("Fehler beim Erstellen des Benutzers: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Benutzer zu erstellen." });
        }
    }

    public async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { benutzerName, newPassword } = req.body;

        try {
            const user = await Users.findByPk(id);
            if (!user) {
                res.status(404).send({ message: "Benutzer nicht gefunden." });
                return;
            }

            if (newBenutzerName) {
                const existingUser = await Users.findOne({ where: { benutzerName: newBenutzerName } });
                if (existingUser && existingUser.id !== user.id) {
                    res.status(400).send({ message: "Benutzername ist bereits vergeben." });
                    return;
                }
                user.benutzerName = newBenutzerName; 
            }

            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                user.passwort = hashedPassword; 
            }

            await user.save();

            res.status(200).send({ message: "Benutzerdaten erfolgreich aktualisiert." });
        } catch (err) {
            console.error("Fehler beim Aktualisieren des Benutzers: ", error);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Benutzer zu aktualisieren." });
        }

    }
}

export const usersController = new UsersController();
export const authController = new AuthController();
