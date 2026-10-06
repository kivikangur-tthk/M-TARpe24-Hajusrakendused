import { Sequelize, DataTypes } from "sequelize";

export default function GameModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) 
{
    const Game = sequelize.define(
        "Game", {
            id: {
                type: dataTypes.UUIDV4
            },
            GameName: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            GameDescription: {
                type: dataTypes.TEXT,
                allowNull: false,
            },
            ReleaseDate: {
                type: dataTypes.DATEONLY,
                allowNull: false,
            },
            ImageURL: {
                type: dataTypes.STRING,
            },
            IsOwnedBy: {
                type: dataTypes.INTEGER,
            },
            Reviews: {
                type: dataTypes.ARRAY(dataTypes.STRING)
            },
            Comments: {
                type: dataTypes.ARRAY(dataTypes.STRING)
            },
            CategoryID: {
                type: dataTypes.STRING,
                allowNull: false
            }
        }
    )
    console.log(Game === sequelize.models.Game)
    return Game;
}