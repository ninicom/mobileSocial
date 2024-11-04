import { View, Text, Image, Touchable } from 'react-native'
import { React, useState } from 'react'
import { icons } from '../constants'
import { TouchableOpacity } from 'react-native'
import { ResizeMode, Video, resizeMode, allowsFullscreen } from 'expo-av'

const VideoCard = ({video:{ title, thumbnail, video,
creator:{username, avatar } }}) => {

    const [play, setPlay] = useState(false)
    
    const [isLiked, setIsLiked] = useState(false);

    onclickLike = () => {
        setIsLiked(!isLiked);
        // do something
    }

    onclickComment = () => {

    }

    onclickShare = () => {

    }

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-blue-300 justify-center items-center p-0.5">
                        <Image source={{ uri:avatar }}
                            className="h-full w-full rounded-lg"
                            resizeMode='cover' 
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-lightText font-psemibold text-sm">{title }</Text>
                        <Text className="text-xs text-gray-600 font-pregular">{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} 
                        className="w-5 h-5"
                        resizeMode='contain'
                    />
                </View>
            </View>
            {play ? (
                <Video
                    posterSource={{uri: thumbnail}}
                    posterStyle={{
                    resizeMode: 'cover',
                    }}
                    usePoster={true}
                    source={{uri: video}}
                    className="w-full rounded-xl h-60 mt-3 relative justify-center items-center bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    allowsFullscreen={true}
                    useNativeControls={true}
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                    if(status.didJustFinish){
                        setPlay(false)
                    }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="w-full h-60 mt-3 relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl"
                        resizeMode='cover'
                    />
                    <Image source={icons.play} 
                        className="w-12 h-12 absolute"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
            <View className='h-[50px] w-full justify-center items-center flex-row border-b border-gray-300'>
                {isLiked ? (
                    <TouchableOpacity className=' flex-1 h-full items-center justify-center flex-row space-x-1' onPress={onclickLike}>
                        <Image source={icons.liked} 
                            className='w-[24px] h-[24px]'
                            tintColor={'#93c5fd'}
                        />
                        <Text className='text-likeactive'>Like</Text>
                    </TouchableOpacity>

                ) : (
                    <TouchableOpacity className=' flex-1 h-full items-center justify-center flex-row space-x-1' onPress={onclickLike}>
                        <Image source={icons.like} 
                            className='w-[24px] h-[24px]'
                            tintColor={'#4b5563'}
                        />
                        <Text className='text-'>Like</Text>
                    </TouchableOpacity>
                )}  

                <TouchableOpacity className=' flex-1 h-full items-center justify-center flex-row space-x-1' onPress={onclickComment}>
                    <Image source={icons.comment} 
                        className='w-[24px] h-[24px]'
                        tintColor={'#4b5563'}
                    />
                    <Text className='text-gray-600'>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity className='flex-1 h-full items-center justify-center flex-row space-x-1' onPress={onclickShare}>
                    <Image source={icons.share} 
                        className='w-[24px] h-[24px]'
                        tintColor={'#4b5563'}
                    />
                    <Text className='text-gray-600'>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VideoCard