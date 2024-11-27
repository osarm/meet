import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('User does not type in the number-of-events field', ({ given, when, then }) => {
    let AppComponent;

    given('I am a user on the main page', () => {
      AppComponent = render(<App />);
    });

    when('I have not typed a number in the number-of-events field', () => {
      // No action is needed for this step as the user doesn't interact with the field
    });

    then('I should see a list of 32 events by default', async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User types a number in the number-of-events field', ({ given, when, then }) => {
    let AppComponent;

    given('I am a user on the main page', () => {
      AppComponent = render(<App />);
    });

    when('I type "5" in the number-of-events field', async () => {
      const user = userEvent.setup();
      // Select the input field inside the #number-of-events container
      const NumberInput = screen.getByTestId('numberOfEventsInput');
      await user.clear(NumberInput); // Clear the input field
      await user.type(NumberInput, '5'); // Type "5"
    });

    then('I should see a list of 5 events', async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(5);
      });
    });
  });
});
