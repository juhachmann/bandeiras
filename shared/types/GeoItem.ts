
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
