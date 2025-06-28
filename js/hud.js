let startTime, score = 0, lives = 3;

export function resetHUD() {
  startTime = Date.now();
  score = 0;
  lives = 3;
}

export function updateHUD() {
  const time = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('timer').textContent = `Time: ${time}`;
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('lives').textContent = `Lives: ${lives}`;
}

export function addScore(points) {
  score += points;
}

export function loseLife() {
  lives--;
  if (lives <= 0) return true;
  return false;
}
