import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

describe('Contact Component', () => {
  it('submits the contact form with user input', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText('Name:');
    const emailInput = screen.getByLabelText('Email:');
    const messageInput = screen.getByLabelText('Message:');
    const submitButton = screen.getByText('Submit');

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(emailInput, 'johndoe@example.com');
    userEvent.type(messageInput, 'Hello, this is a test message.');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Form submitted with data:', {
        name: 'John Doe',
        email: 'johndoe@example.com',
        message: 'Hello, this is a test message.',
      });
    });
  });
});
