
export enum GameType {
  FLAGS = 'flags',
  COUNTRIES = 'countries'
}

export enum GeoLocation {
  BRAZIL = 'brazil',
  LATIN_AMERICA = 'latin_america',
}

export interface GameConfig {
  gameType: GameType;
  location: GeoLocation;
}
