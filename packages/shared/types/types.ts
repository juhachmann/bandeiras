
export interface GeoItem {
  country: Country;
  flag: Flag;
  geoLocation: GeoLocation
}

export interface Country {
  id: number;
  name: string;
  iso31661?: string;
}

export interface Flag {
  subjectId: string;
  file: string;
  description: string;
  info: string;
}

export interface FlagItem {
  subject: Subject;
  flag: Flag;
  metadata: {};
}

export interface Subject {
  id: string;
  code: string;
  codeType: string;
  name: string;
  type: string;
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

// Ideal que não viesse aqui
export interface IGeoItemRepository {
  getByGeoLocation(location: GeoLocation): Promise<GeoItem[]>
}

export interface QuerySpec {
  field: string
  operator: 'eq' | 'in' | 'contains'
  value: unknown
}

export interface IFlagItemRepository {
  findBySpec (spec: QuerySpec[]) : Promise<FlagItem[]>
}

export enum GameType {
  FLAGS = 'flags'
}

export interface GameConfig {
  gameType: GameType;
  filter: QuerySpec[]
}

export interface IGameAdapter {

  getFlagItemRepository(): IFlagItemRepository;
//   getSessionRepository(): GameSessionRepository;
//   getTimer(): GameTimer;
//  getCacheService(): CacheService;
//  getLogger(): Logger;

}

export interface IGameSession {
    getGame(): IGame | undefined
    isGameOver(): boolean
}

export interface IGame {
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
    getMetadata(): {} 
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
    getCode(): string | null 
    getCodeType() : string | null
}
