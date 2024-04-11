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

    public async updatePost(req: Request, res: Response) {
        const { postId } = req.params;
        const { inhalt } = req.body;

        // Validierungen
        if (!inhalt || typeof inhalt !== 'string' || inhalt.trim().length === 0) {
            return res.status(400).send({ message: "Der Inhalt des Beitrags darf nicht leer sein." });
        }

        if (inhalt.length > 500) {
            return res.status(400).send({ message: "Der Inhalt des Beitrags darf nicht länger als 500 Zeichen sein." });
        }

        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).send({ message: "Beitrag nicht gefunden." });
            }

            post.inhalt = inhalt;
            await post.save();

            res.status(200).send({ message: "Beitrag erfolgreich aktualisiert.", post });
        } catch (err) {
            console.error("Fehler beim Aktualisieren des Beitrags: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Beitrag zu aktualisieren." });
        }
    }

    public async deletePost(req: Request, res: Response) {
        const { postId } = req.params;

        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).send({ message: "Beitrag nicht gefunden." });
            }

            await post.destroy();
            res.status(200).send({ message: "Beitrag erfolgreich gelöscht." });
        } catch (err) {
            console.error("Fehler beim Löschen des Beitrags: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten beim Versuch, den Beitrag zu löschen." });
        }
    }

}

export default new PostsController();
