# Arquitetura do Pacote Core

## Visão Geral

Este documento descreve a arquitetura do pacote `@core`, explicando as decisões de design, padrões utilizados e melhores práticas aplicadas.

---

## Camadas da Arquitetura

```
┌─────────────────────────────────────┐
│   API Pública (Game)                │ ← Application Service / Facade
│   - Recebe/retorna DTOs (RO types)  │
│   - Orquestra casos de uso          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Domínio (GameEngine)              │ ← Business Logic
│   - Trabalha com entidades ricas    │
│   - Contém regras de negócio        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Entidades (Question, Answer)      │ ← Domain Entities
│   - Comportamento rico              │
│   - Encapsulamento de estado        │
└─────────────────────────────────────┘
```

---

## Padrões Arquiteturais Aplicados

### 1. **Application Service (DDD)**

A classe `Game` atua como Application Service:

```typescript
export class Game {
    // Orquestra casos de uso
    // Traduz DTOs ↔ Entidades
    // Não contém lógica de negócio
    
    getQuestions(): QuestionRO[] {
        return this.engine.getAllQuestions().map(q => q.toJSON());
    }
}
```

**Responsabilidades:**
- Orquestração de casos de uso
- Tradução entre DTOs e entidades de domínio
- Coordenação de transações e persistência
- Interface pública do pacote

### 2. **Facade Pattern (GoF)**

```
Cliente → Facade → Subsistemas complexos
           ↑         ↑
         Game    GameEngine, Question, Answer
```

**Benefícios:**
- Interface simplificada para o consumidor
- Esconde complexidade interna
- Reduz acoplamento

### 3. **Anti-Corruption Layer (DDD)**

```
Mundo Externo (JSON/HTTP) → ACL → Domínio Rico
                             ↑
                           Game
```

**Propósito:**
- Protege domínio de influências externas
- Traduz entre contextos diferentes
- Mantém integridade do modelo de domínio

### 4. **Hexagonal Architecture (Ports & Adapters)**

```
        ┌─────────────┐
        │    Game     │ ← Port (interface pública)
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │ GameEngine  │ ← Core (domínio)
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │ GameAdapter │ ← Adapter (infraestrutura)
        └─────────────┘
```

---

## Por que essa Arquitetura é Correta

### ✅ **1. Separation of Concerns**

```typescript
// Game: tradução e orquestração
getQuestions(): QuestionRO[] {
    return this.engine.getAllQuestions().map(q => q.toJSON());
}

// GameEngine: lógica de negócio
validateAnswer(question: Question, answer: Answer): boolean {
    // regras complexas aqui
}
```

### ✅ **2. Encapsulamento**

```typescript
// Consumidor nunca vê Question (entidade rica)
const questions: QuestionRO[] = game.getQuestions();
questions[0].attempted(); // ❌ Não existe - método não exposto

// Apenas Game e GameEngine conhecem Question
```

### ✅ **3. Evolução Independente**

```typescript
// Mudar domínio sem quebrar API pública
class Question {
    // Adicionar novo campo
    private difficulty: number;
}

// QuestionRO não precisa mudar
interface QuestionRO {
    id: string;
    text: string;
    // difficulty não exposto
}
```

### ✅ **4. Testabilidade**

```typescript
// Testar domínio isoladamente
test('Question.attempted increases attempts', () => {
    const q = new Question(...);
    q.attempted();
    expect(q.getAttempts()).toBe(1);
});

// Testar API pública
test('Game.validateAnswer returns boolean', () => {
    const game = await Game.create(...);
    const result = game.validateAnswer('q1', 'a1');
    expect(typeof result).toBe('boolean');
});
```

---

## Estrutura de Camadas

### **Camada Pública (Exposta)**

```typescript
// Game.ts - Application Service
export class Game {
    // Recebe/retorna apenas primitivos e RO types
    validateAnswer(questionId: string, answerId: string): boolean
    getQuestions(): QuestionRO[]
    nextQuestion(): QuestionRO | null
}
```

**Características:**
- Única classe exportada publicamente
- API estável e versionada
- Trabalha apenas com DTOs (Read-Only types)

### **Camada de Domínio (Interna)**

```typescript
// GameEngine.ts - Business Logic
class GameEngine {
    // Trabalha com entidades ricas
    validateAnswer(question: Question, answer: Answer): boolean
    nextQuestion(): Question | null
}

// Question.ts - Domain Entity
class Question {
    // Comportamento rico
    attempted(): void
    hit(): void
    isHit(): boolean
}
```

**Características:**
- Não exportada publicamente
- Contém regras de negócio
- Entidades com comportamento rico

### **Camada de Dados (DTOs)**

```typescript
// questionRO.ts - Data Transfer Objects
export interface QuestionRO {
    readonly id: string
    readonly text: string
    readonly attempts: number
    readonly hit: boolean
}
```

**Características:**
- Apenas dados (sem comportamento)
- Imutável (readonly)
- Serializável (JSON)

---

## Comparação com Frameworks Populares

### **NestJS (Node.js)**

```typescript
@Controller('games')
export class GameController {  // ← Apresentação
    constructor(private gameService: GameService) {}  // ← Application Service
}

@Injectable()
export class GameService {  // ← Nossa classe Game
    validateAnswer(dto: AnswerDTO): boolean {
        const question = this.repo.find(...);  // ← Domínio
        return question.validate(dto.answerId);
    }
}
```

### **Spring Boot (Java)**

```java
@RestController
public class GameController {
    @Autowired
    private GameApplicationService gameService;  // ← Nossa classe Game
}

@Service
public class GameApplicationService {  // ← Application Service
    public QuestionDTO getQuestions() {
        List<Question> questions = gameEngine.getQuestions();
        return questions.stream()
            .map(QuestionMapper::toDTO)  // ← Tradução
            .collect(toList());
    }
}
```

### **Clean Architecture (Uncle Bob)**

```
┌─────────────────────────────────────┐
│   Controllers (HTTP/CLI)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Use Cases (Application Services)  │ ← Game
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Entities (Domain)                 │ ← Question, Answer
└─────────────────────────────────────┘
```

---

## Quando Usar essa Arquitetura

### ✅ **Use quando:**

1. **Domínio Rico**: Entidades têm comportamento (não são apenas dados)
2. **Regras Complexas**: Validação, cálculos, lógica de negócio
3. **Pacote Público**: Precisa controlar o que expõe
4. **Persistência**: Precisa serializar/deserializar
5. **Evolução**: API pública deve ser estável

### ❌ **Não use quando:**

1. **CRUD Simples**: Apenas operações básicas de banco
2. **Domínio Anêmico**: Entidades são só dados
3. **Protótipo**: Velocidade > arquitetura
4. **Aplicação Pequena**: Overhead desnecessário

---

## Fluxo de Dados

### **Entrada (Cliente → Domínio)**

```typescript
// 1. Cliente chama API pública com DTOs
const result = game.validateAnswer(questionId, answerId);

// 2. Game traduz IDs para entidades
const question = engine.findQuestionById(questionId);
const answer = engine.findAnswerById(answerId);

// 3. GameEngine executa lógica de negócio
const isCorrect = question.validate(answer);
if (isCorrect) question.hit();

// 4. Retorna primitivo
return isCorrect;
```

### **Saída (Domínio → Cliente)**

```typescript
// 1. Cliente solicita dados
const questions = game.getQuestions();

// 2. Game busca entidades do domínio
const domainQuestions = engine.getAllQuestions();

// 3. Serializa para DTOs
const dtos = domainQuestions.map(q => q.toJSON());

// 4. Retorna DTOs imutáveis
return dtos;
```

---

## Princípios SOLID Aplicados

### **S - Single Responsibility**
- `Game`: Orquestração e tradução
- `GameEngine`: Lógica de negócio
- `Question`: Comportamento de questão

### **O - Open/Closed**
- Adicionar novos tipos de jogo sem modificar código existente
- `QuestionFactory` extensível

### **L - Liskov Substitution**
- `FlagQuestionFactory` e `CountryQuestionFactory` substituíveis

### **I - Interface Segregation**
- `QuestionRO` expõe apenas o necessário
- `GameAdapter` interfaces específicas

### **D - Dependency Inversion**
- `Game` depende de `GameAdapter` (abstração)
- Implementação injetada em runtime

---

## Encapsulamento e Proteção

### **Problema: Vazamento de Estado**

```typescript
// ❌ ERRADO - expõe referência mutável
getSession(): GameSession {
    return this.session;
}

// Cliente pode modificar
const session = engine.getSession();
session.questions[0].attempted(); // ⚠️ Modifica estado interno
```

### **Solução: Métodos Específicos**

```typescript
// ✅ CORRETO - métodos específicos
getAllQuestions(): Question[] {
    return [...this.session.questions]; // Clone
}

findQuestionById(id: string): Question | undefined {
    return this.session.questions.find(q => q.getId() === id);
}
```

### **Solução: DTOs Imutáveis**

```typescript
// ✅ CORRETO - retorna DTOs
getQuestions(): QuestionRO[] {
    return this.engine.getAllQuestions().map(q => q.toJSON());
}

// Cliente recebe dados, não referências
const questions = game.getQuestions();
questions[0].attempted(); // ❌ Erro: método não existe
```

---

## Serialização e Persistência

### **toJSON() nas Entidades**

```typescript
class Question {
    toJSON(): QuestionRO {
        return {
            id: this.geoItemId,
            text: this.text,
            image: this.image ?? undefined,
            hint: this.hint ?? undefined,
            attempts: this.status.attempts,
            hit: this.status.hit
        };
    }
}
```

**Vantagens:**
- Entidade conhece sua representação externa
- Centralizado em um lugar
- Fácil de manter

**Alternativa: Mapper Dedicado**

```typescript
class GameMapper {
    static toQuestionRO(q: Question): QuestionRO {
        return {
            id: q.getId(),
            text: q.getText(),
            attempts: q.getAttempts(),
            hit: q.isHit()
        };
    }
}
```

---

## Exportações do Pacote

### **index.ts - Controle de API Pública**

```typescript
// ✅ Exportar apenas o necessário
export { Game } from './Game';
export type { GameAdapter } from './GameAdapter';

// ❌ NÃO exportar classes internas
// export { Question } from './Question';  // NUNCA!
// export { GameEngine } from './GameEngine';  // NUNCA!
```

### **types/index.ts - DTOs Públicos**

```typescript
export type { QuestionRO, AnswerRO } from './questionRO';
export type { GameConfig, GameType, Difficulty } from './gameConfig';
```

---

## Nomenclatura de Padrões

Esta camada de tradução tem vários nomes na literatura:

| Nome | Contexto | Referência |
|------|----------|------------|
| **Application Service** | Domain-Driven Design | Eric Evans |
| **Facade** | Design Patterns | Gang of Four |
| **Use Case** | Clean Architecture | Uncle Bob |
| **Anti-Corruption Layer** | DDD | Eric Evans |
| **Port** | Hexagonal Architecture | Alistair Cockburn |

Todos descrevem o mesmo conceito: **uma camada que traduz entre o mundo externo e o domínio interno**.

---

## Benefícios da Arquitetura

### **1. Manutenibilidade**
- Mudanças no domínio não afetam API pública
- Mudanças na API não afetam domínio

### **2. Testabilidade**
- Domínio testável isoladamente
- API testável com mocks

### **3. Segurança**
- Estado interno protegido
- Impossível modificar entidades de fora

### **4. Documentação**
- API pública clara e explícita
- DTOs autodocumentados

### **5. Versionamento**
- API pública versionável
- Domínio evolui independentemente

---

## Referências

- **Domain-Driven Design** - Eric Evans
- **Clean Architecture** - Robert C. Martin (Uncle Bob)
- **Design Patterns** - Gang of Four
- **Hexagonal Architecture** - Alistair Cockburn
- **SOLID Principles** - Robert C. Martin

---

## Conclusão

A arquitetura do pacote `@core` segue padrões estabelecidos e amplamente utilizados na indústria. A classe `Game` atua como **Application Service / Facade**, protegendo o domínio rico (`Question`, `Answer`, `GameEngine`) e expondo apenas uma API pública limpa através de DTOs imutáveis (`QuestionRO`, `AnswerRO`).

Esta abordagem garante:
- ✅ Encapsulamento forte
- ✅ Evolução independente
- ✅ Testabilidade
- ✅ Manutenibilidade
- ✅ API pública estável

É a arquitetura correta para um pacote público que precisa proteger seu domínio rico e fornecer uma interface estável para consumidores externos.
