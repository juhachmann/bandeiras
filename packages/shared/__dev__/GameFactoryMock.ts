import { GameSessionLoader } from "../GameSessionLoader"
import { GameConfig, IGame, IGameAdapter } from "../types/types"
import { EmptyGameAdapterMock } from "./EmptyGameAdapter"
import { GameAdapterMock } from "./GameAdapterMock"
import { gameConfigMock } from "./GameConfigMock"

export const getLatinAmericaFlagGame = async () : Promise<IGame> => {
    const gameConfig : GameConfig = gameConfigMock
    const gameAdapter : IGameAdapter = new GameAdapterMock()
    return await createGame(gameConfig, gameAdapter)
}

export const getEmptyFlagGame = async () : Promise<IGame> => {
    const gameConfig : GameConfig = gameConfigMock
    const gameAdapter : IGameAdapter = new EmptyGameAdapterMock()
    return await createGame(gameConfig, gameAdapter)
}

const createGame = async (gameConfig : GameConfig, gameAdapter : IGameAdapter) : Promise<IGame> => {
    const gameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
    return gameSession.getGame()
}