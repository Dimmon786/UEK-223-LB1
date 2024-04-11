import { Request, Response } from "express";
import Likes from "../models/likes.model";
import Posts from "../models/post.model";


class LikesController {
    //Like hinzufügen
    public async addLike(req: Request, res: Response): Promise<void> {
        const { postId } = req.body;
        const userId = req.params.userId;

        try {
            // Überprüfen, ob der Post existiert
            const post = await Posts.findByPk(postId);
            if (!post) {
                res.status(404).send({ message: "Post nicht gefunden." });
                return;
            }

            // Überprüfen, ob der Benutzer den Post bereits geliked hat
            const existingLike = await Likes.findOne({ where: { postId, userId } });
            if (existingLike) {
                res.status(400).send({ message: "Sie haben diesen Post bereits geliked." });
                return;
            }

            // Ein neues Like hinzufügen
            const like = await Likes.create({ postId, userId });
            res.status(201).send({ message: "Like erfolgreich hinzugefügt.", like });
        } catch (err) {
            console.error("Fehler beim Hinzufügen des Likes: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten." })
        }

    }

    public async updateLike(req: Request, res: Response): Promise<void> {
        const { postId } = req.body;
        const userId = req.params.userId;

        try {
            const post = await Posts.findByPk(postId);
            if (!post) {
                res.status(404).send({ message: "Post nicht gefunden." });
                return;
            }

            let like = await Likes.findOne({ where: { postId, userId } });

            if (like) {
                like.likeDislikeType = like.likeDislikeType === 'like' ? 'dislike' : 'like';
                await like.save();
                res.status(200).send({ message: `Erfolgreich zu ${like.likeDislikeType} geändert.`, like });
            } else {
                like = await Likes.create({ postId, userId, likesDislikeType: 'like' });
                res.status(201).send({ message: "Like erfolgreich hinzugefügt.", like });
            }
        } catch (err) {
            console.error("Fehler beim Umschalten des Likes/Dislikes: ", err);
            res.status(500).send({ message: "Ein Fehler ist aufgetreten." }); FileSystemEntry
        }
    }

    public async GetPostLikesDislikes(req: Request, res: Response): Promise<void> {
        const { postId } = req.params;

        try {
            const likesCount = await Likes.count({
                where: { postId, likesDisklikesType: 'like' }
            });

            const dislikesCount = await Likes.count({
                where: { postId, likesDislikeType: 'dislike' }
            });

            res.status(200).send({ postId, likesCount, dislikesCount });
        } catch(err) {
            console.error("Fehler beim Abrufen der Likes/Dislikes: ", err);
            res.status(500).send({message: "Ein Fehler ist aufgetreten."})
        }
    }
}

export const likesController = new LikesController();