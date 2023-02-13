import {useState, useEffect} from 'react';

function BackgroundTimer() {
    // sets initial value for inactivity timer to 15 seconds
    const [counter, setCounter] = useState(15)
    // sets initial value for user activity to false
    const [userActivity, setUserActivity] = useState(false);

    useEffect(()=>{
        setUserActivity(false)
        if (userActivity==true){
          //pauses current timeout when user activity is detected
          clearTimeout()
          //resets background timer to 15 seconds
          setCounter(15)
        } else if (counter > 0){
          //counts down by 1 second
          setTimeout(() => setCounter(counter - 1), 1000)
          console.log(counter)
        } else {
          alert("Hi!")
        }
    }, [counter])

    let handleChange = (event)=>{
      //update the state of user activity
      setUserActivity(true)
  }

  return (
    <div>
      <div>
        <textarea onChange={handleChange}></textarea>
      </div>
    </div>
  );
}

export default BackgroundTimer;
