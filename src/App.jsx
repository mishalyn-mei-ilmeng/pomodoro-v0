import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'  
import './App.css'
import TimerInput from './TimerInput/TimerInput.jsx'
import ClockDisplay from './ClockDisplay/ClockDisplay.jsx';

// app component 
function App() {

  // timers state to manage work/break intervals
  const [timers, setTimers] = useState({
    // default pomodoro values
    work: 25,
    shortBreak: 5,
    longBreak: 15
  });

  // counter for work intervals completed - for determining when to take long break
  const [completedWorkIntervals, setCompletedWorkIntervals] = useState(0);

  // mapping timer keys to user-friendly names
  // const intervalNames = {
  //   work: "Work Time",
  //   shortBreak: "Short Break",
  //   longBreak: "Long Break"
  // }

  // function to handle timer updates from TimerInput component
  // allows users to customize their timer intervals
  const handleSetTimers = (newTimers) => {
    setTimers(newTimers);
    // console.log("Timers updated in App:", newTimers); debug
  }

  // global clock state to manage current timer and mode
  const [currentMode, setCurrentMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(timers.work * 60) // in seconds
  const [isRunning, setIsRunning] = useState(false) // whether timer is running

  // return the component
  return (
    <div id="app">
      <h1>Pomodoro Timer</h1>

      {/* Clock Display in MM:SS format */}
      <ClockDisplay
        timers={timers}
        state={{ currentMode, timeLeft, isRunning, completedWorkIntervals }}
        actions={{ setCurrentMode, setTimeLeft, setIsRunning, setCompletedWorkIntervals }}
      />

      {/* Allow Users to Customize Timer intervals */}
      <TimerInput  
        timers={timers}
        onSetTimers={handleSetTimers} 
      />

      <br/>
      {/* This is temporary for debug! */}
      <div className="timers-display">
        <Container>
          <h2>Current Timers - Debug</h2>
          <Row>
            <Col xs="4">
              <p>Work: {timers.work} min</p>
            </Col>
            <Col xs="4">
              <p>Short Break: {timers.shortBreak} min</p>
            </Col>
            <Col xs="4">
              <p>Long Break: {timers.longBreak} min</p>
            </Col>
          </Row>
        </Container>
      </div>

    </div>
  );
}

export default App
