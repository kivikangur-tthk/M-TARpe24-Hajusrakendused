import { DataTypes, Model} from "sequelize";
import type {
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional,
    Sequelize
} from "sequelize";

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    //musthave
    declare CategoryName: string;
    declare CategoryDescription: string;

    //canhave
    declare id: CreationOptional<string>;

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
export default function initCategoryModel(sequelize: Sequelize) {
    Category.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        CategoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CategoryDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },{
        sequelize,
        modelName: "Category",
    }
)
return Category;
}