export function generateMaze(width, height) {
  const maze = Array(height).fill().map(() => Array(width).fill(1));

  function carve(x, y) {
    const dirs = shuffle([[0,1], [1,0], [0,-1], [-1,0]]);
    for (const [dx, dy] of dirs) {
      const nx = x + dx * 2, ny = y + dy * 2;
      if (ny >= 0 && ny < height && nx >= 0 && nx < width && maze[ny][nx] === 1) {
        maze[y + dy][x + dx] = 0;
        maze[ny][nx] = 0;
        carve(nx, ny);
      }
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  maze[1][1] = 0;
  carve(1, 1);
  return maze;
}
