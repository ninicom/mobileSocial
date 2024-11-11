import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'

const FriendCard = ({ person }) => {

    const onAddFriend = async () => {

    }


    return (
        <View className='w-full p-1 flex-row items-center'>
            <Image
                className='w-10 h-10'
                source={{ uri: person.avatar }}
            />
            <View className='flex-col flex-1 pl-2'>
                <Text className='text-lg'>{person.username}</Text>
                <CustomButton
                    containerStyles={'min-h-[21px] w-30'}
                    textStyle={'text-base'}
                    title={'Thêm bạn bè'}
                />
            </View>
        </View>
    )
}

export default FriendCard

const styles = StyleSheet.create({})