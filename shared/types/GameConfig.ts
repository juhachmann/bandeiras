
export enum GameType {
  FLAGS = 'flags',
  COUNTRIES = 'countries'
}

export enum GeoLocation {
  BRAZIL = 'brazil',
  LATIN_AMERICA = 'latin_america',
}

export enum Difficulty {
  EASY = 'easy',      
  MEDIUM = 'medium',  
  HARD = 'hard'
}

export interface GameConfig {
  gameType: GameType;
  location: GeoLocation;
  difficulty: Difficulty;
}
