import { View, Text, Image, Alert, FlatList } from 'react-native'
import { React, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import * as DocumentPicker from 'expo-document-picker'
import FormField from './FormField'
import { Video } from 'expo-av'


const MessageInput = ({handleChangetext, handleSend, handleFile}) => {
    const [form, setForm] = useState({
        message: '',
        data: [],
    });

    const openPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/gif'],
            multiple: true,
        })

        if(!result.canceled) {
            // Cập nhật state để thêm tất cả các tệp đã chọn vào mảng data
            setForm((prevForm) => ({
                ...prevForm,
                data: [...prevForm.data, ...result.assets], // Gộp các tệp đã chọn vào mảng
            }));
        }
    }
     // Hàm xóa tệp khỏi danh sách
    const removeFile = (uri) => {
        setForm((prevForm) => ({
            ...prevForm,
            data: prevForm.data.filter(item => item.uri !== uri),
        }));
    };

    const renderItem = ({ item }) => (
        <View className='p-1'>            
            <TouchableOpacity onPress={() => removeFile(item.uri)} >
                <Image 
                    source={icons.cancel}
                    className='h-4 w-4'
                    resizeMode='contain'
                />
            </TouchableOpacity>
            {item.mimeType.startsWith('image/') ? (
                <Image 
                    source={{ uri: item.uri }}
                    className="w-20 h-20"                    
                />
            ) : (
                <Video 
                    source={{uri: item.uri}}
                    className='w-20 h-20'
                    allowsFullscreen={true}
                    useNativeControls={false}
                    resizeMode='contain'
                />
            )}
        </View>
    );

    return (
        <View className='flex-row w-full items-end p-2'>
            <TouchableOpacity 
                className='pb-[5px] pr-2' 
                onPress={() => openPicker()}
            >
                <Image
                    source={icons.plus}
                    className='h-7 w-7'
                    resizeMode='contain'
                    tintColor={'#87CEEB'}

                />
            </TouchableOpacity>
            <View className='flex-1 flex-col'>
                {form.data?(
                    <FlatList
                        data={form.data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.uri}
                        contentContainerStyle={form.data.length === 0 ? { flexGrow: 1 } : {}}
                        className="flex-row"
                    />
                    ):(<></>)
                }
                <FormField
                    isMultiline={true}
                    textBoxMinHeight={35}
                    otherStyles={'flex-1'}
                    handleChangeText={handleChangetext}
                />
            </View>            
            <TouchableOpacity 
                className='pb-[5px] pl-2' 
                onPress={handleSend}
            >
                <Image
                    source={icons.send}
                    className='h-7 w-7'
                    resizeMode='contain'
                    tintColor={'#87CEEB'}
                />
            </TouchableOpacity>
        </View>
    )
}

export default MessageInput