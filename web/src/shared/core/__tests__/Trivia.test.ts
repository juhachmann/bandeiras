import { Trivia } from '../Trivia';
import { GeoItem, TriviaProps } from '../../types';
import { GeoLocation } from '../GeoLocation';
import { GeoItemDataSource } from '../../services/geoItemDataSource';

describe('Trivia', () => {

  const triviaProps: TriviaProps = { 
    location: GeoLocation.LATIN_AMERICA,
    geoItemService: new GeoItemDataSource() 
  };

  describe('constructor', () => {

    const trivia_A : Trivia = new Trivia(triviaProps)
    const trivia_B: Trivia = new Trivia(triviaProps)

    const maxNumberOfCombinations : number = 6

    it('should generate country lists with the same lenght', () => {
      expect(trivia_A.getCountries().length).toEqual(trivia_B.getCountries().length)
    });    


    it('should generate flag lists with the same lenght', () => {
      expect(trivia_A.getFlags().length).toEqual(trivia_B.getFlags().length)
    });    


    it('should generate country and flag lists that have the same lenght', () => {
      expect(trivia_A.getCountries().length).toEqual(trivia_A.getFlags().length)
      expect(trivia_B.getCountries().length).toEqual(trivia_B.getFlags().length)
    });    


    it('should generate country and flag lists that match the country id', () => {
      const countriesId = trivia_A.getCountries().map(country => country.id).sort()
      const flagsId = trivia_A.getFlags().map(flag => flag.country_id).sort()

      expect(countriesId).toStrictEqual(flagsId)
    });    

    it('should gererate different countries orders', () => {
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(JSON.stringify(new Trivia(triviaProps).getCountries()))
      }
      expect(results.size).toBeGreaterThan(maxNumberOfCombinations - 1)
    });    

    it('should gererate different flags orders', () => {
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(JSON.stringify(new Trivia(triviaProps).getFlags()))
      }
      expect(results.size).toBeGreaterThan(maxNumberOfCombinations - 1)
    });    

  });


  describe('isCorrect', () => {

    let trivia: Trivia

    beforeEach(() => {
      trivia = new Trivia(triviaProps);
    });

    it('should return true when question and answer have same country id', () => {

      const brazil: GeoItem = {
        country: { id: 1, name: 'Brazil' },
        flag: { country_id: 1, file: 'brazil.svg', description: '', info: '' }
      };
      
      expect(trivia.doesMatch(brazil.country, brazil.flag)).toBe(true);
    });

    it('should return false when question and answer have different country ids', () => {

      const brazil: GeoItem = {
        country: { id: 1, name: 'Brazil' },
        flag: { country_id: 1, file: 'brazil.svg', description: '', info: '' }
      };

      const argentina: GeoItem = {
        country: { id: 2, name: 'Argentina' },
        flag: { country_id: 2, file: 'argentina.svg', description: '', info: '' }
      };
      
      expect(trivia.doesMatch(brazil.country, argentina.flag)).toBe(false);
    });
  });




});