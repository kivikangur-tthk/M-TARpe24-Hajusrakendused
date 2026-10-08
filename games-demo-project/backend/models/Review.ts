import { Sequelize, Datatypes } from "sequelize";

export default function ReviewModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
)
{
    const Review = sequelize.define(
        "Review", {
            id: {
                type: dataTypes.UUIDV4
            },
            ReviewTitle:
            {
                type: dataTypes.STRING,
                allowNull: false,
            },
            ReviewContent:
            {
                type: dataTypes.TEXT,
                allowNull: false,
            },
            ReviewListID:
            {
                type: dataTypes.STRING,
                allowNull: false,
            },
            ReviewDate:
            {
                type: dataTypes.DATEONLY,
                allowNull: false,
            },
            ReviewCommentsID:
            {
                type: dataTypes.DATEONLY,
            },
            ReviewScore:
            {
                type: dataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            ReviewStatus:
            {
                type: dataTypes.STRING,
                allowNull: false,
                defaultValue: "unset"
            },
            ReviewedGame:
            {
                type: dataTypes.STRING,
                allowNull: false,
            },
        }
    )
}
