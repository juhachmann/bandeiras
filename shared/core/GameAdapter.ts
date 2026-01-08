import { GameSessionRepository, GeoItemRepository } from "@/types/repository";
import { GameTimer } from "../types/GameTimer";

export interface GameAdapter {

  getGeoItemRepository(): GeoItemRepository;
  getSessionRepository(): GameSessionRepository;
  getTimer(): GameTimer;
//  getCacheService(): CacheService;
//  getLogger(): Logger;

}
