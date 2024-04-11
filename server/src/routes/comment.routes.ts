import { Router } from "express";
import { commentsController } from "../controllers/comment.controller"; 

const router = Router();

// Route zum Hinzufügen eines Kommentars
router.post("/:userId/comment", commentsController.addComment);

// Route zum Abrufen aller Kommentare eines Posts
router.get("/comments/:postId", commentsController.getCommentsByPost);

// Route zum Aktualisieren eines Kommentars
router.put("/:userId/comment", commentsController.updateComment);

// Route zum Löschen eines Kommentars
router.delete("/:userId/comment/:commentId", commentsController.deleteComment);

export default router;