import { FlagQuestionFactory } from "../QuestionFactoy";
import { Question, Answer } from "../Question";

// Classe auxiliar para testar métodos privados
class TestableQuestionFactory extends FlagQuestionFactory {
    public testFilterHitQuestions(questions: Question[]): Question[] {
        return this.filterHitQuestions(questions);
    }
}

describe('QuestionFactory', () => {
    
    let factory: FlagQuestionFactory;
    let questions: Question[];

    beforeEach(() => {
        factory = new FlagQuestionFactory();
        
        // Criar questões de teste
        questions = [
            new Question({
                geoItemId: "1",
                text: "Question 1",
                answer: new Answer({ geoItemId: "1", text: "Answer 1" }),
                status: { attempts: 0, hit: false }
            }),
            new Question({
                geoItemId: "2",
                text: "Question 2",
                answer: new Answer({ geoItemId: "2", text: "Answer 2" }),
                status: { attempts: 0, hit: false }
            }),
            new Question({
                geoItemId: "3",
                text: "Question 3",
                answer: new Answer({ geoItemId: "3", text: "Answer 3" }),
                status: { attempts: 0, hit: false }
            })
        ];
    });

    describe('findNextQuestion', () => {

        it('should return null when all questions are hit', () => {
            questions.forEach(q => q.hit());
            
            const result = factory.findNextQuestion(questions);
            
            expect(result).toBeNull();
        });

        it('should return null when questions array is empty', () => {
            const result = factory.findNextQuestion([]);
            
            expect(result).toBeNull();
        });

        it('should return a question when at least one is not hit', () => {
            const result = factory.findNextQuestion(questions);
            
            expect(result).not.toBeNull();
            expect(questions).toContain(result);
        });

    });

    describe('filterHitQuestions', () => {
        
        let testableFactory: TestableQuestionFactory;

        beforeEach(() => {
            testableFactory = new TestableQuestionFactory();
        });

        it('should return empty array when all questions are hit', () => {
            questions.forEach(q => q.hit());
            
            const result = testableFactory.testFilterHitQuestions(questions);
            
            expect(result).toEqual([]);
        });

        it('should return all questions when none are hit', () => {
            const result = testableFactory.testFilterHitQuestions(questions);
            
            expect(result).toEqual(questions);
            expect(result.length).toBe(3);
        });

        it('should return only non-hit questions', () => {
            questions[0].hit();
            questions[2].hit();
            
            const result = testableFactory.testFilterHitQuestions(questions);
            
            expect(result).toEqual([questions[1]]);
            expect(result.length).toBe(1);
        });

        it('should return empty array when input is empty', () => {
            const result = testableFactory.testFilterHitQuestions([]);
            
            expect(result).toEqual([]);
        });

    });

});
