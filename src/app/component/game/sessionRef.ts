import { GameSession } from './gameSession';

let activeSession: GameSession | null = null;

export function setGameSession(session: GameSession): void {
  activeSession = session;
}

export function getGameSession(): GameSession {
  if (!activeSession) {
    throw new Error('Game session is not started');
  }
  return activeSession;
}
