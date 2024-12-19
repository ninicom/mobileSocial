import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalProvaider'
import { timeSinceMessage } from '../lib/formatDate';
import { shortenText } from '../lib/textUtils';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';
import { getUser } from '../lib/callAPIClient/userAPI';
import useAppwrite from '../lib/useAppwrite';
import { getCurentUser } from '../lib/apiClient';

const ChatCard = ({ chat }) => {
  try {
    
    const pathname = usePathname();
    // Kiểm tra nếu chat là null
    if (!chat) {
      return <></>;
    }

    const [chatId, setChatId] = useState("");
    const [chatName, setChatName] = useState("");
    const [chatpicture, setChatpicture] = useState("https://th.bing.com/th/id/OIP.U0D5JdoPkQMi4jhiriSVsgHaHa?rs=1&pid=ImgDetMain");
    const [latestMessage, setLatestMessage] = useState("");
    const [timeSend, setTimeSend] = useState("");
    const [readed, setReaded] = useState(false);
    const { user } = useGlobalContext();

    useEffect(() => {
      const fetchUser = async (userId) => {
        const userResponse = await getUser(userId);
        if (userResponse && userResponse.user) {
          setChatName(shortenText(userResponse.user.username, 15));
          setChatpicture(userResponse.user.avatar);
        } else {
          // Xử lý trường hợp không tìm thấy người dùng
          Alert.alert('Error', 'User not found');
        }
      };
      // Kiểm tra và đặt giá trị cho chatId nếu có
      if (chat._id) {
        setChatId(chat._id);
      }

      // Phân loại Isgroup
      if (chat.Isgroup) {
        setChatName(shortenText(chat.name || "Unnamed Group", 15));
        setChatpicture(chat.chatpicture || defaultGroupPicture);
      } else {
        chat.members?.forEach(member => {
          if (member !== user.userId) {
            fetchUser(member);
          }
        });
      }

      // Kiểm tra và đặt tin nhắn mới nhất nếu có
      if (chat.latestMessage) {
        setLatestMessage(shortenText(chat.latestMessage.content, 20));
        setTimeSend(timeSinceMessage(chat.latestMessage.createdAt));
      }

      // kiểm tra trạng thái đã đọc
      setReaded(chat.readBy?.includes(user._id))

    }, [chat]);

    const onChat = () => {
      if (!chatId) {
        Alert.alert('Missing query', 'Please input to search results across database');
      }
      else {
        if (pathname.startsWith('/chat')) {
          router.setParams({ chatId });
        }
        else {
          router.push(`/chat/${chatId}`);
        }
      }
    }



    return (
      <TouchableOpacity onPress={onChat}
        className="flex-row h-35 w-full m-1 pb-1 items-center"
      >
        <Image
          source={{ uri: chatpicture }}
          className='h-[50px] w-[50px] rounded-lg'
        />
        <View className='pl-2 flex-col'>

          <Text className={`text-base ${(!readed) ? "font-bold" : ""}`}>
            {chatName}
          </Text>

          <View className='flex-row'>

            <Text className={`text-gray-500 text-sm ${(!readed) ? "font-bold" : ""}`}>
              {latestMessage}
            </Text>

            <Text className={`text-gray-400 text-xs align-text-bottom pt-1 h-full pl-2 pr-1 ${(!readed) ? "font-bold" : ""}`}>
              {timeSend}
            </Text>

          </View>
        </View>
        <View className='flex-1 items-end pr-2 align-middle w-full'>
          {(!readed) ? (
            <Image
              source={icons.dot}
              className='h-2 w-2'
              tintColor={'#87CEEB'}
              resizeMode='contain'
            />
          ) : (<></>)
          }
        </View>
      </TouchableOpacity>
    )
  }
  catch (error) {
    console.log(error);
    return <></>
  }
}
export default ChatCard