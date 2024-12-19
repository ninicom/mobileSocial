import { View, Text, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getSender } from '../lib/offlineStorage'
import { useGlobalContext } from '../context/GlobalProvaider'
import { getUser } from '../lib/callAPIClient/userAPI'
import { getCurentUser, getCurrentUser } from '../lib/apiClient'
import MediaCard from './MediaCard'
import EmptyState from './EmptyState'

const MessageCard = ({ message }) => {
    // lấy thông tin bản thân
    const { user: user } = useGlobalContext(); // Lấy giá trị từ context
    // 
    const [sender, setSender] = useState(null);
    const [content, setContent] = useState("");
    const [repliedmessage, setRepliedmessage] = useState(null);
    const [createAt, setCreateAt] = useState(null);
    const [medias, setMedias] = useState([]);
    const [isCurrent, setisCurrent] = useState(false);
    // 
    useEffect(() => {
        if (!message) {
            // Nếu chat là null, reset các giá trị liên quan và hiển thị thông báo
            setSender(null);
            setContent("");
            setRepliedmessage(null);
            setCreateAt(null);
            setMedias([]);
            setisCurrent(false)
            Alert.alert('Error', 'Chat not found or has been deleted');
            return;
        }

        // hàm lấy thông tin người gửi
        const fetchUser = async (userId) => {
            try {
                if (userId == user.userId) {
                    setSender(user);
                    setisCurrent(true);
                    return;
                } else {
                    const userResponse = await getUser(userId);
                    if (userResponse?.user) {
                        setSender(userResponse.user);
                        setisCurrent(false);
                    } else {
                        Alert.alert('Error', 'User not found');
                    }
                }

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        // lấy thông tin người gửi
        fetchUser(message.senderId);
        setContent(message.content);
        setRepliedmessage(message.repliedmessage);
        setCreateAt(message.createdAt);
        setMedias(message.medias);
    }, [message])
    return (
        <View className={`px-2 ${(isCurrent) ? ('items-end') : ('items-start')}`}>
            <View className={`items-end ${(isCurrent) ? ('flex-row') : ('flex-row-reverse')}`}>
                <View className={`flex-col ${(isCurrent) ? ('items-end') : ('items-start')}`}>
                    <View className={`items-end ${(isCurrent) ? ('flex-row') : ('flex-row-reverse')}`}>
                        <Text className={`mb-1 p-2 max-w-xs rounded-md ${(isCurrent) ? ('bg-[#87CEEB] rounded-br-sm text-white') : ('bg-gray-50 rounded-bl-sm')}`}>
                            {content}
                        </Text>
                    </View>
                    <View>
                        <FlatList
                            className='w-64'
                            data={medias}
                            keyExtractor={(item) => `media${item}`}
                            renderItem={({ item }) => (
                                <MediaCard mediaId={item} />
                            )}

                            // Nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
                            ListEmptyComponent={() => (
                                <></>
                            )}

                            scrollEnabled={false}
                        />
                    </View>
                </View>
                {(isCurrent) ? (<></>) : (
                    <Image
                        source={{ uri: sender?.avatar || "https://th.bing.com/th/id/OIP.GvNakgya1kk5A6CFQM6Z4gHaHZ?rs=1&pid=ImgDetMain" }}
                        className='h-5 w-5 m-1 rounded-full'
                    />)
                }
            </View>
        </View>
    )
}

export default MessageCard