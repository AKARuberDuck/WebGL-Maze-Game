# 🌀 WebGL Maze Game

A 3D browser-based maze game powered by **Three.js**, **Cannon-es**, and **WebGL**. Navigate a rolling ball through a procedurally generated maze—no server or database required. Fully playable online!

🎮 **Play now:** [WebGL Maze Game](https://akaruberduck.github.io/WebGL-Maze-Game/)

---

## 🚀 Features

- Procedurally generated 3D mazes
- Physics-based rolling and jumping
- Arrow key movement and space bar jump
- Collision detection and gravity
- Particle effects for jump and landing
- Live timer, score tracking, and lives counter
- Responsive start and game over menus
- Auto-deployed with GitHub Actions

---

## 🕹 Controls

| Key         | Action               |
|-------------|----------------------|
| Arrow Keys  | Roll the ball        |
| Space Bar   | Jump                 |

---

## 🛠 Tech Stack

- [Three.js](https://threejs.org/) – 3D rendering
- [Cannon-es](https://github.com/pmndrs/cannon-es) – Physics engine
- [Vite](https://vitejs.dev/) – Lightning-fast frontend tooling
- GitHub Pages + GitHub Actions – Continuous deployment

---

## 🧱 Project Structure

WebGL-Maze-Game/ ├─ public/ # Static assets (if needed) ├─ js/ # Game logic modules ├─ index.html ├─ style.css ├─ vite.config.js ├─ package.json └─ .github/workflows/ # GitHub Actions deployment


---

## 📦 Installation (Optional)

If you're working locally with Node.js:

```bash
npm install
npm run dev     # Start dev server
npm run build   # Build for production
🤖 Auto Deployment
This project is automatically built and deployed using GitHub Actions:

Every push to main triggers a workflow that:

Installs dependencies

Builds the game using Vite

Deploys to GitHub Pages (gh-pages branch)

You can check deployment status under the Actions tab.

🌍 License
MIT License © 2025 AKARuberDuck
