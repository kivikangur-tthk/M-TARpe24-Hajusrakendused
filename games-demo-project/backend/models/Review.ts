import { DataTypes, Model } from "sequelize";
import type {InferAttributes, InferCreationAttributes, CreationOptional, Sequelize} from "sequelize";

export class Review extends Model<InferAttributes<Review>,InferCreationAttributes<Review>> {
    //musthave
    declare ReviewTitle: string
    declare ReviewContent: string
    declare ReviewListID: string
    declare ReviewDate: Date
    declare ReviewScore: number
    declare ReviewedGame: string

    //canhave
    declare id: CreationOptional<string>
    declare ReviewCommentsId: CreationOptional<string>
    declare ReviewStatus: CreationOptional<string>

    //dbhas
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default function initReviewModel(
    sequelize: Sequelize
)
{
    Review.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            ReviewTitle:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ReviewContent:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ReviewListID:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ReviewDate:
            {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ReviewCommentsId:
            {
                type: DataTypes.STRING,
            },
            ReviewScore:
            {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            ReviewStatus:
            {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "unset"
            },
            ReviewedGame:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Review"
        }
    )
    return Review
}
