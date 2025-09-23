import { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

/* purpose: create a clock display component to show the countdown timer
* 
*  receives props:
*    - timers: mode:time mapping in minutes
*    - state: object with currentMode (work/shortBreak/longBreak), timeLeft (in seconds), isRunning (boolean), and completedWorkIntervals (number of work intervals completed)
*    - actions: object with setCurrentMode, setTimeLeft functions to update parent state, setIsRunning to start/stop the timer, and setCompletedWorkIntervals to track completed work intervals
*/



function ClockDisplay({ timers, state, actions }) {

    const intervalNames = {
        work: "Work Time",
        shortBreak: "Short Break",
        longBreak: "Long Break"
    }

    // gives time in mm:ss
    const formatClock = (seconds) => {
        const min = Math.floor(seconds / 60)
        const sec = seconds%60
        return `${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`
    }

    // skips to next mode 
    const skipMode = () => {
        if (state.currentMode === 'work') {
            // if completed 4 work intervals, take long break
            if ((state.completedWorkIntervals + 1) % 4 === 0) { 
                actions.setCurrentMode('longBreak')
                actions.setTimeLeft(timers.longBreak * 60)
                // increment completed work intervals
                actions.setCompletedWorkIntervals(prev => prev + 1)
            }
            // otherwise, take short break
            else {
                actions.setCurrentMode('shortBreak')
                actions.setTimeLeft(timers.shortBreak * 60)
                // increment completed work intervals
                actions.setCompletedWorkIntervals(prev => prev + 1)
            }
        }
        // if break mode completed, switch to work
        else if (state.currentMode === 'shortBreak' || state.currentMode === 'longBreak') {
            actions.setCurrentMode('work')
            actions.setTimeLeft(timers.work * 60)
        }
        return
    }

    // useEffect to handle timer countdown and mode switching
    useEffect(() => {
        // if timer is not running, don't count down
        if (!state.isRunning) { 
            return
        }

        // if timeLeft reaches 0, switch modes
        if (state.timeLeft <= 0) {
            // if work mode completed, increment counter
            if (state.currentMode === 'work') {
                // if completed 4 work intervals, take long break
                if ((state.completedWorkIntervals + 1) % 4 === 0) { 
                    actions.setCurrentMode('longBreak')
                    actions.setTimeLeft(timers.longBreak * 60)
                    // increment completed work intervals
                    actions.setCompletedWorkIntervals(prev => prev + 1)
                }
                // otherwise, take short break
                else {
                    actions.setCurrentMode('shortBreak')
                    actions.setTimeLeft(timers.shortBreak * 60)
                    // increment completed work intervals
                    actions.setCompletedWorkIntervals(prev => prev + 1)
                }
            }
            // if break mode completed, switch to work
            else if (state.currentMode === 'shortBreak' || state.currentMode === 'longBreak') {
                actions.setCurrentMode('work')
                actions.setTimeLeft(timers.work * 60)
            }
            return
        }

        // otherwise, count down every second
        const interval = setInterval(() => {
            actions.setTimeLeft(prev => prev - 1 )
        }, 1000) // 

        return () => clearInterval(interval) // cleanup to prevent multiple intervals
    }, [state, timers, actions]) 

    // return the component
    return (
        <div className="clock-display">
            <Container>
                <h2>Mode: {intervalNames[state.currentMode]}</h2>

                {/* Implement Display for Clock */}
                <p>{formatClock(state.timeLeft)}</p>
                {/* Pause Button */}
                <button onClick={() => actions.setIsRunning(!state.isRunning)}>
                    {state.isRunning ? "Pause" : "Start"}
                </button>
                {/* Skip to next Interval */}
                <button onClick={() => skipMode()}>
                    Skip
                </button>
            </Container>
        </div>
    )
}

export default ClockDisplay
