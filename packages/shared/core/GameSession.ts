import { GameConfig, IGame, IGameAdapter, IGameSession } from "../types/types";
import { Game } from "./Game";

export class GameSession implements IGameSession {

    private game? : IGame

    constructor(
        private readonly gameAdapter : IGameAdapter,
        private readonly gameConfig : GameConfig
    ) { }

    getGame() : IGame | undefined {
        return this.game;
    }

    isGameOver(): boolean {
        return this.game?.nextQuestion() == null;
    }

    async initialize() : Promise<void> {
        const repository = this.gameAdapter.getFlagItemRepository()
        const geoItems = await repository.findBySpec(this.gameConfig.filter)
        this.game = new Game(this.gameConfig, geoItems)
    }

}