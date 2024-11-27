import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
    let setCurrentNOE, setErrorAlert;

    beforeEach(() => {
        setCurrentNOE = jest.fn();
        setErrorAlert = jest.fn();

        render(
            <NumberOfEvents
                currentNOE={32}
                setCurrentNOE={setCurrentNOE}
                setErrorAlert={setErrorAlert}
            />
        );
    });

    test('component contains input spinbutton', () => {
        const input = screen.getByRole('spinbutton'); // Updated role to "spinbutton"
        expect(input).toBeInTheDocument();
    });

    test('ensures the default value of spinbutton is 32', () => {
        const input = screen.getByRole('spinbutton');
        expect(input).toHaveValue(32); // `type="number"` returns numeric values
    });

    test('spinbutton value changes when user updates input', async () => {
        const input = screen.getByRole('spinbutton');
        const user = userEvent.setup();
        await user.clear(input); // Clear existing value before typing
        await user.type(input, '10');
        expect(input).toHaveValue(10); // Numeric values
    });
});
