import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from '../CustomButton'
import { acceptFriend, declineFriend } from '../../lib/callAPIClient/friendAPI'
import { getUser } from '../../lib/callAPIClient/userAPI'

const FriendRequestCard = ({userId}) => {
    const [person, setPerson] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
          const userResponse = await getUser(userId);
          if (userResponse && userResponse.user) {
            setPerson(userResponse.user);
          } else {
            // Xử lý trường hợp không tìm thấy người dùng
            Alert.alert('Error', 'User not found');
          }
        };
        fetchUser();
      }, [userId]);

    if (!person) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    

    const onAcceptFriend = async () => {
        try {
            setStatus('You were friends');
            var added = await acceptFriend(userId);
            if (added) {
                setStatus('You were friends');
            } else {
                setStatus('');
            }
        } catch (error) {
            setStatus('');
            Alert.alert('Accept error', error.message);
        }
    }

    const onDeclineAdd = async () => {
        try {
            setStatus('Removed the invitation');
            var added = await declineFriend(userId);
            if (added) {
                setStatus('Removed the invitation');
            } else {
                setStatus('');
            }
        } catch (error) {
            setStatus('');
            Alert.alert('Decline error', error.message);
        }
    }

    return (
        <View className='w-full p-1 flex-row items-center'>
            <Image
                className='w-[61px] h-[61px] rounded-md'
                source={{ uri: person.avatar }}
            />
            <View className='flex-col flex-1 pl-2'>
                <Text className='text-xl pb-1 text-gray-800'>{person.username}</Text>
                {/* Change the state of friend request */}
                {/* If status is not null show the status*/}
                {(status != '') ? (
                    <View className='h-[30px] pl-1'>
                        <Text className='text-base'>{status}</Text>
                    </View>
                ) : (
                    <View
                        className='flex-row h-[30px]'
                    >
                        <View className='flex-1 pr-1'>
                            <CustomButton
                                containerStyles={'h-[30px] rounded-md'}
                                textStyle={'text-base'}
                                title={'Accept'}
                                handlePress={onAcceptFriend}
                            />
                        </View>
                        <View className='flex-1 pl-1'>
                            <CustomButton
                                containerStyles={'h-[30px] rounded-md bg-gray-300'}
                                textStyle={'text-base text-gray-800'}
                                title={'Decline'}
                                handlePress={onDeclineAdd}
                            />
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

export default FriendRequestCard

const styles = StyleSheet.create({})