import type { UUID } from "node:crypto";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";
import type { Json } from "sequelize/lib/utils";

export class Game extends Model<InferAttributes<Game>,InferCreationAttributes<Game>> {
    //musthave
    declare GameName: string;
    declare GameDescription: string;
    declare ReleaseDate: Date;
    declare CategoryID: string;

    //canhave
    declare id: CreationOptional<string>
    declare ImageURL: CreationOptional<string | null>
    declare IsOwnedBy: CreationOptional<number>
    declare Reviews: CreationOptional<Json | null>
    declare Comments: CreationOptional<Json | null>

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default function initGameModel(sequelize: Sequelize) 
{
    Game.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true
            },
            GameName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            GameDescription: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            ReleaseDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ImageURL: {
                type: DataTypes.STRING,
            },
            IsOwnedBy: {
                type: DataTypes.INTEGER,
            },
            Reviews: {
                type: DataTypes.JSON
            },
            Comments: {
                type: DataTypes.JSON
            },
            CategoryID: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,

        },
        {
            sequelize,
            modelName: "Game"
        }
    )
    return Game;
}