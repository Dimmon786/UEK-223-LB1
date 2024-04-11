import { Request, Response } from "express";
import Post from "../models/post.model";

class PostsController {
    public async createPost(req: Request, res: Response) {
        const { inhalt, userId } = req.body;

        // Validierung: prüft, ob der Inhalt nicht leer ist
        if (!inhalt || typeof inhalt !== 'string' || inhalt.trim().length === 0) {
            return res.status(400).send({ message: "Der Inhalt des Beitrags darf nicht leer sein." });
        }

        // Validierung: prüft, ob der Inhalt die bestimmte Länge nicht überschreitet
        if (inhalt.length > 500) {
            return res.status(400).send({ message: "Der Inhalt des Beitrags darf nicht länger als 500 Zeichen sein." });
        }

        // Logik zum Beitrag speichern
        try {
            const savedPost = await Post.create({
                inhalt: inhalt,
                userId: userId,
                erstellDatum: new Date(),
            });

            res.status(201).send(savedPost);
        } catch (err) {
            console.error("Fehler beim Speichern des Beitrags: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Beitrag zu speichern." });
        }
    }
}

export default new PostsController();
