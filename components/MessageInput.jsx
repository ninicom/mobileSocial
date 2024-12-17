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


const MessageInput = ({ value, isLoading = false, handleChangetext, handleSend, chooseFile = true }) => {
    const [form, setForm] = useState({
        message: '',
        data: [],
    });

    const [key, setKey] = useState(0);
    const [numColumns, setNumColumns] = useState(calculateNumColumns());

    const [rowsVisible, setRowsVisible] = useState(() => {
        let columns = form.data.length;
        return Math.floor(columns / numColumns);
    });

    // tính số lượng hàng để hiển thị ảnh
    useEffect(() => {
        // nếu tồn tại data sẽ gán giá trị hàng và nếu không sẽ gán = 0
        if (form.data.length > 0) {
            // số phần tử ảnh
            let columns = form.data.length;
            // tính số hàng với hàm làm tròn lên ceil
            setRowsVisible(Math.ceil(columns / numColumns));
        } else {
            setRowsVisible(0);
        }
    }, [form.data.length]);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [form.data.length]);


    const openPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/gif'],
            multiple: true,
        })

        if (!result.canceled) {
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
                        source={{ uri: item.uri }}
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
        <View className={`flex-row bg-gray-50 w-full items-end p-2 ${(rowsVisible <= 0) ? ("") : ((rowsVisible > 1) ? ('h-56') : ('h-40'))}`}>
            {(chooseFile) ? (
                <TouchableOpacity
                    className='pb-[10px] pr-2'
                    onPress={() => openPicker()}
                >
                    <Image
                        source={icons.plus}
                        className='h-6 w-6'
                        resizeMode='contain'
                        tintColor={'#87CEEB'}

                    />
                </TouchableOpacity>
            ) : (
                <></>
            )}
            <View className='flex-1 flex-col'>
                {form.data ? (
                    <FlatList
                        className='flex-1 mb-1 bg-gray-50'
                        key={key} // Thay đổi key prop khi số lượng dữ liệu thay 
                        data={form.data}
                        renderItem={renderItem}
                        numColumns={numColumns}
                        keyExtractor={(item) => item.uri}
                        contentContainerStyle={form.data.length === 0 ? { flexGrow: 1 } : {}}
                        scrollEnabled={true}
                    />
                ) : (<></>)
                }
                <FormField
                    isMultiline={true}
                    value={value}
                    textBoxMinHeight={35}
                    handleChangeText={handleChangetext}
                />
            </View>
            <TouchableOpacity
                className='pb-[10px] pl-2'
                onPress={handleSend}
                disabled={isLoading}
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