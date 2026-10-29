import { Sequelize, DataTypes } from 'sequelize';

//modelite pathid
import GameModel from "../backend/models/Game.ts";
import UserModel from "../backend/models/User.ts";
import UserCollectionModel from './models/UserCollection.ts';
import CategoryModel from './models/Category.ts';

//sequelizei andmebaasi ühendusandmed 
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOSTNAME!,
        dialect: "mariadb",
        logging: console.log,
    }
);

//ühendusmeetod
const connect = async (): Promise<void> => {
        try {
        await sequelize.authenticate();
        console.log("Connection established.");
    }
    catch (error)
    {
        console.log("db connection error", error)
    }
}
const _Game = GameModel(sequelize)
const _User = UserModel(sequelize)
const _UserCollection = UserCollectionModel(sequelize)
const _Category = CategoryModel(sequelize)
//andmebaasi instants ja seostused
_User.hasMany(_UserCollection,{foreignKey: "UserId" as "UserCollection"})
_UserCollection.belongsTo(_User ,{foreignKey: "UserId" as "User"})
const db = {
    Sequelize, 
    sequelize,
    games: _Game,
    users: _User,
    userCollections: _UserCollection,
    categories: _Category
};
// db.games.belongsToMany(db.users, {through: db.userCollections, as: "UserId"})
// db.users.belongsTo(db.games, {through: db.userCollections, as: "GameId"})



//sünkroonmeetod
const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

//export
export {db, sync, connect}