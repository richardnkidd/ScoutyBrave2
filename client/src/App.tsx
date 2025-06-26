// This component is no longer used as the game runs purely with KAPLAY
// See client/src/game/main.js for the game implementation
export default function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#111',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Scouty The Brave</h1>
        <p>The game is now running with KAPLAY!</p>
        <p>Check the canvas above or refresh the page.</p>
      </div>
    </div>
  );
}
