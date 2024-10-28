import { View, Text, Image } from 'react-native'
import React from 'react'
import { getSender } from '../lib/offlineStorage'
import { useGlobalContext } from '../context/GlobalProvaider'

const MessageCard = ({message}) => {
    // lấy thông tin người gửi
    var sender = getSender(message.sender);
    // lấy thông tin bản thân
    user = useGlobalContext();
    // kiểm tra xem người gửi có phải bản thân không
    var isCurrentUser = sender.email==user.user.email;
    return (
        <View className={`pr-2 pl-2 ${(isCurrentUser)?('items-end'):('items-start')}`}>
            <View className={`items-end ${(isCurrentUser)?('flex-row'):('flex-row-reverse')}`}>
                <Text className={`m-1 p-2 max-w-xs rounded-md ${(isCurrentUser)?('bg-[#87CEEB] rounded-br-sm text-white'):('bg-gray-50 rounded-bl-sm')}`}>
                    {message.message}
                </Text>
                {(isCurrentUser)?(<></>):(
                    <Image 
                        source={{uri:sender.avatar}}
                        className='h-5 w-5 m-1 rounded-full'
                    />)
                }
                
            </View>
        </View>
    )
}

export default MessageCard