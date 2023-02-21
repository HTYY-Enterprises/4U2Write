// Modules
import { useState, useEffect } from 'react';
import {Link, Routes, Route} from "react-router-dom"
import Swal from 'sweetalert2';
import firebase from './firebase';
import {push, getDatabase, ref, get} from "firebase/database"
// Components
import MainPage from './components/MainPage';
import Header from './components/Header';
import Instructions from './components/Instructions';
import Footer from './components/Footer';
// Assets & Styling
import './App.css';
import sun from './sun-svgrepo-com.svg';
import moon from './moon-svgrepo-com.svg';


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

  const chooseTimer = () => {
      Swal.fire({
          title: 'Timer length:',
          input: 'select',
          inputOptions: {
              2: '2',
              5: '5',
              10: '10',
              20: '20',
              30: '30',
              custom: 'custom'
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
          },
          allowOutsideClick: false
      }).then((result) => {
        if (result.value === `custom`) {
          Swal.fire({
            title: 'How many minutes would you like to write for?',
            input: 'text',
            inputLabel: 'Number of minutes:',
            showCancelButton: false,
            allowOutsideClick: false,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to write something!'
              } else if (isNaN(value)) {
                return 'You need to write a number!'
              }
            }
          }).then((result) => {
              Swal.fire(`You have chosen: ${result.value} minutes!`)
              setTimer(Number(result.value) * 60);
          })
        } else {
          Swal.fire(`You have selected: ${result.value} minutes!`)
          setTimer(Number(result.value) * 60);
          
        }
      })
  }

  const getPrompt = (reason) => {
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const promptData = [];
          const data = snapshot.val();
          for (let key in data) {
            promptData.push(data[key])
          }
          setPrompt(promptData[Math.floor(Math.random() * promptData.length)]);
        }
      })
      .catch((error) => {
        Swal.fire(`No prompts available:\n${error}`)
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
            'aria-label': 'Enter your custom prompt here...',
          allowOutsideClick: false
          },
      }).then((result) => {
          if (result.value) {
            setPrompt(result.value)
            chooseTimer()
            addPrompt(result.value)
          } else {
            const noPrompt = Swal.mixin({
              customClass: {
                  cancelButton: 'btn btn-danger',
                  confirmButton: 'btn btn-success',
              },
              buttonsStyling: true
            })
            noPrompt.fire({
              title: "Oops!  Didn't add a prompt!",
              text: "Want to try again?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Sure thing",
              cancelButtonText: "Nah, changed my mind",
              reverseButtons: false,
              allowOutsideClick: false
            }).then( (result) => {
              if (result.isConfirmed) {
                setNewPrompt();
              } else {
                noPrompt.fire({
                  title: "No problem!",
                  text: "Want to use one of ours?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Yes I do!",
                  cancelButtonText: "Nah, I'm good",
                  reverseButtons: false,
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.isConfirmed) {
                    getPrompt("Wonderful! A prompt shall be provided :)")
                  } else {
                    chooseTimer();
                  }
                })
            }
          })
        }
      })  
  }

  const addPrompt = (newPrompt) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, newPrompt);
  }

  const handleReset = () => {
    setPrompt("");
    setTimer(0);
    setResetWatch(!resetWatch)
  };
  

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
          text: "4U2Write is here to give you a quiet and focused workspace for all your writing needs!  We find that using a writing prompt can jumpstart your process and get you started on the right foot - would you like one?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: `Definitely!`,
          cancelButtonText: `Nah, I'm good!`,
          reverseButtons: false,
          allowOutsideClick: false          
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
                  reverseButtons: false,
                  allowOutsideClick: false
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


  return (
    <div className={`App ${theme}`}>
      <Header />
      <div className='wrapper'>
        
        <Routes>
          <Route path="/" element={
            <>
              <Link to={"/main"}>
                <button className='start'>Ready to Rock!</button>
              </Link>
              <Instructions />
            </>
          }
          />
          <Route path="/main" element={<MainPage timer={timer} prompt={prompt}/>}/>
        </Routes>
        
        <Link to={"/"}>
          <button className='reset' onClick={handleReset}>Restart</button>
        </Link>
        <div className='toggleContainer'>
          <img src={sun} alt="sun" />
          <div className='toggleSlot'>
            <label htmlFor="themeToggle" className='label'>
              <input type="checkbox" name="themeToggle" id="themeToggle" className="toggleCheckbox" onChange={toggleTheme}></input>
              <div className='toggleSlider'></div>
            </label>
          </div>
          <img src={moon} alt="moon" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
