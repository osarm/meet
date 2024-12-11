import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { ErrorAlert, InfoAlert, WarningAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {

    let alertText;
    if (navigator.onLine) {
      alertText = ""
    } else {
      alertText = " The displayed list has been loaded from the cache."
    }
    setWarningAlert(alertText);
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents : allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }
  
  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? < WarningAlert text={warningAlert} /> : null}
      </div>
    <CitySearch 
      allLocations={allLocations} 
      setCurrentCity={setCurrentCity}
      setInfoAlert={setInfoAlert} 
    />
    <NumberOfEvents 
      setErrorAlert={setErrorAlert}
      currentNOE={currentNOE}
      setCurrentNOE={setCurrentNOE}
    />
    {errorAlert && <p style={{ color: 'red' }}>{errorAlert}</p>}
    <EventList events={events} />
  </div>
  );
}

export default App;