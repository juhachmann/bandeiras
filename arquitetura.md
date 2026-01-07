# Arquitetura do Jogo de Geografia

## 📋 Visão Geral

Sistema de jogo de trivia geográfica cross-platform (Web + Mobile) com core business logic compartilhado.

## 🏗️ Estrutura de Pastas

```
project-root/
├── shared/                    # Core business logic
│   ├── core/                 # GameEngine, Timer, etc
│   ├── types/                # Interfaces e tipos
│   ├── utils/                # Funções puras
│   ├── cache/                # Cache interfaces
│   ├── logging/              # Logger
│   ├── analytics/            # Metrics collector
│   ├── monitoring/           # Performance monitor
│   ├── accessibility/        # Accessibility manager
│   ├── sync/                 # Backup/sync manager
│   ├── content/              # Dynamic content manager
│   ├── __tests__/            # Core tests
│   └── package.json          # Package separado
│
├── web/                      # Next.js app
│   ├── app/                  # Next.js App Router
│   │   ├── game/
│   │   ├── leaderboard/
│   │   └── layout.tsx
│   ├── src/
│   │   ├── hooks/            # useGame (web version)
│   │   ├── components/       # React components
│   │   ├── repositories/     # WebApiRepository
│   │   ├── services/         # WebLogger, WebCache
│   │   └── analytics/        # Web-specific analytics
│   ├── __tests__/            # Web tests
│   └── package.json
│
└── mobile/                   # React Native app
    ├── src/
    │   ├── screens/          # Game, Leaderboard screens
    │   ├── hooks/            # useGame (mobile version)
    │   ├── components/       # RN components
    │   ├── repositories/     # SQLiteRepository
    │   ├── services/         # MobileLogger, MobileCache
    │   └── analytics/        # Mobile-specific analytics
    ├── __tests__/            # Mobile tests
    └── package.json
```

## 🎯 Configurações e Enums

### GameConfig
```typescript
enum GameType {
  FLAGS = 'flags',
  COUNTRIES = 'countries'
}

enum GeoLocation {
  BRAZIL = 'brazil',
  LATIN_AMERICA = 'latin_america',
  EUROPE = 'europe'
}

enum Difficulty {
  EASY = 'easy',      // 10 items
  MEDIUM = 'medium',  // 20 items
  HARD = 'hard'       // 50 items
}

interface GameConfig {
  gameType: GameType;
  location: GeoLocation;
  difficulty: Difficulty;
}
```

## 🎮 Modelos de Domínio

### GameSession
```typescript
interface GameSession {
  id: string;
  config: GameConfig;
  startTime: Date;
  endTime?: Date;
  score: number;
  totalQuestions: number;
  gameTime: number; // milliseconds
  answers: GameAnswer[];
}
```

### GameAnswer
```typescript
interface GameAnswer {
  questionId: string;
  selectedAnswerId: string;
  isCorrect: boolean;
  responseTime: number;
  timestamp: Date;
}
```

### Question
```typescript
interface Question {
  id: string;
  geoItem: GeoItem;
  options: GeoItem[];
}
```

## 🏛️ Core Classes (Platform Independent)

### 1. GameEngine (Orquestrador Principal)
```typescript
class GameEngine {
  constructor(
    config: GameConfig,
    repository: GeoItemRepository,
    sessionRepository: GameSessionRepository,
    timer: GameTimer
  )
  
  // Lifecycle
  async initialize(): Promise<void>
  async startGame(): Promise<void>
  async endGame(): Promise<GameSession>
  
  // Game Flow
  getCurrentQuestion(): Question | null
  async submitAnswer(selectedId: string): Promise<AnswerResult>
  isGameOver(): boolean
  
  // State
  getScore(): number
  getProgress(): GameProgress
  getSession(): GameSession
}
```

### 2. QuestionFactory (Strategy Pattern)
```typescript
abstract class QuestionFactory {
  abstract createQuestions(geoItems: GeoItem[]): Question[]
  abstract validateAnswer(question: Question, selectedId: string): boolean
  
  static create(gameType: GameType): QuestionFactory
}

class FlagQuestionFactory extends QuestionFactory {
  createQuestions(geoItems: GeoItem[]): Question[]
  validateAnswer(question: Question, selectedId: string): boolean
}

class CountryQuestionFactory extends QuestionFactory {
  createQuestions(geoItems: GeoItem[]): Question[]
  validateAnswer(question: Question, selectedId: string): boolean
}
```

### 3. GameTimer (Tempo e Performance)
```typescript
class GameTimer {
  // Game Timer
  startGame(): void
  endGame(): void
  getGameTime(): number
  
  // Question Timer
  startQuestion(): void
  endQuestion(): number
  getQuestionTime(): number
  
  // State
  isRunning(): boolean
  pause(): void
  resume(): void
}
```

### 4. ScoreCalculator (Pontuação)
```typescript
class ScoreCalculator {
  calculateQuestionScore(responseTime: number, isCorrect: boolean): number
  calculateFinalScore(answers: GameAnswer[]): number
  calculateAccuracy(answers: GameAnswer[]): number
  calculateAverageTime(answers: GameAnswer[]): number
}
```

## 🗄️ Data Layer (Repositories)

### GeoItemRepository
```typescript
interface GeoItemRepository {
  getByConfig(config: GameConfig): Promise<GeoItem[]>
  getByLocation(location: GeoLocation): Promise<GeoItem[]>
  getByDifficulty(difficulty: Difficulty): Promise<GeoItem[]>
}
```

### GameSessionRepository
```typescript
interface GameSessionRepository {
  save(session: GameSession): Promise<void>
  getHistory(userId: string): Promise<GameSession[]>
  getByGameType(userId: string, gameType: GameType): Promise<GameSession[]>
  getBestScores(gameType: GameType, limit: number): Promise<GameSession[]>
}
```

### UserStatsRepository
```typescript
interface UserStatsRepository {
  getUserStats(userId: string): Promise<UserStats>
  updateStats(userId: string, session: GameSession): Promise<void>
}
```

## 📊 Statistics & Analytics

### UserStats
```typescript
interface UserStats {
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  averageScore: number;
  bestScore: number;
  averageGameTime: number;
  statsByGameType: Map<GameType, GameTypeStats>;
}
```

### GameTypeStats
```typescript
interface GameTypeStats {
  gamesPlayed: number;
  bestScore: number;
  averageScore: number;
  accuracy: number;
}
```

### StatsCalculator
```typescript
class StatsCalculator {
  calculateUserStats(sessions: GameSession[]): UserStats
  calculateGameTypeStats(sessions: GameSession[]): GameTypeStats
  calculateTrends(sessions: GameSession[]): StatsTrend[]
}
```

## 🎯 Game State Management

### GameState
```typescript
interface GameState {
  status: GameStatus;
  currentQuestion: Question | null;
  score: number;
  progress: GameProgress;
  timeRemaining?: number;
}

enum GameStatus {
  NOT_STARTED = 'not_started',
  PLAYING = 'playing',
  PAUSED = 'paused',
  FINISHED = 'finished'
}
```

### GameProgress
```typescript
interface GameProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  percentage: number;
}
```

### AnswerResult
```typescript
interface AnswerResult {
  isCorrect: boolean;
  correctAnswer: GeoItem;
  score: number;
  responseTime: number;
}
```

## 🔧 Platform-Specific Implementations

### Repository Factory (Simples)
```typescript
class RepositoryFactory {
  static createGeoItemRepository(): GeoItemRepository {
    if (typeof window !== 'undefined') {
      return new WebApiRepository(); // Web
    } else {
      return new SQLiteRepository(); // Mobile
    }
  }
}
```

### Game Controller
```typescript
class GameController {
  constructor(private adapter: GameAdapter)
  
  async createGame(config: GameConfig): Promise<GameEngine>
  async loadGame(sessionId: string): Promise<GameEngine>
  async saveGame(engine: GameEngine): Promise<void>
  
  // Statistics
  async getUserStats(userId: string): Promise<UserStats>
  async getLeaderboard(gameType: GameType): Promise<GameSession[]>
}
```

## 🎣 Platform-Specific Hooks

### Web Hook
```typescript
// web/src/hooks/useGame.ts
export const useGame = (config: GameConfig) => {
  const [loading, setLoading] = useState(true);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  
  useEffect(() => {
    const initGame = async () => {
      const repository = new WebApiRepository();
      const sessionRepo = new WebSessionRepository();
      const timer = new WebTimer();
      
      const engine = new GameEngine(config, repository, sessionRepo, timer);
      await engine.initialize();
      
      setGameEngine(engine);
      setLoading(false);
    };
    
    initGame();
  }, [config]);
  
  return { loading, gameEngine };
};
```

### Mobile Hook
```typescript
// mobile/src/hooks/useGame.ts
export const useGame = (config: GameConfig) => {
  const [loading, setLoading] = useState(true);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  
  useEffect(() => {
    const initGame = async () => {
      const repository = new SQLiteRepository();
      const sessionRepo = new MobileSessionRepository();
      const timer = new MobileTimer();
      
      const engine = new GameEngine(config, repository, sessionRepo, timer);
      await engine.initialize();
      
      setGameEngine(engine);
      setLoading(false);
    };
    
    initGame();
  }, [config]);
  
  return { loading, gameEngine };
};
```

## 🏛️ Arquitetura em Camadas

```
┌─────────────────────────────────────┐
│           Platform Layer            │
│    (React Hooks / RN Hooks)        │
├─────────────────────────────────────┤
│         Game Controller             │
├─────────────────────────────────────┤
│           Core Game                 │
│  GameEngine | Timer | Calculator    │
├─────────────────────────────────────┤
│         Business Logic              │
│   QuestionFactory | StatsCalculator │
├─────────────────────────────────────┤
│          Data Layer                 │
│      Repositories | Adapters        │
└─────────────────────────────────────┘
```

## ✅ Vantagens da Arquitetura

1. **Core 100% reutilizável** - mesma lógica em ambas plataformas
2. **Fácil extensão** para novos tipos de jogo
3. **Testável** - cada classe tem responsabilidade única
4. **Configurável** - GameConfig controla todas as variações
5. **Histórico completo** - GameSession salva tudo automaticamente
6. **Timer preciso** - controle de tempo por pergunta e jogo
7. **Estatísticas robustas** - análise completa de performance
8. **Factory Pattern** - cria perguntas baseado no tipo de jogo

## 🚀 Fluxo de Execução

1. **Inicialização**: GameController cria GameEngine com dependências
2. **Setup**: GameEngine carrega dados via Repository
3. **Jogo**: QuestionFactory cria perguntas baseado no GameType
4. **Resposta**: GameEngine valida e calcula pontuação
5. **Timer**: GameTimer controla tempo de jogo e resposta
6. **Finalização**: GameSession é salva com estatísticas completas
7. **Análise**: StatsCalculator processa dados para relatórios

## 🧪 Sistema de Testes

### Estrutura de Testes
```typescript
// shared/__tests__/
├── unit/                     # Testes unitários
│   ├── GameEngine.test.ts
│   ├── Timer.test.ts
│   └── Calculator.test.ts
├── integration/              # Testes de integração
│   └── GameFlow.test.ts
└── fixtures/                 # Dados de teste
    └── mockData.ts
```

### Ferramentas
- **Jest** - Test runner principal
- **React Testing Library** - Testes de componentes React
- **@testing-library/react-native** - Testes RN
- **MSW** - Mock Service Worker para APIs
- **Detox** - E2E testing para React Native

## 📝 Sistema de Logs

### Logger Centralizado
```typescript
// shared/logging/logger.ts
class Logger {
  static error(error: Error, context: string, metadata?: any): void
  static gameEvent(event: string, data: any): void
  static performance(metric: string, value: number): void
}
```

### Implementações Platform-Specific
```typescript
// web/src/services/webLogger.ts - Console + Analytics
// mobile/src/services/mobileLogger.ts - File + Crash reporting
```

### Ferramentas
- **Winston** - Logging estruturado (Node.js/Web)
- **Flipper** - Debug logging para React Native
- **React Native Logs** - Console logging mobile

## 💾 Sistema de Cache

### Cache Interface
```typescript
// shared/cache/cacheService.ts
interface CacheService {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttl?: number): Promise<void>
  invalidate(pattern: string): Promise<void>
}

// Repository com Cache
class CachedGeoItemRepository implements GeoItemRepository {
  constructor(
    private repository: GeoItemRepository,
    private cache: CacheService
  ) {}
}
```

### Ferramentas
- **React Query/TanStack Query** - Cache de dados e sincronização
- **SWR** - Alternativa ao React Query
- **AsyncStorage** - Cache local React Native
- **MMKV** - Storage rápido para React Native

## 📊 Métricas e Monitoramento

### Metrics Collector
```typescript
// shared/analytics/metricsCollector.ts
class MetricsCollector {
  trackGameStart(config: GameConfig): void
  trackQuestionAnswered(responseTime: number, correct: boolean): void
  trackGameComplete(session: GameSession): void
  trackError(error: Error, context: string): void
}
```

### Performance Monitor
```typescript
// shared/monitoring/performanceMonitor.ts
class PerformanceMonitor {
  measureGameLoad(): void
  measureQuestionRender(): void
  measureAnswerProcessing(): void
}
```

### Ferramentas
- **Sentry** - Error tracking e performance
- **Mixpanel** - Analytics de eventos
- **Google Analytics** - Web analytics
- **React Native Performance** - Performance monitoring
- **Flipper** - Debugging e profiling

## ♿ Sistema de Acessibilidade

### Accessibility Manager
```typescript
// shared/accessibility/accessibilityManager.ts
interface AccessibilityOptions {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  screenReader: boolean;
  reducedMotion: boolean;
}

class AccessibilityManager {
  applySettings(options: AccessibilityOptions): void
  validateAccessibility(): AccessibilityReport
}
```

### Implementação
- **Deficiência visual:** Textos grandes, alto contraste, screen readers
- **Daltonismo:** Não usar apenas cores para diferenciar elementos
- **Deficiência motora:** Botões grandes, gestos alternativos
- **Deficiência auditiva:** Feedback visual em vez de sonoro

## 🔄 Conteúdo Dinâmico

### Content Manager
```typescript
// shared/content/contentManager.ts
class ContentManager {
  async checkForUpdates(): Promise<ContentUpdate[]>
  async applyUpdates(updates: ContentUpdate[]): Promise<void>
  async downloadNewAssets(): Promise<void>
  validateContentIntegrity(): boolean
}
```

### Casos de Uso
- **Configurações de jogo:** Tempo, pontuação, novos modos
- **Recursos visuais:** Novas bandeiras, mapas atualizados
- **Lógica de negócio:** Algoritmos de pontuação
- **Features experimentais:** A/B testing, features beta

## 💾 Sistema de Backup/Sync

### Data Sync Manager
```typescript
// shared/sync/dataSyncManager.ts
class DataSyncManager {
  async backup(userId: string): Promise<BackupData>
  async restore(userId: string, backup: BackupData): Promise<void>
  async syncAcrossDevices(userId: string): Promise<void>
  async autoBackup(userId: string): Promise<void>
}
```

### Funcionalidades
- **Backup automático:** Dados salvos na nuvem
- **Sincronização:** Mesmo progresso em todos dispositivos
- **Recuperação:** Restaurar dados após reinstalação
- **Merge inteligente:** Combinar dados de múltiplos dispositivos