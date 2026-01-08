export interface GameTimer {
  
  startGame(): void
  endGame(): void
  getGameTime(): number
  isRunning(): boolean
  pause(): void
  resume(): void

}