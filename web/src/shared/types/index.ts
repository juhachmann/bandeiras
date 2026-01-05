import { GeoItemService } from './index';
import { GeoLocation } from "../core/GeoLocation";

export interface GeoItem {
  country: Country;
  flag: Flag;
}

export interface Flag {
  country_id: number;
  file: string;
  description: string;
  info: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  geoItem: GeoItem;
  sessionAttempts: SessionAttempts
}

export interface SessionAttempts {
  sessionId: number;
  attempts: number;
}

export interface TriviaProps {
  location: GeoLocation
  geoItemService: GeoItemService
}

export interface GeoItemService {
  getLatinAmericaFlags(): Array<GeoItem>
  getBrazilFlags(): Array<GeoItem>
}
