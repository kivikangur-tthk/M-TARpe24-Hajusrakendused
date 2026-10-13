import { Sequelize, DataTypes } from "sequelize";

export default function UserModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
){
    const User = sequelize.define(
        "User", {
            id: {type: dataTypes.UUIDV4},
            UserName: {type: dataTypes.STRING, allowNull: false},
            PasswordHash: {type: dataTypes.STRING, allowNull: false},
            SignupDate: {type: dataTypes.DATEONLY, defaultValue: Date.now()},
            UserStatus: {type: dataTypes.STRING, defaultValue: "unverified"},
            //user, admin
            UserCollectionID: {type: dataTypes.STRING },
            ReviewListID: {type: dataTypes.STRING },
            ProfileID: {type: dataTypes.STRING, allowNull: true },
            EmailAddress: {type: dataTypes.STRING, allowNull: false },
            CredentialID: {type: dataTypes.STRING },
        }
    )
    console.log(User === sequelize.models.User)
    return User;
}