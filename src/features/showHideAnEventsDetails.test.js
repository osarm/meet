import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;

    given('the user opened the app', () => {
      AppComponent = render(<App />);
    });

    when('the list of events are rendered', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
        const EventListItems = EventListDOM.querySelectorAll('li');
        expect(EventListItems.length).toBeGreaterThan(0); // Ensure events are rendered
      });
    });

    then('event details should not show', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.eventDetails');
      expect(eventDetails).not.toBeInTheDocument(); // Collapsed by default
    });
  });

  test('User can expand an event to see details.', ({ given, when, then }) => {
    let AppComponent;

    given('the user is seeing the events rendered', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
        const EventListItems = EventListDOM.querySelectorAll('li');
        expect(EventListItems.length).toBeGreaterThan(0); // Ensure events are rendered
      });
    });

    when('the user clicks the show details button', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;

      const showDetailsButton = AppDOM.querySelector('.show-details-btn');
      expect(showDetailsButton).toBeInTheDocument(); // Ensure the button exists
      await user.click(showDetailsButton);
    });

    then('the event details should be shown', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventDetails = AppDOM.querySelector('.eventDetails');
        expect(eventDetails).toBeInTheDocument(); // Expanded state
      });
    });
  });

  test('User can collapse an event to hide details.', ({ given, when, then }) => {
    let AppComponent;
  
    given('the user has clicked the show details button', async () => {

      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
  
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
      });
  
      const showDetailsButton = AppDOM.querySelector('.show-details-btn');
      expect(showDetailsButton).toBeInTheDocument(); // Verify button exists
      const user = userEvent.setup();
      await user.click(showDetailsButton);
  
      await waitFor(() => {
        const eventDetails = AppDOM.querySelector('.eventDetails');
        expect(eventDetails).toBeInTheDocument();
      });
    });
  
    when('the user clicks the hide details button', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const hideDetailsButton = AppDOM.querySelector('.show-details-btn');
      expect(hideDetailsButton).toBeInTheDocument(); // Verify button still exists
      const user = userEvent.setup();
      await user.click(hideDetailsButton);
    });
  
    then('the event details should be hidden', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventDetails = AppDOM.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
      });
    });
  });
});
