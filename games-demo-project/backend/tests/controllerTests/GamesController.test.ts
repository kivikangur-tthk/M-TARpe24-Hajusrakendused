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
    findAll: vi.fn()
}))

vi.mock("../../db.ts", () => ({
    db: {
        games: {
            findAll: mocks.findAll
        }
    }
}))

//import controller
import _GamesController from "../../controllers/GamesController.ts"

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
})

//write test