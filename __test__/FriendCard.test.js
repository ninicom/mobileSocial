import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import FriendCard from '../components/Friend/FriendCard';
import { addFriend, removeAddFriend } from '../lib/callAPIClient/friendAPI';
import { Alert } from 'react-native';

// Mock các hàm API
jest.mock('../lib/callAPIClient/friendAPI', () => ({
  addFriend: jest.fn(),
  removeAddFriend: jest.fn(),
}));

const mockPerson = {
  _id: '1',
  avatar: 'https://example.com/avatar.jpg',
  username: 'John Doe'
};

describe('FriendCard Component', () => {
  beforeEach(() => {
    addFriend.mockResolvedValue(true);
    removeAddFriend.mockResolvedValue(true);
  });

  it('renders correctly', () => {
    const { getByText } = render(<FriendCard person={mockPerson} />);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Add friend')).toBeTruthy();
  });

  it('handles adding a friend', async () => {
    const { getByText, findByText } = render(<FriendCard person={mockPerson} />);
    const addButton = getByText('Add friend');
    
    fireEvent.press(addButton);
    
    // Mock resolve sau khi thêm bạn
    await findByText('Cancel');
    expect(addFriend).toHaveBeenCalledWith('1');
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('handles removing a friend request', async () => {
    const { getByText, findByText } = render(<FriendCard person={mockPerson} status={true} />);
    const cancelButton = getByText('Cancel');
    
    fireEvent.press(cancelButton);
    
    // Mock resolve sau khi hủy yêu cầu kết bạn
    await findByText('Add friend');
    expect(removeAddFriend).toHaveBeenCalledWith('1');
    expect(getByText('Add friend')).toBeTruthy();
  });

  it('shows an alert on API error', async () => {
    addFriend.mockRejectedValue(new Error('Network error'));
    
    const mockAlert = jest.spyOn(Alert, 'alert');
    const { getByText } = render(<FriendCard person={mockPerson} />);
    const addButton = getByText('Add friend');
    
    fireEvent.press(addButton);
    
    await Promise.resolve(); // Chờ lỗi được xử lý

    expect(mockAlert).toHaveBeenCalledWith('Add friend error', 'Network error');
  });
});
