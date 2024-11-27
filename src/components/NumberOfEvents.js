import { useState } from "react";
import PropTypes from 'prop-types';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(currentNOE);
    
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value)
        if(isNaN(value) || value <= 0) {
            setErrorAlert('Enter a valid number');
        } else if (value > 32) {
            setErrorAlert('Only maximum of 32 is allowed');
        } else {
            setErrorAlert('');
            setCurrentNOE(value);
        }
    };

    return (
        <div id="number-of-events">
            <label>
                Number of Events:
                <input
                    type="number"
                    value={number}
                    onChange={handleInputChanged}
                     min="1"
                     max="32"
                    data-testid="numberOfEventsInput"
                />
            </label>
        </div>
    )
};

NumberOfEvents.propTypes = {
  currentNOE: PropTypes.number.isRequired,
  setCurrentNOE: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;