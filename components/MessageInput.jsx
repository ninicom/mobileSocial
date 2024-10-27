import { View, Text, Image, Alert, FlatList, Dimensions, ScrollView } from 'react-native'
import { React, useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import * as DocumentPicker from 'expo-document-picker'
import FormField from './FormField'
import { Video } from 'expo-av'

const itemWidth = 100; // Chiều rộng của mỗi mục trong danh sách

const calculateNumColumns = () => {
    const screenWidth = Dimensions.get('window').width;
    return Math.floor(screenWidth / itemWidth);
};


const MessageInput = ({handleChangetext, handleSend, handleFile}) => {
    const [form, setForm] = useState({
        message: '',
        data: [],
    });

    const [key, setKey] = useState(0);
    const [numColumns, setNumColumns] = useState(calculateNumColumns());
    
    const maxVisibleRows = 2;
    const maxVisibleItems = numColumns * maxVisibleRows; // Giới hạn số lượng mục hiển thị

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [form.data.length]);


    const openPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/gif'],
            multiple: true,
        })

        if(!result.canceled) {
            const updatedData = [...form.data, ...result.assets];
            
            // Loại bỏ các phần tử bị trùng
            const uniqueData = Array.from(new Set(updatedData.map(item => item.name)))
                .map(name => updatedData.find(item => item.name === name));
            
            // Cập nhật state để thêm tất cả các tệp đã chọn vào mảng data
            setForm((prevForm) => ({
                ...prevForm,
                data: uniqueData, // Gộp các tệp đã chọn vào mảng
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
        <View className='p-[1px] items-center'>
            <View>            
                <TouchableOpacity onPress={() => removeFile(item.uri)} >
                    <Image 
                        source={icons.cancel}
                        className='h-4 w-4 mb-[2px]'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                {item.mimeType.startsWith('image/') ? (
                    <Image 
                        source={{ uri: item.uri }}
                        className="w-20 h-20"
                        borderRadius={5}                    
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
                    className='h-6 w-6'
                    resizeMode='contain'
                    tintColor={'#87CEEB'}

                />
            </TouchableOpacity>
            <View className='flex-1 h-10 flex-col'>
                {!form.data?(
                    <ScrollView className='max-h-52 w-full mb-1 bg-gray-50'>
                        <FlatList
                            key={key} // Thay đổi key prop khi số lượng dữ liệu thay 
                            data={form.data}
                            renderItem={renderItem}
                            numColumns={numColumns}                        
                            keyExtractor={(item) => item.uri}
                            contentContainerStyle={form.data.length === 0 ? { flexGrow: 1 } : {}}
                            scrollEnabled={true}
                        />
                    </ScrollView>                    
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
                    className='h-6 w-6'
                    resizeMode='contain'
                    tintColor={'#87CEEB'}
                />
            </TouchableOpacity>
        </View>
    )
}

export default MessageInput