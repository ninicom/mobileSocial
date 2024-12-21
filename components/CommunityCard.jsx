import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import community from '../app/(tabs)/community';
import { shortenText } from '../lib/textUtils';
import { router, usePathname } from 'expo-router'

const CommunityCard = ({ Community }) => {

    const pathname = usePathname();

    const [CommunityId, setCommunityId] = useState('')
    const [name, setName] = useState('');
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (!Community) {
            setCommunityId('');
            setName('');
            setPicture(null);
            setDescription('');
            return;
        }

        setCommunityId(Community._id);
        setName(Community.name);
        setPicture(Community.CommunityPictureUrl);
        setDescription(shortenText(Community.description, 25));

    }, [Community])

    const onEnter = () => {
        if (pathname.startsWith('/privatecommunity')) {
            router.setParams({ CommunityId });
        }
        else {
            router.push(`/privatecommunity`);
            setTimeout(() => { 
                router.setParams({ CommunityId }); 
            }, 0); // Đặt thời gian chờ ngắn để đảm bảo router.push hoàn tất
        }
    }

    return (
        <TouchableOpacity
            className='flex-row pb-2'
            onPress={onEnter}
        >
            <Image
                source={{ uri: picture || 'https://th.bing.com/th/id/OIP.6ElGMPJoR4IkEsCIAP1UfwHaHa?rs=1&pid=ImgDetMain' }}
                className='h-14 w-14 rounded-xl'
                resizeMode='cover'
            />
            <View className='flex-col px-2'>
                <Text className='text-base text-gray-800'>{name}</Text>
                <Text className='text-sm text-gray-600 pt-1'>Mô tả: {description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CommunityCard