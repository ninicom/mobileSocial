import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../CustomButton'
import { addFriend, removeAddFriend } from '../../lib/callAPIClient/friendAPI'
import { router, usePathname } from 'expo-router'
import { getChatId } from '../../lib/callAPIClient/ChatAPI'

const FriendMessageCard = ({ person }) => {
    const pathname = usePathname();
    const onChat = async () => {
        try {
            const id = await getChatId(person._id);
            console.log(id)
            if(!id) {
                Alert.alert('Lỗi', 'Không tìm thấy đoạn chat với ' + person.username);
            }
            else {
                if(pathname.startsWith('/chat')) {
                    router.setParams({id});
                }
                else {
                    router.push(`/chat/${id}`);
                }
              }
        } catch (error) {
            console.log(error)
            Alert.alert('On Chat error');
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
                    title={'Get chat'}
                    handlePress={onChat}
                />
            </View>
        </View>
    )
}

export default FriendMessageCard

const styles = StyleSheet.create({})