// likeRoutes.ts
import { Router } from "express";
import  { likesController }  from "../controllers/like.controller"; // Achte darauf, den korrekten Pfad anzugeben

const router = Router();

// Route zum Hinzufügen eines Likes oder Dislikes
router.post("/:userId/like", likesController.addLike);
router.put("/:userId/like", likesController.updateLike);

// Route zum Abrufen der Like/Dislike-Anzahl eines Posts
router.get("/likes-dislikes/:postId", likesController.GetPostLikesDislikes);

export default router;
