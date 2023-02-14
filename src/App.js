import OpeningModal from './OpeningModal';
import { useState, useEffect } from 'react';
import './App.css';
import './darkMode.css';
import BackgroundTimer from './BackgroundTimer';

function App() {
  // theme state for light/dark mode
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light'){
      setTheme('dark')
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <OpeningModal />
      <p>Testing light/dark mode</p>
      <div className='toggleSlot'>
        <label htmlFor="themeToggle" className='label'>
          <input type="checkbox" name="themeToggle" id="themeToggle" className="toggleCheckbox" onChange={toggleTheme}></input>
          <div className='toggleSlider'></div>
        </label>
      </div>
      <div>
        <BackgroundTimer/>
      </div>
    </div>
  );
}

export default App;
