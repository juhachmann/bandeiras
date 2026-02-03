import { GameConfig } from "@/types/GameConfig";
import { GameSessionLoader, IGame } from "../core/IGame";
import { GameAdapter } from "../core/GameAdapter";
import { gameConfigMock } from "@/__dev__/GameConfigMock";
import { GameAdapterMock } from "@/__dev__/GameAdapterMock";
import { EmptyGameAdapterMock } from "@/__dev__/EmptyGameAdapter";

export const getLatinAmericaFlagGame = async () : Promise<IGame> => {
    const gameConfig : GameConfig = gameConfigMock
    const gameAdapter : GameAdapter = new GameAdapterMock()
    return await createGame(gameConfig, gameAdapter)
}

export const getEmptyFlagGame = async () : Promise<IGame> => {
    const gameConfig : GameConfig = gameConfigMock
    const gameAdapter : GameAdapter = new EmptyGameAdapterMock()
    return await createGame(gameConfig, gameAdapter)
}

const createGame = async (gameConfig : GameConfig, gameAdapter : GameAdapter) : Promise<IGame> => {
    const gameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
    return gameSession.getGame()
}