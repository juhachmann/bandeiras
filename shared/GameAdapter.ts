import { GameSessionRepository, GeoItemRepository } from "@/repository/repositories";
import { GameTimer } from "./core/GameTimer";

export interface GameAdapter {

  getGeoItemRepository(): GeoItemRepository;
  getSessionRepository(): GameSessionRepository;
  getTimer(): GameTimer;
//  getCacheService(): CacheService;
//  getLogger(): Logger;

}
