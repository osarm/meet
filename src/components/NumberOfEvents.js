const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;

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
            type="text"
            defaultValue="32"
            onChange={handleInputChanged}
            data-testid="numberOfEventsInput"
            />
            </label>
        </div>
    )
};

export default NumberOfEvents;