import { GameTimer } from "@/types";

export class GameTimerMock implements GameTimer {
    
    startGame(): void {
        throw new Error("Method not implemented.");
    }
    endGame(): void {
        throw new Error("Method not implemented.");
    }
    getGameTime(): number {
        throw new Error("Method not implemented.");
    }
    isRunning(): boolean {
        throw new Error("Method not implemented.");
    }
    pause(): void {
        throw new Error("Method not implemented.");
    }
    resume(): void {
        throw new Error("Method not implemented.");
    }
    
}