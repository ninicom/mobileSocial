import { View, Text, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import * as DocumentPicker from 'expo-document-picker'


const MessageInput = () => {
    const [form, setForm] = useState({
        message: '',
        data: null,
    });

    const openPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/gif']
        })

        if(!result.canceled) {
            setForm({...form, data: result.assets[0] })
        }
    }

    return (
        <View className='flex-row w-full items-center space-x-1'>
            <TouchableOpacity onPress={() => openPicker()}>
                <Image
                    source={icons.plus}
                    className='h-5 w-5'
                    tintColor={'#87CEEB'}
                />
            </TouchableOpacity>
            <Text>MessageInput</Text>
        </View>
    )
}

export default MessageInput