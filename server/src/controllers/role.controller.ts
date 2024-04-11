import { Request, Response } from "express";
import Role from '../models/role.model';

class RoleController {
    // Rolle erstellen
    public async createRole(req: Request, res: Response): Promise<void> {
        const { name } = req.body;

        try {
            const newRole = await Role.create({ name });
            res.status(201).send({ message: 'Rolle erfolgreich erstellt', role: newRole });
        } catch (err) {
            console.error('Fehler beim Erstellen der Rolle: ', err);
            res.status(500).send({ message: 'Ein Fehler ist aufgetreten.' });
        }
    }

    // Alle Rollen auflisten
    public async getAllRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await Role.findAll();
            res.status(200).send(roles);
        } catch (err) {
            console.error('Fehler beim Abrufen der Rollen: ', err);
            res.status(500).send({ message: 'Ein Fehler ist aufgetreten.' });
        }
    }

    // Rolle aktualisieren
    public async updateRole(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const role = await Role.findByPk(id);
            if (!role) {
                res.status(404).send({ message: 'Rolle nicht gefunden.' });
                return;
            }

            role.name = name;
            await role.save();

            res.status(200).send({message: 'Rolle erfolgreich aktualisiert', role});
        } catch (err) {
            console.error('Fehler beim Aktualisieren der Rolle: ', err);
            res.status(500).send({message: 'Ein Fehler ist aufgetreten.'});
        }
    }

    public async deleteRole(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const role = await Role.findByPk(id);
            if (!role) {
                res.status(404).send({message: 'Rolle nicht gefunden.'});
                return;
            }

            await role.destroy();
            res.status(200).send({message: 'Rolle erfolgreich gelöscht.'});
        } catch (err) {
            console.error('Fehler beim Löschen der Rolle: ', err);
            res.status(500).send({message: 'Ein Fehler ist aufgetreten.'});
        }
    }
}

export const roleController = new RoleController();