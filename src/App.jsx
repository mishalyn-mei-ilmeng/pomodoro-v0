import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'  
import './App.css'
import TimerInput from './TimerInput/TimerInput.jsx'


// hi misha. please stoer all your shit in this file

// goal: create a pomodoro timer app
// features:
// - start/pause timer
  // two buttons or one toggle button
// - reset timer
  // 
// - set work/break intervals
// - display time remaining
  // mm:ss format with leading zeros
// - track completed intervals
  // count of completed work intervals
// - notify when interval ends
  // visual & sound notification

// app component 
function App() {
  // timer state & preset times
  const [timers, setTimers] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15
  });

  // customized timer state
  const handleSetTimers = (newTimers) => {
    setTimers(newTimers);
    console.log("Timers updated in App:", newTimers); // debug
  }

  return (
    <div id="app">
      <h1>Pomodoro Timer</h1>
      <TimerInput  
        timers={timers}
        onSetTimers={handleSetTimers} 
      />

      <br/>
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
