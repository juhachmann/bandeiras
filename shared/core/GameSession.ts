import { GameConfig, GameType, GeoLocation } from "@/types/GameConfig";
import { GameAdapter } from "./GameAdapter";
import { Game } from "./Game";
import { IGame, IGameSession } from "./IGame";

export class GameSession implements IGameSession {

    private game : Game = new Game({gameType: GameType.COUNTRIES, location: GeoLocation.BRAZIL}, [])

    constructor(
        private readonly gameAdapter : GameAdapter,
        private readonly gameConfig : GameConfig
    ) { }

    getGame() : IGame {
        return this.game;
    }

    isGameOver(): boolean {
        return this.game.nextQuestion() == null;
    }

    async initialize() : Promise<void> {
        const repository = this.gameAdapter.getGeoItemRepository()
        const geoItems = await repository.getByGeoLocation(this.gameConfig.location)
        this.game = new Game(this.gameConfig, geoItems)
    }

}