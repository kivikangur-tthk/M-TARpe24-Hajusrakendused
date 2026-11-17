import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
    info: {
        title: "My Games API",
        description: "Description",
        version: "1.0.0"
    },
    host: process.env.HOST + ':' + process.env.PORT,
    tags: [
        { name: 'Games' },
        { name: 'Users' },
        { name: 'UserCollections' },
        { name: 'Categories' }
    ],
    definitions: {
        Category: {
            id: "550e8400-e29b-41d4-a716-446655440000",
            CategoryName: "RPG",
            CategoryDescription: "Role-playing video games",
            createdAt: "2026-01-01T12:00:00.000Z",
            updatedAt: "2026-01-01T12:00:00.000Z"
        },
        NewCategory: {
            $CategoryName: "RPG",
            $CategoryDescription: "Role-playing video games"
        },
        Game: {
            id: "550e8400-e29b-41d4-a716-446655440001",
            GameName: "The Witcher 3: Wild Hunt",
            GameDescription: "Open-world action RPG",
            ReleaseDate: "2015-05-19T00:00:00.000Z",
            ImageURL: "https://example.com",
            IsOwnedBy: 120,
            Reviews: [],
            Comments: [],
            CategoryID: "550e8400-e29b-41d4-a716-446655440000",
            createdAt: "2026-01-01T12:00:00.000Z",
            updatedAt: "2026-01-01T12:00:00.000Z"
        },
        NewGame: {
            $GameName: "The Witcher 3: Wild Hunt",
            $GameDescription: "Open-world action RPG",
            $ReleaseDate: "2015-05-19T00:00:00.000Z",
            $CategoryID: "550e8400-e29b-41d4-a716-446655440000",
            ImageURL: "https://example.com",
            IsOwnedBy: 0,
            Reviews: [],
            Comments: []
        },
        GameListItem: {
            id: "550e8400-e29b-41d4-a716-446655440001",
            GameName: "The Witcher 3: Wild Hunt"
        },
        User: {
            id: "550e8400-e29b-41d4-a716-446655440002",
            UserName: "gamer123",
            PasswordHash: "$2b$10$examplehashstring",
            SignupDate: "2026-01-01",
            UserStatus: "unverified",
            UserCollectionID: null,
            ReviewListID: null,
            ProfileID: null,
            EmailAddress: "gamer@example.com",
            CredentialID: null,
            createdAt: "2026-01-01T12:00:00.000Z",
            updatedAt: "2026-01-01T12:00:00.000Z"
        },
        NewUser: {
            $UserName: "gamer123",
            $PasswordHash: "secretPassword123",
            $EmailAddress: "gamer@example.com",
            UserStatus: "unverified",
            UserCollectionID: null,
            ReviewListID: null,
            ProfileID: null,
            CredentialID: null
        },
        UserCollection: {
            id: "550e8400-e29b-41d4-a716-446655440003",
            CollectionName: "Favorites",
            CollectionDescription: "My all-time favorite games",
            GameIDs: ["550e8400-e29b-41d4-a716-446655440001"],
            UserId: "550e8400-e29b-41d4-a716-446655440002",
            createdAt: "2026-01-01T12:00:00.000Z",
            updatedAt: "2026-01-01T12:00:00.000Z"
        },
        NewUserCollection: {
            $CollectionName: "Favorites",
            $GameIDs: ["550e8400-e29b-41d4-a716-446655440001"],
            $UserId: "550e8400-e29b-41d4-a716-446655440002",
            CollectionDescription: "My all-time favorite games"
        },
        ErrorResponse: {
            error: "Error message"
        }
    }
};

const outputFile = '../docs/swagger-autogen.json';
const routes = ['../routes/appRoutes.ts'];

swaggerAutogen()(outputFile, routes, doc);
