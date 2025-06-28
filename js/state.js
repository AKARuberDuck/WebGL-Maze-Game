export const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  GAMEOVER: 'gameover'
};

export let currentState = GameState.MENU;

export function setState(newState) {
  currentState = newState;

  document.getElementById('startScreen').classList.toggle('hidden', newState !== GameState.MENU);
  document.getElementById('hud').classList.toggle('hidden', newState !== GameState.PLAYING);
  document.getElementById('gameOverScreen').classList.toggle('hidden', newState !== GameState.GAMEOVER);
}
