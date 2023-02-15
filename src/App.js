// import OpeningModal from './OpeningModal';
import { useState, useEffect } from 'react';
import './App.css';
import './darkMode.css';
import {Link, Routes, Route} from "react-router-dom"
import BackgroundTimer from './components/BackgroundTimer';
import Swal from 'sweetalert2';
import firebase from './firebase';
import {push, getDatabase, onValue, ref} from "firebase/database"

function App() {
  // theme state for light/dark mode
  const [theme, setTheme] = useState('light');
  const [resetWatch, setResetWatch] = useState(false);

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

  const [prompt, setPrompt] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect( () => {

      const getStarted = Swal.mixin({
          customClass: {
              cancelButton: 'btn btn-danger',
              confirmButton: 'btn btn-success',
          },
          buttonsStyling: true
      })
  
      getStarted.fire({
          title: 'Welcome to your writing room!',
          text: "Want to use a writing prompt?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: `Definitely!`,
          cancelButtonText: `Nah, I'm good!`,
          reverseButtons: false

      }).then( (result) => {
          if (result.isConfirmed) {
              const promptChoice = Swal.mixin({
                  customClass: {
                      cancelButton: 'btn btn-danger',
                      confirmButton: 'btn btn-success',
                  },
                  buttonsStyling: true
              })
          
              promptChoice.fire({
                  title: 'Awesome!',
                  text: "Want us to provide one for you?",
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: `Yes please!`,
                  cancelButtonText: `Can I make my own?`,
                  reverseButtons: false
              }).then( (result) => {
                  if (result.isConfirmed) {
                      getPrompt("Sounds great!");
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      setNewPrompt()
                  }
              })   
          } else if (result.dismiss === Swal.DismissReason.cancel) {
              chooseTimer();
          }
      })    

  }, ["", resetWatch]);

  const chooseTimer = () => {
      Swal.fire({
          title: 'Timer length:',
          input: 'select',
          inputOptions: {
              2: '2',
              5: '5',
              10: '10',
              20: '20',
              30: '30'
          },
          inputPlaceholder: 'How many minutes?',
          inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value) {
                  resolve()
                } else {
                  resolve('Please select a value!')
                }
              })
          }
      }).then((result) => {
          Swal.fire(`You have selected: ${result.value} minutes!`);
          setTimer(Number(result.value) * 60);
      })
  }

  const getPrompt = (reason) => {
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      onValue(dbRef, (response) => {
          const promptData = [];
          const data = response.val();
          for (let key in data) {
              promptData.push(data[key])
          }
          setPrompt(promptData[Math.floor(Math.random() * promptData.length)]);
          console.log("triggered")
      })
      Swal.fire(
          `${reason}`,
          'A prompt shall be provided for you :)',
          'info'
      ).then(() => {
          chooseTimer();
      })
  }

  const setNewPrompt = () => {
      Swal.fire({
          input: 'textarea',
          inputLabel: 'Of course you can!',
          inputPlaceholder: 'Enter your custom prompt here...',
          inputAttributes: {
            'aria-label': 'Enter your custom prompt here...'
          },
      }).then((result) => {
          console.log(result);
          setPrompt(result.value)
          chooseTimer()
          addPrompt(result.value)
      })  
  }

  const addPrompt = (newPrompt) => {
    console.log(newPrompt)
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, newPrompt);
  }

  const handleReset = () => {
    setPrompt("");
    setTimer(0);
    setResetWatch(!resetWatch)
  };

  return (
    <div className={`App ${theme}`}>
      <div className='toggleSlot'>
        <label htmlFor="themeToggle" className='label'>
          <input type="checkbox" name="themeToggle" id="themeToggle" className="toggleCheckbox" onChange={toggleTheme}></input>
          <div className='toggleSlider'></div>
        </label>
      </div>
      <Link to={"/"}>
        <button onClick={handleReset}>Reset?</button>
      </Link>
      <Routes>
        <Route path="/" element={
          <Link to={"/main"}>
            <button>Ready to Rock!</button>
          </Link>}
        />
        <Route path="/main" element={<BackgroundTimer timer={timer} prompt={prompt}/>}/>
      </Routes>
      
      <p>Testing light/dark mode</p>
      <div>
      </div>
    </div>
  );
}

export default App;
