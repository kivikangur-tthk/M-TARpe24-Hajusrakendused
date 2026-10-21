import {Sequelize, DataTypes} from 'sequelize';

//modelite pathid
import GameModel from "../backend/models/Game.ts";
import UserModel from "../backend/models/User.ts";
import UserCollectionModel from './models/UserCollection.ts';

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
        console.error("db connection error", error)
    }
}
//andmebaasi instants ja seostused
const db = {
    Sequelize, 
    sequelize,
    games: require("../backend/models/Game.ts")(sequelize, DataTypes),
    users: require("../backend/models/User.ts")(sequelize, DataTypes),
    userCollections: require("../backend/models/UserCollection.ts")(sequelize, DataTypes)
};
db.userCollections = require("../backend/models/UserCollection.ts")(sequelize, DataTypes, db.games, db.users)
db.games.belongsToMany(db.users, {through: db.userCollections, as: "UserId"})
db.users.belongsTo(db.games, {through: db.userCollections, as: "GameId"})

db.users.HasMany(db.userCollections,{foreignKey: "UserId" as "GameId"})
db.userCollections.belongsTo(db.users ,{foreignKey: "UserId" as "GameId"})


//sünkroonmeetod
const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

//export
export {db, sync, connect}