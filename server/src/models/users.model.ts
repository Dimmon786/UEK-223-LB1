import { Model, Table, Column, DataType, AutoIncrement, ForeignKey, PrimaryKey, BelongsTo } from "sequelize-typescript";
import Role from './role.model';

@Table({
    tableName: "users",
})
export default class Users extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number;

    @ForeignKey(() => Role)
    @Column(DataType.INTEGER)
    roleId!: number;
    @BelongsTo(() => Role)
    role!: Role;
    

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "benutzerName"
    })
    benutzerName?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "email"
    })
    email?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "passwort"
    })
    passwort?: string;

}
