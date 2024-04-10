import { Model, Table, Column, DataType, AutoIncrement, ForeignKey, PrimaryKey } from "sequelize-typescript";
import Users from "./users.model";
import Post from "./post.model";

@Table({
    tableName: "likes"
})
export default class like extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "likeId"
    })
    likeId?: number;

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
        type: DataType.STRING,
        field: "likeDislikeType"
    })
    likeDislikeType?: string;
    
    @Column({
        type: DataType.DATE,
        field: "erstellDatum"
    })
    erstellDatum?: Date;
}