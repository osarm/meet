import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events? events.map((event) => (
        <li key={event.id} className="event-list-item">
              <Event event={event} /></li>)): null}
    </ul>
  );
};

export default EventList;