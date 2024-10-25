import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform  } from 'react-native'
import { React, useEffect, useCallback } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { router, useLocalSearchParams } from 'expo-router'
import { icons } from '../../constants'
import { getChatMessages } from '../../lib/offlineStorage'
import { useGlobalContext } from '../../context/GlobalProvaider'
import { shortenText } from '../../lib/textUtils'
import FormField from '../../components/FormField'
import MessageInput from '../../components/MessageInput'

const Chat = () => {
  
  const { chatId } = useLocalSearchParams();
  const { data, refech } = useAppwrite(() => getChatMessages(chatId));
  const { user } = useGlobalContext();

  const members = data.members;
  const messages = data.messages;

  var ChatName = null;
  var ChatIcon = null;

  if(data.isGroup == true) {
    ChatName = data.chatName;
    ChatIcon = data.groupProfile;
  }
  else {
    if(members){
      members.forEach(member => {
        if(member.email != user.email) {
          ChatName = member.username;
          ChatIcon = member.avatar;
        }
      });
    }    
  };
  ChatName = shortenText(ChatName, 15);
  

  const renderListHeader = useCallback(() => (
    <View className="pt-6 px-4 space-x-2 flex-row items-center border-b-[0.5px] pb-1 border-gray-100">
        <TouchableOpacity onPress={router.back}>
            <Image 
                source={icons.leftArrow}
                className="w-5 h-5"
                resizeMode='contain'
                tintColor={'#87CEEB'}
            />
        </TouchableOpacity>
        <TouchableOpacity className='h-full flex-1 flex-row items-center space-x-2'>
            <Image 
              source={{uri:ChatIcon}}
              className="w-10 h-10 rounded-full"
              resizeMode='cover'
            />
            <Text className='text-base'>
              {ChatName}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image 
            source={icons.call}
            className='w-5 h-5'
            resizeMode='contain'
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image 
            source={icons.videocall}
            className='w-6 h-6 m-1'
            resizeMode='contain'
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image 
            source={icons.option}
            className='w-5 h-5'
            resizeMode='contain'
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
    </View>
  ));

   // Hàm renderFooter sử dụng useCallback để tối ưu hóa
   const renderFooter = useCallback(() => (
    <MessageInput />
  ), []);


  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList 
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <Text>{item.$id}</Text>
        )}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderFooter}
        // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
        ListEmptyComponent={() => (
          <View className='bottom-0 flex-1'></View>
        )}
      />
    </SafeAreaView>
  )
}

export default Chat