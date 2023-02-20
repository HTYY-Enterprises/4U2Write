import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'
import {useRef} from 'react';
import jsPDF from 'jspdf';

function MainPage(props) {
    // sets initial value for inactivity timer to 15 seconds
    const [counter, setCounter] = useState(15)
    // sets initial value for user activity to false
    const [userActivity, setUserActivity] = useState(false);
    // sets initial value for main timer
    const [timer, setTimer] = useState(props.timer)
    // sets prompt
    const [prompt, setPrompt] = useState("")
    // state variable to capture user input
    const [userInput, setUserInput] = useState("");
    // timer conversion
    const [convertedTime, setConvertedTime] = useState("");
    
    useEffect(() => {
      setTimer(props.timer);
      setPrompt(props.prompt);
    },[props.prompt, props.timer])

    useEffect(()=>{
        if (userActivity===true){
          // pauses current timeout when user activity is detected
          clearTimeout()
          // resets background timer to 15 seconds
          setCounter(15)
        } else if (timer===0) {
          // alert for when time is up
          // inactivity and main timer no longer count down
          Swal.fire({
            title: `Time's up!`,
            icon: 'success',
            confirmButtonText: `Confirm`
          })
        } else if (counter > 0){
          // convert timer from s to mm:ss
          convertTime(timer)
          // background timer: counts down by 1 second
          setTimeout(() => setCounter(counter - 1), 1000)
          // main timer: counts down by 1 second
          setTimeout(() => setTimer(timer - 1), 1000)
        } else {
          // test alert for when counter reaches 0
          Swal.fire({
            title: `Don't stop now!`,
            text: `Keep writing - you got this!`,
            icon: 'warning',
            confirmButtonText: `I'm Ready!`
          }).then(()=> {
            // resets counter after alert is closed
            setCounter(15)
          })
        }
        console.log(counter)
        console.log(timer)
        console.log(userActivity)
        setUserActivity(false)
    }, [counter])

    const handleChange = (event) =>{
      // update the state of user activity
      setUserActivity(true)
      setUserInput(event.target.value)
    }

    const convertTime = (time) => {
      const minutes = Math.floor(time % 3600 / 60).toString().padStart(2,'0');
      const seconds = Math.floor(time % 60).toString().padStart(2,'0');
      setConvertedTime(minutes + ":" + seconds);
    }

    // Save as PDF feature
    const userInputRef = useRef(null);

    const handleSavePdf = () => {
      const doc = new jsPDF ({
        format: 'a4',
        unit: 'px',
      })

      doc.html(userInputRef.current, {
        async callback(doc) {
          await doc.save('document');
        },
      });
    };

  return (
    <div >
      <h2 className='timer'>Time's ticking! {convertedTime}</h2>
      <div className='main'>
        <h2 className='promptLabel'>Prompt:</h2>
        <h2>{prompt}</h2>
        <h2>Write your story below...</h2>
        <textarea className=''
          onChange={handleChange}
          value={userInput}
          rows={10}
          cols={90}
          placeholder="Start typing..."
          ref={userInputRef}
        />
        <button onClick={handleSavePdf}>Save as PDF</button>
      </div>

    </div>
  );
}

export default MainPage;
