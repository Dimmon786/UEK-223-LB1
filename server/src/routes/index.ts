import express, { Application } from "express";
import usersRoutes from "./users.routes";
import roleRoutes from "./role.routes";
import postRoutes from "./post.routes";
import likeRoutes from "./like.routes";
import commentRoutes from "./comment.routes";
import homeRoutes from "./home.routes";
import path from 'path';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

export default class Routes {
  constructor(app: Application) {
    app.use("/user", usersRoutes);
    app.use("/post", postRoutes);
    app.use("/role", roleRoutes);
    app.use("/like", likeRoutes);
    app.use("/comment", commentRoutes);
    app.use(express.static(path.join(__dirname, '../../public')));

    app.get('*', (req, res) => {
      // Adjust the path based on where the index.html is located relative to this script
      res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
    });

  }
}