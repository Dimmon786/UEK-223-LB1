import { Model, Table, Column, DataType, AutoIncrement, ForeignKey, PrimaryKey } from "sequelize-typescript";
import Users from "./users.model";

@Table({
    tableName: "post",
    timestamps: true,
})
export default class Post extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        field: "inhalt",
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
