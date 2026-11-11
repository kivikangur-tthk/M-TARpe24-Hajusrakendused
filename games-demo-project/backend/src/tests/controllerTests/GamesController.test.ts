import { describe, it, expect, vi, test, beforeEach } from "vitest";
//describe, organiseerib teste
//it - on üks test case, on sama nagu test()
//expect - on assert, "expect(10).toBe(5)", expected ja actuali analoog
//vi - virtualiseerija millega tehakse mockobjekte, meetodeid, andmebaase jne - on kui "virtual"
//beforeEach käivitab setupi enne igat testi
import type { Request, Response } from "express";
import { v7 as uuidv7 } from "uuid";

//mock db
const mocks = vi.hoisted(()=> ({
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
}))

vi.mock("../../db.ts", () => ({
    db: {
        games: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update
        }
    }
}))

//import controller
import _GamesController from "../../controllers/GamesController.ts"
import GamesController from "../../controllers/GamesController.ts";
import type { Game } from "../../models/Game.ts";

//describe the test set for gamescontroller
describe("GamesController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test("Return_AllGames_With200Status", async () =>{
        //ülesseade
        mocks.findAll.mockResolvedValue(
            [
                {id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",GameName:"vi-game-test1"},
                {id: "01a18e66-5fd8-76d4-a0d8-ac475e2d340c",GameName:"vi-game-test2"},
                {id: "01a18e66-5fdb-73f6-9f37-033664a02b5a",GameName:"vi-game-test3"}
            ]
        )
        const req = {} as Request
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //tegevus
        await _GamesController.getAll(req, res);

        //kontroll
        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
                {id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",GameName:"vi-game-test1"},
                {id: "01a18e66-5fd8-76d4-a0d8-ac475e2d340c",GameName:"vi-game-test2"},
                {id: "01a18e66-5fdb-73f6-9f37-033664a02b5a",GameName:"vi-game-test3"}
            ])
    })

    test("Return_OneGameById_With200Status", async() =>{
        const game = 
        {
            id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",GameName:"vi-game-test1",
            GameDescription:"vi-game-testcription1",
            ReleaseDate: new Date(),
            CategoryID: "lamp",
            ImageURL: null,
            IsOwnedBy: 0,
            Reviews: null,
            Comments: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const req = {
            params: {
                id: game.id
            }
        } as unknown as Request

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response
        mocks.findByPk.mockResolvedValue(game)

        await _GamesController.getByID(req, res)

        console.log(res.statusCode)
        //kontroll
        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(game.id)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(game)

    })

    test("Return_CreatedGame_With201Status", async () =>{
        const id = "0386cf61-3b95-4e2c-b7d8-662b3b9ba338"
        mocks.create.mockResolvedValue({ id: id})
        const req = {
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            body: {
                GameName:"vi-game-test4",
                GameDescription:"vi-game-testcription4",
                ReleaseDate: new Date(),
                CategoryID: "diivan",
                ImageURL: null,
                IsOwnedBy: 0,
                Reviews: null,
                Comments: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        } as unknown as Request
        const res = {
            location: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as Response


        //tegevus
        await _GamesController.create(req,res)

        //CHECKITY CHECK DIS SHIZ
        expect(mocks.create).toHaveBeenCalledOnce()
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/games/${id}`)
        expect(res.sendStatus).toHaveBeenCalledWith(201)
    })

    test("Return_ModifiedGameById_With201Status", async() => {
        mocks.findByPk.mockResolvedValue({ id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30"})
        const game = 
        {
            id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",GameName:"vi-game-test1",
            GameDescription:"vi-game-testcription1",
            ReleaseDate: new Date(),
            CategoryID: "lamp",
            ImageURL: null,
            IsOwnedBy: 0,
            Reviews: null,
            Comments: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const explicitTime = new Date()
        mocks.update.mockResolvedValue([1])
        const req = {
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            params: {
                id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",
            },
            body:        
            {
                GameName:"vi-game-test1-update",
                GameDescription:"vi-game-new-testcription1",
                ReleaseDate: game.ReleaseDate,
                CategoryID: "laelamp",
                ImageURL: null,
                IsOwnedBy: 67,
                Reviews: null,
                Comments: null,
                createdAt: game.createdAt,
                updatedAt: game.updatedAt,
            }
        } as unknown as Request
        const res = {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response

        //äkshun
        const result = await _GamesController.modifyById(req, res) as unknown as Game

        //kontroll
        expect(mocks.findByPk).toHaveBeenCalledWith(game.id)
        expect(mocks.update).toHaveBeenCalledOnce()
        // expect(mocks.update).toHaveBeenCalledWith(
        //     expect.objectContaining({
        //         id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",
        //         GameName:"vi-game-test1-update",
        //         GameDescription:"vi-game-new-testcription1",
        //         ReleaseDate: game.ReleaseDate,
        //         CategoryID: "laelamp",
        //         ImageURL: null,
        //         IsOwnedBy: 67,
        //         Reviews: null,
        //         Comments: null,
        //         createdAt: game.createdAt,
        //         updatedAt: expect.any(Date),
        //     }),
        //     {where: {
        //         id: game.id 
        //     }}
        // )

        const updatedGame = mocks.update.mock.calls[0][0]
        console.log("updatedGame: "+updatedGame)
        console.log("updatedGame: "+result.id)
        expect(updatedGame.id).toBe(game.id)
        expect(updatedGame.GameName).toBe(game.GameName)
        expect(updatedGame.GameDescription).toBe(game.GameDescription)
        expect(updatedGame.ReleaseDate).toBe(game.ReleaseDate)
        expect(updatedGame.CategoryID).toBe(game.CategoryID)


        expect(res.status).toHaveBeenCalledWith(201)
    })


})

//write test