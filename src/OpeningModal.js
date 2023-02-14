import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import firebase from "./firebase";
import {getDatabase, onValue, ref} from "firebase/database"

const OpeningModal = () => {

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

    }, []);

    const chooseTimer = () => {
        Swal.fire({
            title: 'Timer length:',
            input: 'select',
            inputOptions: {
                1: '2',
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
            console.log(promptData)
            setPrompt(promptData[Math.floor(Math.random() * promptData.length)]);
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
            if(result.value) {
                setPrompt(result.value)
                chooseTimer()
            } else {
                getPrompt("Oops! Missing input!\nNo worries :)")
            }
        })  
    }

    return (
        <h2>hello!</h2>
        // <MainWritingForm timer={timer} prompt={prompt} />
    )
}

export default OpeningModal;