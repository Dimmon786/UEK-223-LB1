import { Model, Table, Column, DataType, AutoIncrement, ForeignKey, PrimaryKey } from "sequelize-typescript";
import Users from "./users.model";

@Table({
    tableName: "notification"
})
export default class Notification extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "benachrichtigungId"
    })
    benachrichtigungId?: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        field: "userId"
    })
    userId?: number;

    @Column({
        type: DataType.STRING(255),
        field: "benachrichtigungTyp"
    })
    benachrichtigungTyp?: string;

    @Column({
        type: DataType.STRING,
        field: "associatedId"
    })
    associatedId?: string;

    @Column({
        type: DataType.STRING,
        field: "nachricht"
    })
    nachricht?: string;

    @Column({
        type: DataType.DATE,
        field: "erstellDatum"
    })
    erstellDatum?: Date;

    @Column({
        type: DataType.BOOLEAN,
        field: "leseStatus"
    })
    leseStatus?: boolean;
}