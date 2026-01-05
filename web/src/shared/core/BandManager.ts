// Core business logic - completely platform agnostic
export class Game {

  private bands: Band[] = [];

  addBand(band: Omit<Band, 'id'>): Band {
    const newBand = { ...band, id: crypto.randomUUID() };
    this.bands.push(newBand);
    return newBand;
  }

  getBand(id: string): Band | undefined {
    return this.bands.find(band => band.id === id);
  }

  updateBand(id: string, updates: Partial<Band>): Band | null {
    const index = this.bands.findIndex(band => band.id === id);
    if (index === -1) return null;
    
    this.bands[index] = { ...this.bands[index], ...updates };
    return this.bands[index];
  }

  deleteBand(id: string): boolean {
    const index = this.bands.findIndex(band => band.id === id);
    if (index === -1) return false;
    
    this.bands.splice(index, 1);
    return true;
  }
  
}
