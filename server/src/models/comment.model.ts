import { Model, Table, Column, DataType, AutoIncrement, ForeignKey, PrimaryKey } from "sequelize-typescript";
import Users from "./users.model";
import Post from "./post.model";

@Table({
    tableName: "comment"
})
export default class Comment extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "commentId"
    })
    commentId?: number;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        field: "postId"
    })
    postId?: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        field: "userId"
    })
    userId?: number;

    @Column({
        type: DataType.STRING(500),
        field: "inhalt"
    })
    inhalt?: string;

    @Column({
        type: DataType.DATE,
        field: "erstellDatum"
    })
    erstellDatum?: Date;

    @Column({
        type: DataType.DATE,
        field: "bearbeitungsDatum"
    })
    bearbeitungsDatum?: Date;
}