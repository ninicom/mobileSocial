import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import React from 'react';
import FriendRequestCard from '../components/Friend/FriendRequestCard';
import { acceptFriend, declineFriend } from '../lib/callAPIClient/friendAPI';
import { getUser } from '../lib/callAPIClient/userAPI';
import { Alert } from 'react-native';

// Mock các hàm API
jest.mock('../lib/callAPIClient/friendAPI', () => ({
    acceptFriend: jest.fn(),
    declineFriend: jest.fn(),
}));

jest.mock('../lib/callAPIClient/userAPI', () => ({
    getUser: jest.fn(),
}));

const mockPerson = {
    _id: '1',
    avatar: 'https://example.com/avatar.jpg',
    username: 'John Doe'
};

describe('FriendRequestCard Component', () => {
    beforeEach(() => {
        getUser.mockResolvedValue({ user: mockPerson });
        acceptFriend.mockResolvedValue(true);
        declineFriend.mockResolvedValue(true);
    });

    it('renders correctly while loading', () => {
        getUser.mockResolvedValueOnce(null); // Giả lập trạng thái loading
        const { getByText } = render(<FriendRequestCard userId="1" />);
        expect(getByText('Loading...')).toBeTruthy();
    });

    it('renders correctly after loading user data', async () => {
        const { getByText } = render(<FriendRequestCard userId="1" />);
        await waitFor(() => expect(getByText('John Doe')).toBeTruthy());
        expect(getByText('Accept')).toBeTruthy();
        expect(getByText('Decline')).toBeTruthy();
    });

    it('handles accepting a friend request', async () => {
        const { getByText, findByText } = render(<FriendRequestCard userId="1" />);
        await waitFor(() => getByText('Accept'));
        const acceptButton = await getByText('Accept');

        fireEvent.press(acceptButton);

        await findByText('You were friends');
        expect(acceptFriend).toHaveBeenCalledWith('1');
        expect(getByText('You were friends')).toBeTruthy();
    });

    it('handles declining a friend request', async () => {
        const { getByText, findByText } = render(<FriendRequestCard userId="1" />);
        await waitFor(() => getByText('Decline'));
        const declineButton = getByText('Decline');

        fireEvent.press(declineButton);

        await findByText('Removed the invitation');
        expect(declineFriend).toHaveBeenCalledWith('1');
        expect(getByText('Removed the invitation')).toBeTruthy();
    });

    it('shows an alert on accept friend API error', async () => {
        acceptFriend.mockRejectedValueOnce(new Error('Network error'));

        const mockAlert = jest.spyOn(Alert, 'alert');
        const { getByText } = render(<FriendRequestCard userId="1" />);
        await waitFor(() => getByText('Accept'));
        const acceptButton = getByText('Accept');

        fireEvent.press(acceptButton);

        await waitFor(() => expect(mockAlert).toHaveBeenCalledWith('Accept error', 'Network error'));
    });

    it('shows an alert on decline friend API error', async () => {
        declineFriend.mockRejectedValueOnce(new Error('Network error'));

        const mockAlert = jest.spyOn(Alert, 'alert');
        const { getByText } = render(<FriendRequestCard userId="1" />);
        await waitFor(() => getByText('Decline')); // Đảm bảo nút Decline được render
        const declineButton = getByText('Decline');

        fireEvent.press(declineButton);

        await waitFor(() => expect(mockAlert).toHaveBeenCalledWith('Decline error', 'Network error'));
    });
});
