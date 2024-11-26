import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../CustomButton'
import { addFriend, removeAddFriend } from '../../lib/callAPIClient/friendAPI'

const FriendMessageCard = ({ person }) => {
    const onChat = async () => {
        try {
            const $id = person._id;
            if(!$id) {
                Alert.alert('Missing query', 'Please input to search results across database');
            }
            else {
                if(pathname.startsWith('/chat')) {
                    router.setParams({$id});
                }
                else {
                    router.push(`/chat/${$id}`);
                }
              }
        } catch (error) {
            Alert.alert('On Chat error', error.message);
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
                <CustomButton
                    containerStyles={'h-[30px] w-30 rounded-md'}
                    textStyle={'text-base'}
                    title={'Add friend'}
                    handlePress={onChat}
                />
            </View>
        </View>
    )
}

export default FriendMessageCard

const styles = StyleSheet.create({})