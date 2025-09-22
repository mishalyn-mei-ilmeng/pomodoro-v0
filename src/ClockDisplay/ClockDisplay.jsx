import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import styles from './ClockDisplay.module.css'

// goal: create a clock display component to show the countdown timer

function ClockDisplay({ minutes, seconds, mode }) {

    // return the component
    return (
        <div className="clock-display">
            <Container>
            </Container>
        </div>
    )
}

export default ClockDisplay
