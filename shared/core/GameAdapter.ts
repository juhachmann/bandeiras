import { GameSessionRepository, GeoItemRepository } from "@/types/repositories";
import { GameTimer } from "../types/GameTimer";

export interface GameAdapter {

  getGeoItemRepository(): GeoItemRepository;
  getSessionRepository(): GameSessionRepository;
  getTimer(): GameTimer;
//  getCacheService(): CacheService;
//  getLogger(): Logger;

}
