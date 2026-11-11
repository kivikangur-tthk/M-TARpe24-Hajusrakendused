//getall
export interface GameSummary {
    id: string,
    GameName: string
}

//getbyid/modifybyid
export interface Game {
    id: string,
    GameName: string,
    GameDescription: string,
    ReleaseDate: string,
    CategoryID: string,
    ImageURL: string | null,
    IsOwnedBy: number,
    Review: unknown | null,
    Comments: unknown | null
}

//create
export interface GameInput {
    GameName: string,
    GameDescription: string,
    ReleaseDate: string,
    CategoryID: string,
    ImageURL: string | null,
}

//categoryvalue
export interface Category {
    id: string,
    CategoryName: string
}