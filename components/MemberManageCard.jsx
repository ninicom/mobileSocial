import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { addFriend, removeAddFriend } from '../lib/callAPIClient/friendAPI'
import { addMember } from '../lib/callAPIClient/CommunityAPI'

const MemberManageCard = ({ communityId ,person, status = false }) => {
    const [isAdded, setIsAdded] = useState(status);
    const RemoveMember = async () => {
        try {
            setIsAdded(!isAdded);
            var added = await addMember(communityId, person._id);
            if (added) {
                setIsAdded(true);
            } else {
                setIsAdded(false);
            }
        } catch (error) {
            setIsAdded(false);
            Alert.alert('Thêm thất bại', error.message);
        }
    }

    const onRemove = async () => {
        Alert.alert('Xóa thành viên?', `Bạn có muốn xóa ${person.username} ra khỏi cộng đồng không?`,
              [
                { text: 'Hủy', onPress: () => console.log('cancel') },
                { text: 'Xóa thành viên', onPress: () => RemoveMember() }
              ]
            )
    }

    return (
        <View className='w-full p-1 flex-row items-center'>
            <Image
                className='w-[61px] h-full rounded-md'
                source={{ uri: person.avatar }}
            />
            <View className='flex-col flex-1 pl-2'>
                <Text className='text-xl pb-0.5 text-gray-800'>{person.username}</Text>
                {/* Change the state of friend request */}
                {(!isAdded) ? (
                    <CustomButton
                        containerStyles={'h-[30px] w-30 rounded-md bg-red-500'}
                        textStyle={'text-base'}
                        title={'Xóa thành viên'}
                        handlePress={onRemove}
                    />
                ) : (
                    <View>
                        <Text>Người dùng này đã bị xóa khỏi cộng đồng</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default MemberManageCard

const styles = StyleSheet.create({})