import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../context/GlobalProvaider'
import { timeSinceMessage } from '../lib/formatDate';
import { shortenText } from '../lib/textUtils';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const ChatCard = ({
  chat:{ 
    $id , 
    readed,
    latestMessage, 
    timestamp, 
    chatName, 
    isGroup,
    groupProfile,
    members
  }
}) => {

  const { user } = useGlobalContext();
  const pathname = usePathname();
  var Name = null;
  var ChatIcon = null;
  var timeSend = timeSinceMessage(timestamp);
  var chatMessage = shortenText(latestMessage);

  if(isGroup == true) {
    Name = chatName;
    ChatIcon = groupProfile;
  }
  else {
    members.forEach(member => {
      if(member.email != user.email) {
        Name = member.username;
        ChatIcon = member.avatar;
      }
    });
  };

  Name = shortenText(Name, 15)
  
  const onChat = () => {
    if(!$id) {
        Alert.alert('Missing query', 'Please input to search results across database');
    }
    else {
        if(pathname.startsWith('/chat')) {
            router.setParams({$id});
        }
        else {
            router.push(`/chat/${$id}`);
        }
      }
  }


  
  return (
    <TouchableOpacity onPress={onChat}
      className="flex-row h-35 w-full m-1 pb-1 items-center"   
    >
        <Image 
          source={{uri: ChatIcon}}
          className='h-[50px] w-[50px] rounded-lg'          
        />
        <View className='pl-2 flex-col'>

          <Text className={`text-base ${(!readed)?"font-bold":""}`}>
            {Name}
          </Text>

          <View className='flex-row'>

            <Text className={`text-gray-500 text-sm ${(!readed)?"font-bold":""}`}>
              {chatMessage}
            </Text>

            <Text className={`text-gray-400 text-xs align-text-bottom pt-1 h-full pl-2 pr-1 ${(!readed)?"font-bold":""}`}>
              {timeSend}
            </Text>

          </View>
        </View>
        <View className='flex-1 items-end pr-2 align-middle w-full'>          
          { (!readed)?(
              <Image 
                source={icons.dot}
                className='h-2 w-2'
                tintColor={'#87CEEB'}
                resizeMode='contain'            
              />
            ):(<></>)
          }
        </View>
    </TouchableOpacity>
  )
}

export default ChatCard