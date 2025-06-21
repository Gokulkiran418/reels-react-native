import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

describe('LoginScreen', () => {
  it('renders input and button', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen onLogin={() => {}} />);
    expect(getByPlaceholderText('Enter User ID')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
  });

  it('calls onLogin with userId when button pressed', async () => {
    const mockLogin = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginScreen onLogin={mockLogin} />);

    fireEvent.changeText(getByPlaceholderText('Enter User ID'), 'testuser');
    fireEvent.press(getByText('Log In'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser');
    });
  });
});
