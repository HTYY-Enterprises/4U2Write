import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'

function BackgroundTimer() {
    // sets initial value for inactivity timer to 15 seconds
    const [counter, setCounter] = useState(15)
    // sets initial value for user activity to false
    const [userActivity, setUserActivity] = useState(false);
    // sets initial value for main timer
    const [timer, setTimer] = useState(20)

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
          }).then((result)=> {
            // resets counter after alert is closed
            setCounter(15)
          })
        }
        setUserActivity(false)
    }, [counter])

    let handleChange = () =>{
      // update the state of user activity
      setUserActivity(true)
  }

  return (
    <div>
      {timer}
      <div>
        <textarea onChange={handleChange}></textarea>
      </div>
    </div>
  );
}

export default BackgroundTimer;
