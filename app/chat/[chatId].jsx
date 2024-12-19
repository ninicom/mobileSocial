import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { React, useEffect, useCallback, useState } from 'react';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvaider';
import { shortenText } from '../../lib/textUtils';
import MessageInput from '../../components/MessageInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageCard from '../../components/MessageCard';
import { createMessage, getMessages } from '../../lib/callAPIClient/MessageAPI';
import { getUser } from '../../lib/callAPIClient/userAPI';

const Chat = () => {
  const { chatId } = useLocalSearchParams();
  const { data: chat, refech } = useAppwrite(() => getMessages(chatId));
  const { user } = useGlobalContext();

  const [members, setMember] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState('Chat');
  const [value, setValue] = useState("")
  const [isGroup, setIsGroup] = useState(false);
  const [chatpicture, setChatpicture] = useState('https://th.bing.com/th/id/OIP.U0D5JdoPkQMi4jhiriSVsgHaHa?rs=1&pid=ImgDetMain');
  const [form, setForm] = useState({
    message: '',
    data: [],
  });


  useEffect(() => {
    if (!chat) {
      // Nếu chat là null, reset các giá trị liên quan và hiển thị thông báo
      setChatName('Chat');
      setChatpicture('https://th.bing.com/th/id/OIP.U0D5JdoPkQMi4jhiriSVsgHaHa?rs=1&pid=ImgDetMain');
      setMessages([]);
      setMember([]);
      Alert.alert('Error', 'Chat not found or has been deleted');
      return;
    }
    const fetchUser = async (userId) => {
      try {
        const userResponse = await getUser(userId);
        if (userResponse?.user) {
          setChatName(shortenText(userResponse.user.username, 15));
          setChatpicture(userResponse.user.avatar);
        } else {
          Alert.alert('Error', 'User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Phân loại Isgroup
    setIsGroup(chat.Isgroup);
    if (chat.Isgroup) {
      setChatName(shortenText(chat.name || 'Unnamed Group', 15));
      setChatpicture(chat.chatpicture || 'https://th.bing.com/th/id/OIP.U0D5JdoPkQMi4jhiriSVsgHaHa?rs=1&pid=ImgDetMain');
    } else {
      chat.members?.forEach((member) => {
        if (member !== user.userId) {
          fetchUser(member);
        }
      });
    }

    // Gán giá trị tin nhắn
    setMessages(chat.messages || []);
    // Gán thành viên
    setMember(chat.members || []);
  }, [chat]);

  const handleChangetext = (text) => {
    setValue(text)
    setForm((prevForm) => ({
      ...prevForm,
      message: text,
    }));
  };

  const handleSend = async () => {
    if (!form.message.trim()) {
      Alert.alert('Error', 'Message cannot be empty');
      return;
    }
    try {
      await createMessage(chatId, null, form);
      console.log('Message sent:', form.message);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {      
      setValue('')
      setForm({
        message: '',
        data: [],
      }); // Reset message field
    }
  };

  const renderFooter = useCallback(() => <></>, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-4 space-x-2 flex-row items-center border-b-[0.5px] pb-1 border-gray-100">
        <TouchableOpacity onPress={router.back}>
          <Image
            source={icons.leftArrow}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
        <TouchableOpacity className="h-full flex-1 flex-row items-center space-x-2">
          <Image
            source={{ uri: chatpicture }}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-base">
            {chatName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={icons.call}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={icons.videocall}
            className="w-6 h-6 m-1"
            resizeMode="contain"
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={icons.option}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id || item.id || Math.random().toString()}
        renderItem={({ item }) => <MessageCard message={item}/>}
        ListEmptyComponent={() => (
          <EmptyState
            title="You have no messages yet"
            subtitle="Let’s start messaging."
            enableBtn={false}
          />
        )}
        inverted // đảo ngược flatlist và hướng cuộn
      />
      <MessageInput
        value={value}
        form={form}
        setForm={setForm}
        handleChangetext={handleChangetext}
        handleSend={handleSend}
      />
    </SafeAreaView>
  );
};

export default Chat;
