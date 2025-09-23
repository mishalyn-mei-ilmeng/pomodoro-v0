import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import styles from './TimerInput.module.css'

// goal: create a timer input component to set work/break intervals

function TimerInput({ timers, onSetTimers }) {

    // local states to manage input values
    const [localTimers, setLocalTimers] = useState(timers); // validated input
    const [localInput, setLocalInput] = useState(timers); // allowing free typing

    // error state to manage input validation errors
    const [errors, setErrors] = useState({})

    // function to submit on button click
    const handleSubmit = () => {
        // if any timers have invalid input
        if (Object.keys(errors).length > 0) {
            // don't submit, component renders errors 
            return;
        }
        // pass the local state back to parent component
        onSetTimers(localTimers);
    }

    // update the local timer, key is the name of timer and value is the new time in minutes
    const updateTimers = (key, value) => {
        console.log(`Updating ${key} to ${value}`)
        setLocalInput(prev => ({ ...prev, [key]: value }))

        // map timer keys to user-friendly names
        const intervalNames = {
            work: "Work Time",
            shortBreak: "Short Break",
            longBreak: "Long Break"
        }

        const newValue = Number(value);

        // validate input; if invalid, set error messages for that timer
        setErrors(prevErrors => { 
            // create a copy of previous errors
            const newErrors = { ...prevErrors }

            if (isNaN(newValue) || newValue < 1) {
                newErrors[key] = `${intervalNames[key]} must be a number greater than 0.`
            }
            else {
                delete newErrors[key] // remove error if input is valid
            }
            return newErrors
        })

        // if valid, update the localTimers state
        console.log(errors)
        setLocalTimers(prev => ({ ...prev, [key]: newValue }))
        console.log(localTimers)
        console.log(localInput)
    }

    // return the component
    return (
        <div className="timer-input">
            <Container id="timer-input-container">
                <h2>Set Timers (minutes)</h2>
                <Row>
                    {/* Column for each input */}
                    <Col sm="4">
                        <h3>Work</h3>
                        <input id="work" className={styles['timer-input-field']}
                            type="number"
                            value={localInput.work} // use localInput to allow free typing 
                            onChange={(e) => updateTimers('work', e.target.value)}
                            // e is the event object, so that it will update on change instead of when rendered
                            // e.target.value is the new value from the input field
                        />
                        {/* Display Error if invalid input */}
                        <div className={styles['error-message']}>
                            {errors.work || "" }
                        </div>
                    </Col>

                    <Col sm="4">
                        <h3>Short Break</h3>
                        <input id="short-break" className={styles['timer-input-field']}
                            type="number"
                            value={localInput.shortBreak}
                            onChange={(e) => updateTimers('shortBreak', e.target.value)}
                        />
                        {/* Display Error if invalid input */}
                        <div className={styles['error-message']}>
                            {errors.shortBreak || "" }
                        </div>
                    </Col>

                    <Col sm="4">
                        <h3>Long Break</h3>
                        <input id="long-break" className={styles['timer-input-field']}
                            type="number"
                            value={localInput.longBreak}
                            onChange={(e) => updateTimers('longBreak', e.target.value)}
                        />
                        {/* Display Error if invalid input */}
                        <div className={styles['error-message']}>
                            {errors.longBreak || "" }
                        </div>
                    </Col>
                </Row>
                <br />

                {/* Save Timers */}
                <button onClick={handleSubmit}>Set Timers</button>
            </Container>
        </div>
    )     
}

export default TimerInput