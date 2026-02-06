# Análise da Arquitetura - Pacote @core

## ✅ **PONTOS POSITIVOS:**

### 1. **Separação de Responsabilidades**
- GameEngine (lógica), Game (fachada), QuestionFactory (criação)
- Adapter pattern para dependências externas

### 2. **Dependency Injection**
- GameAdapter como abstração
- Repositórios injetados

### 3. **Factory Pattern**
- QuestionFactory com estratégias por tipo de jogo

### 4. **Encapsulamento**
- Campos privados em Question/Answer
- Métodos de mutação internos

### 5. **Read-Only Types**
- QuestionRO/AnswerRO para exposição pública

---

## ❌ **PROBLEMAS CRÍTICOS:**

### 1. **Vazamento de Encapsulamento**
```typescript
// Game.ts - linha 59
validateAnswer(questionRO: QuestionRO, answerRO: AnswerRO): boolean { 
    const question = this.gameEngine.getSession().questions.find(...)
    // ❌ Expõe array mutável de Question
}
```
**Problema:** `getSession()` retorna referência direta ao estado interno.

**Solução:**
```typescript
// GameEngine.ts
getSession(): Readonly<Omit<GameSession, 'questions'>> {
    return { ...this.session, questions: undefined };
}

findQuestionById(id: string): Question | undefined {
    return this.session.questions.find(q => q.getId() === id);
}
```

### 2. **Inconsistência de Tipos**
```typescript
// gameSession.ts
questions: Question[]  // ❌ Tipo de domínio em tipo de persistência
```
**Problema:** GameSession mistura domínio com persistência.

**Solução:**
```typescript
// Para persistência
export interface GameSessionData {
    questions: QuestionRO[];  // Dados serializáveis
}

// Para domínio (interno)
interface GameSessionRuntime {
    questions: Question[];  // Entidades ricas
}
```

### 3. **Método Incompleto**
```typescript
// Game.ts - linha 59
validateAnswer(...): boolean { 
    const isValidAnswer = this.gameEngine.submitAnswer(question, answer)
    // ❌ Não retorna nada!
}
```

**Solução:**
```typescript
validateAnswer(questionRO: QuestionRO, answerRO: AnswerRO): boolean { 
    const question = this.gameEngine.findQuestionById(questionRO.id);
    const answer = this.gameEngine.findAnswerById(answerRO.id);
    if (!question || !answer) return false;
    return this.gameEngine.submitAnswer(question, answer);
}
```

### 4. **Exportações Inseguras**
```typescript
// index.ts
export * from './Game'
export * from './GameAdapter'
// ❌ Não exporta tipos RO, expõe tudo
```

**Solução:**
```typescript
export { Game } from './Game';
export type { GameAdapter } from './GameAdapter';
export type { QuestionRO, AnswerRO } from '../types/questionRO';
// NÃO exporta Question, Answer, GameEngine
```

### 5. **Acoplamento Circular**
```typescript
// types/gameSession.ts
import { Question } from '@/core/Question';  // ❌ types depende de core

// core/Question.ts  
import { QuestionRO } from '../types/questionRO';  // core depende de types
```

**Solução:** types não deve importar de core.

```typescript
// types/gameSession.ts
export interface GameSessionData {
    questions: QuestionRO[];  // Usa DTO, não entidade
}
```

---

## ⚠️ **PROBLEMAS DE DESIGN:**

### 6. **Game é Fachada Fraca**
```typescript
// Game apenas delega tudo para GameEngine
getQuestions(): QuestionRO[] {       
    return this.gameEngine.getSession().questions.map(...)
}
```
**Questão:** Game adiciona valor ou é apenas proxy?

**Opções:**
- **A)** Remover Game, expor GameEngine diretamente
- **B)** Game controla fluxo (start/pause/end), GameEngine só lógica

**Recomendação:** Opção B - Game como Application Service

### 7. **QuestionFactory Faz Demais**
```typescript
abstract class QuestionFactory {
    abstract createQuestions(...)
    abstract validateAnswer(...)  // ❌ Validação não é criação
    findNextQuestion(...)          // ❌ Seleção não é criação
}
```

**Solução:**
```typescript
// Separar responsabilidades
interface QuestionFactory {
    createQuestions(geoItems: GeoItem[]): Question[];
}

interface AnswerValidator {
    validate(question: Question, answer: Answer): boolean;
}

interface QuestionSelector {
    selectNext(questions: Question[]): Question | null;
}
```

### 8. **Mutabilidade de Status**
```typescript
class Question {
    private readonly status: QuestionStatus  // ❌ readonly, mas objeto mutável
    
    attempted() { this.status.attempts++; }  // ✅ Funciona!
}
```

**Problema:** `readonly` não protege propriedades do objeto.

**Solução Opção 1 - Campos Primitivos:**
```typescript
class Question {
    private attempts = 0;
    private hit = false;
    
    attempted(): void {
        this.attempts++;
    }
}
```

**Solução Opção 2 - Imutável:**
```typescript
class Question {
    attempted(): Question {
        return new Question({ ...this, attempts: this.attempts + 1 });
    }
}
```

### 9. **Falta Validação**
```typescript
constructor(questionProps: QuestionProps) {
    this.geoItemId = questionProps.geoItemId  // ❌ Sem validação
    this.text = questionProps.text
}
```

**Solução:**
```typescript
constructor(props: QuestionProps) {
    if (!props.geoItemId) throw new Error('geoItemId required');
    if (!props.text?.trim()) throw new Error('text required');
    if (!props.answer) throw new Error('answer required');
    
    this.geoItemId = props.geoItemId;
    this.text = props.text;
    this.answer = props.answer;
}
```

### 10. **Naming Inconsistente**
```typescript
QuestionFactoy.ts  // ❌ Typo: Factory
geoItemId          // ❌ Mistura snake_case com camelCase
```

**Solução:**
- Renomear arquivo: `QuestionFactoy.ts` → `QuestionFactory.ts`
- Padronizar: `geoItemId` ou `geo_item_id` (escolher um padrão)

---

## 📋 **RECOMENDAÇÕES POR PRIORIDADE:**

### **🔴 CRÍTICO (Fazer Agora):**

#### 1. **Corrigir vazamento de encapsulamento**
```typescript
// GameEngine.ts
// ❌ Remover
getSession(): GameSession {
    return this.session;
}

// ✅ Adicionar métodos específicos
findQuestionById(id: string): Question | undefined {
    return this.session.questions.find(q => q.getId() === id);
}

findAnswerById(id: string): Answer | undefined {
    return this.answers.find(a => a.getId() === id);
}

getAllQuestions(): Question[] {
    return [...this.session.questions];
}
```

#### 2. **Completar método validateAnswer**
```typescript
// Game.ts
validateAnswer(questionRO: QuestionRO, answerRO: AnswerRO): boolean {
    const question = this.gameEngine.findQuestionById(questionRO.id);
    const answer = this.gameEngine.findAnswerById(answerRO.id);
    if (!question || !answer) return false;
    return this.gameEngine.submitAnswer(question, answer);  // ✅ Adicionar return
}
```

#### 3. **Corrigir index.ts**
```typescript
// core/index.ts
export { Game } from './Game';
export type { GameAdapter } from './GameAdapter';
// Não exportar Question, Answer, GameEngine
```

#### 4. **Quebrar dependência circular**
```typescript
// types/gameSession.ts
// ❌ Remover
import { Question } from '@/core/Question';

// ✅ Usar DTO
export interface GameSessionData {
    questions: QuestionRO[];
}
```

### **🟡 IMPORTANTE (Próxima Iteração):**

#### 5. **Separar responsabilidades de QuestionFactory**
Criar classes separadas para criação, validação e seleção.

#### 6. **Adicionar validações nos construtores**
Validar todos os campos obrigatórios nas entidades.

#### 7. **Renomear QuestionFactoy.ts → QuestionFactory.ts**
Corrigir typo no nome do arquivo.

#### 8. **Documentar API pública com JSDoc**
```typescript
/**
 * Validates if the provided answer is correct for the given question.
 * @param questionId - The ID of the question
 * @param answerId - The ID of the answer
 * @returns true if answer is correct, false otherwise
 */
validateAnswer(questionId: string, answerId: string): boolean
```

### **🟢 MELHORIAS (Refatoração Futura):**

#### 9. **Considerar imutabilidade para Question**
Avaliar se vale a pena tornar Question imutável.

#### 10. **Avaliar necessidade da classe Game**
Game está cumprindo seu papel como Application Service.

#### 11. **Adicionar Result types para erros**
```typescript
type Result<T, E> = 
    | { ok: true; value: T } 
    | { ok: false; error: E };

validateAnswer(id: string): Result<boolean, ValidationError>
```

---

## 📦 **Estrutura Ideal de Exportação:**

```typescript
// core/index.ts
export { Game } from './Game';
export type { GameAdapter } from './GameAdapter';

// types/index.ts  
export type { QuestionRO, AnswerRO } from './questionRO';
export type { GameConfig, GameType, Difficulty } from './gameConfig';

// Pacote público expõe apenas:
// - Game (classe)
// - GameAdapter (interface para DI)
// - Tipos RO (read-only)
// - Tipos de configuração
```

---

## 🎯 **Implementação Recomendada:**

### **Game.ts (Application Service)**
```typescript
export class Game {
    private constructor(private engine: GameEngine) {}

    static async create(config: GameConfig, adapter: GameAdapter): Promise<Game> {
        const engine = GameEngine.fromConfig(
            adapter.getGeoItemRepository(),
            adapter.getSessionRepository(),
            adapter.getTimer(),
            config
        );
        await engine.initialize();
        return new Game(engine);
    }

    // === API Pública (recebe/retorna apenas RO ou primitivos) ===
    
    getQuestions(): QuestionRO[] {
        return this.engine.getAllQuestions().map(q => q.toJSON());
    }

    nextQuestion(): QuestionRO | null {
        const q = this.engine.nextQuestion();
        return q ? q.toJSON() : null;
    }

    validateAnswer(questionId: string, answerId: string): boolean {
        return this.engine.validateAnswerById(questionId, answerId);
    }

    getAnswers(): AnswerRO[] {
        return this.engine.getAllAnswers().map(a => a.toJSON());
    }

    isGameOver(): boolean {
        return this.engine.isGameOver();
    }

    async save(): Promise<void> {
        const data = this.engine.toSessionData();
        await this.sessionRepo.save(data);
    }
}
```

### **GameEngine.ts (Domain Logic)**
```typescript
export class GameEngine {
    // ❌ Remover getSession() público
    
    getAllQuestions(): Question[] {
        return [...this.session.questions]; // Clone
    }

    getAllAnswers(): Answer[] {
        return [...this.answers];
    }

    findQuestionById(id: string): Question | undefined {
        return this.session.questions.find(q => q.getId() === id);
    }

    findAnswerById(id: string): Answer | undefined {
        return this.answers.find(a => a.getId() === id);
    }

    validateAnswerById(questionId: string, answerId: string): boolean {
        const question = this.findQuestionById(questionId);
        const answer = this.findAnswerById(answerId);
        if (!question || !answer) return false;
        return this.questionFactory.validateAnswer(question, answer);
    }

    toSessionData(): GameSessionData {
        return {
            config: this.session.config,
            score: this.session.score,
            questions: this.session.questions.map(q => q.toJSON())
        };
    }
}
```

---

## 📊 **Checklist de Qualidade:**

### **Encapsulamento:**
- [ ] Entidades não são exportadas publicamente
- [ ] Métodos de mutação não são acessíveis externamente
- [ ] Estado interno não vaza através de referências

### **Tipos:**
- [ ] DTOs separados de entidades de domínio
- [ ] Tipos de persistência não dependem de tipos de domínio
- [ ] Sem dependências circulares

### **API Pública:**
- [ ] Apenas Game e GameAdapter exportados
- [ ] Métodos públicos recebem/retornam apenas DTOs ou primitivos
- [ ] API documentada com JSDoc

### **Validação:**
- [ ] Construtores validam campos obrigatórios
- [ ] Métodos validam parâmetros
- [ ] Erros claros e informativos

### **Testes:**
- [ ] Domínio testável isoladamente
- [ ] API pública testável
- [ ] Cobertura adequada

---

## 📚 **Resumo:**

A arquitetura tem **boa base** (separação de responsabilidades, DI, patterns), mas precisa:

1. **Corrigir vazamentos de encapsulamento** (crítico)
2. **Completar implementações** (crítico)
3. **Ajustar exportações** (crítico)
4. **Quebrar dependências circulares** (crítico)
5. **Refatorar responsabilidades** (importante)
6. **Adicionar validações** (importante)

Após essas correções, o pacote estará pronto para ser exposto publicamente com segurança e manutenibilidade.
