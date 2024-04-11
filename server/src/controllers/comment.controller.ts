import { Request, Response } from "express";
import Comment from "../models/comment.model"
import Posts from "../models/post.model";


class CommentsController {
    // Kommentar zu einem Post hinzufügen
    public async addComment(req: Request, res: Response): Promise<void> {
        const { postId, inhalt } = req.body;
        const userId = req.params.userId;

        try {
            const postExists = await Posts.findByPk(postId);
            if (!postExists) {
                res.status(404).send({ message: "Post nicht gefunden." });
                return;
            }

            const newComment = await Comment.create({
                postId,
                userId,
                inhalt
            });

            res.status(201).send({ message: "Kommentar erfolgreich hinzugefügt", comment: newComment });
        } catch (err) {
            console.error("Fehler beim Hinzufügen des Kommentars: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten." });
        }
    }

    public async getCommentsByPost(req: Request, res: Response): Promise<void> {
        const { postId } = req.params;

        try {
            const comments = await Comment.findAll({
                where: { postId },
                order: [['createdAt', 'DESC']], 
            });

            res.status(200).send(comments);
        } catch (err) {
            console.error("Fehler beim Abrufen der Kommentare: ", err);
            res.status(500).send({message: "Ein Fehler ist aufgetreten."});
        }
    }

    public async updateComment(req: Request, res: Response): Promise<void> {
        const { commentId, inhalt } = req.body;
        const userId = req.params.userId;

        try {
            const comment = await Comment.findOne({
                where: { id: commentId, userId }
            });

            if (!comment) {
                res.status(404).send({message: "Kommentar nicht gefunden oder Berechtigung fehlt."});
                return;
            }

            comment.inhalt = inhalt;
            await inhalt.save();

            res.status(200).send({message: "Kommentar erfolgreich aktualisiert", comment});
        } catch (err) {
            console.error("Fehler beim Aktualisieren des Kommentars: ", err);
            res.status(500).send({message: "Ein Fehler ist aufgetreten."});
        }
    }

    public async deleteComment(req: Request, res: Response): Promise<void> {
        const { commentId } = req.params;
        const userId = req.params.userId;

        try {
            const comment = await Comment.findOne({
                where: { id: commentId, userId }
            });

            if (!comment) {
                res.status(404).send({message: "Kommentar nicht gefunden oder Berechtigung fehlt."});
                return;
            }

            await comment.destroy();
            res.status(200).send({message: "Kommentar erfolgreich gelöscht."});
        } catch (err) {
            console.error("Fehler beim Löschen des Kommentars: ", err);
            res.status(500).send({message: "Ein Fehler ist aufgetreten."});
        }
    }
}

export const commentsController = new CommentsController();