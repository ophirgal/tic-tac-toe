import './App.css';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  return (
    <section className="app">
      <header>
        <Header />
      </header>
      <main>
        <Board />
      </main>
    </section>
  );
}

export default App;
