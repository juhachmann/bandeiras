
export interface GeoItem {
  country: Country;
  flag: Flag;
  geoLocation: GeoLocation
}

export interface Country {
  id: number;
  name: string;
}

export interface Flag {
  country_id: number;
  file: string;
  description: string;
  info: string;
}

export enum GeoLocation {
  BRAZIL = 'brazil',
  LATIN_AMERICA = 'latin_america',
}

// Que gambiarra
export namespace GeoLocation {
  export function get(geolocation: string): GeoLocation | null {
    switch (geolocation) {
      case 'brasil':
        return GeoLocation.BRAZIL
      case 'latin_america':
        return GeoLocation.LATIN_AMERICA
      default:
        return null
    }
  }
}

export interface IGeoItemRepository {
  getByGeoLocation(location: GeoLocation): Promise<GeoItem[]>
}

export enum GameType {
  FLAGS = 'flags',
  COUNTRIES = 'countries'
}

export interface GameConfig {
  gameType: GameType;
  location: GeoLocation;
}

export interface IGameAdapter {

  getGeoItemRepository(): IGeoItemRepository;
//   getSessionRepository(): GameSessionRepository;
//   getTimer(): GameTimer;
//  getCacheService(): CacheService;
//  getLogger(): Logger;

}

export interface IGameSession {
    getGame(): IGame
    isGameOver(): boolean
}

export interface IGame {
    getGeoLocation(): GeoLocation 
    getGameType(): GameType 
    nextQuestion() : IQuestion | null 
    getQuestions(): IQuestion[] 
    getAnswers() : IAnswer[] 
    getCurrentQuestion(): IQuestion | null 
}

export interface IQuestion {
    
    getId() : string 
    getAnswer() : IAnswer
    getText() : string 
    getHint() : string | null 
    getImage() : string | null 
    getGeoLocation(): GeoLocation 
    getType(): GameType 
    isHit() : boolean 
    getAttempts() : number 
    attempt(answer : IAnswer) : boolean 

}

export interface IAnswer {
    getId() : string 
    getText() : string
    getImage() : string | null 
    getInfo() : string | null 
    getAllMatched() : boolean 
}
