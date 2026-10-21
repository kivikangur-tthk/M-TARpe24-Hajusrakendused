import { Sequelize, DataTypes } from "sequelize";

export default function UserCollectionModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const UserCollection = sequelize.define(
        "UserCollection", {
            id: {
                type: dataTypes.UUIDV4,
                primaryKey: true
            },
            CollectionName: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            CollectionDescription: {
                type: dataTypes.STRING,
                allowNull: true,
            },
            // võõrvõtmed
            GameId: {
                type: dataTypes.ARRAY(dataTypes.UUID),
                allowNull: false
            },
            UserId: {
                type: dataTypes.UUID,
                allowNull: false
            },
        }
    )
    console.log(UserCollection === sequelize.models.UserCollection)
    return UserCollection
}