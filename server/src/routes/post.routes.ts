import { Router } from "express";
import  postsController  from "../controllers/post.controller"; 

const router = Router();

router.post("/", postsController.createPost);
router.put("/:postId", postsController.updatePost); // Route zum Aktualisieren eines Beitrags
router.delete("/:postId", postsController.deletePost); // Route zum Löschen eines Beitrags

export default router;
