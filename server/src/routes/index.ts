import { Application } from "express";
import usersRoutes from "./users.routes";
import roleRoutes from "./role.routes";
import postRoutes from "./post.routes";
import likeRoutes from "./like.routes";
import commentRoutes from "./comment.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/user", usersRoutes);
    app.use("/post", postRoutes);
    app.use("/role", roleRoutes);
    app.use("/like", likeRoutes);
    app.use("/comment", commentRoutes);

    app.use("/", (req, res) => {
      res.json({ message: "Welcome to the application." });
    });
  }
}