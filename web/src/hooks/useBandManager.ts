import { useState } from 'react';
import { BandManager } from '@shared/core/BandManager';
import { Band } from '@shared/types';

const bandManager = new BandManager();

export const useBandManager = () => {
  const [bands, setBands] = useState<Band[]>([]);

  const addBand = (bandData: Omit<Band, 'id'>) => {
    const newBand = bandManager.addBand(bandData);
    setBands(prev => [...prev, newBand]);
    return newBand;
  };

  const updateBand = (id: string, updates: Partial<Band>) => {
    const updated = bandManager.updateBand(id, updates);
    if (updated) {
      setBands(prev => prev.map(b => b.id === id ? updated : b));
    }
    return updated;
  };

  const deleteBand = (id: string) => {
    const success = bandManager.deleteBand(id);
    if (success) {
      setBands(prev => prev.filter(b => b.id !== id));
    }
    return success;
  };

  return { bands, addBand, updateBand, deleteBand };
};
