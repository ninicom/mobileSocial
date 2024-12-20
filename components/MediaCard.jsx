import { View, Text, Image } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState, useEffect } from 'react'
import { ResizeMode } from 'expo-av'
import { GetMediaDetails } from '../lib/callAPIClient/MediaAPI';

const MediaCard = ({mediaId}) => {
    const [mediaType, setMediaType] = useState('');
    const [mediaPath, setmediaPath] = useState('');
    useEffect(() => {
        const getMedia = async () => {
            const media = await GetMediaDetails(mediaId);
            if (media) {
                setMediaType(media.MediaType);
                setmediaPath(media.filepath);
            } else {
                // Xử lý trường hợp không tìm thấy người dùng
                Alert.alert('Error', 'User not found');
            }
        };

        getMedia();

    }, [mediaId])


    const player = useVideoPlayer(mediaPath, player => {
        player.loop = false;
        player.pause();
    });

    if (mediaType == 'Image') {
        return (
            <Image
                source={{ uri: mediaPath }}
                className="w-full rounded-xl mt-0.5 mb-1 relative justify-center items-center bg-white"
                height={360}
                resizeMode={ResizeMode.COVER}
                allowsFullscreen={true}
            />
        )
    } else if (mediaType == 'video') {
        return (
            <VideoView
                className="w-full rounded-xl mt-0.5 mb-1 relative justify-center items-center bg-white"
                height={360}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
            />
        )
    } else {
        return <></>
    }
}

export default MediaCard