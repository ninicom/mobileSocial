import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../CustomButton'
import { addFriend, removeAddFriend } from '../../lib/callAPIClient/friendAPI'
import { router, usePathname } from 'expo-router'

const FriendCard = ({ person, status = false }) => {
    const [isAdded, setIsAdded] = useState(status);
    const onAddFriend = async () => {
        try {
            setIsAdded(!isAdded);
            var added = await addFriend(person._id);
            if (added) {
                setIsAdded(true);
            } else {
                setIsAdded(false);
            }
        } catch (error) {
            Alert.alert('Add friend error', error.message);
        }
    }

    const onRemoveAdd = async () => {
        try {
            setIsAdded(!isAdded);
            var added = await removeAddFriend(person._id);
            if (added) {
                setIsAdded(false);
            } else {
                setIsAdded(true);
            }
        } catch (error) {
            Alert.alert('Delete failed friend request', error.message);
        }
    }

    const pathname = usePathname();
    const onGetProfile = () => {
        if (pathname.startsWith('/userProfile')) {
            router.setParams({ userId: person._id });
        }
        else {
            router.push(`/userProfile`);
            setTimeout(() => {
                router.setParams({ userId: person._id });
            }, 0); // Đặt thời gian chờ ngắn để đảm bảo router.push hoàn tất
        }
    }

    return (
        <View className='w-full p-1 flex-row items-center'>
            <TouchableOpacity onPress={onGetProfile}>
                <Image
                    className='w-[61px] h-[61px] rounded-md'
                    source={{ uri: person.avatar }}
                />
            </TouchableOpacity>
            <View className='flex-col flex-1 pl-2'>
                <Text className='text-xl pb-1 text-gray-800'>{person.username}</Text>
                {/* Change the state of friend request */}
                {(!isAdded) ? (
                    <CustomButton
                        containerStyles={'h-[30px] w-30 rounded-md'}
                        textStyle={'text-base'}
                        title={'Add friend'}
                        handlePress={onAddFriend}
                    />
                ) : (<CustomButton
                    containerStyles={'h-[30px] w-30 bg-gray-300 rounded-md'}
                    textStyle={'text-base text-gray-800'}
                    title={'Cancel'}
                    handlePress={onRemoveAdd}
                />)}
            </View>
        </View>
    )
}

export default FriendCard

const styles = StyleSheet.create({})