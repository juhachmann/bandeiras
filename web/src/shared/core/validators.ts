import { Band } from '../types';

// Pure validation functions
export const validateBandName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

export const validateGenre = (genre: string): boolean => {
  const validGenres = ['rock', 'pop', 'jazz', 'classical', 'electronic', 'folk'];
  return validGenres.includes(genre.toLowerCase());
};

// Business rules
export const canAddMember = (currentMembers: string[], maxMembers = 10): boolean => {
  return currentMembers.length < maxMembers;
};

export const calculateBandAge = (createdAt: Date): number => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdAt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days
};
