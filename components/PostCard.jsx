import { View, Text, Image, Touchable } from 'react-native'
import { React, useState, useEffect } from 'react'
import { icons, images } from '../constants'
import { TouchableOpacity } from 'react-native'
import { ResizeMode, Video, resizeMode, allowsFullscreen } from 'expo-av'
import { formatDate, timeSinceMessage } from '../lib/formatDate'
import { shortenText } from '../lib/textUtils'
import { router, usePathname } from 'expo-router'
import { getUser } from '../lib/callAPIClient/userAPI'

const PostCard = ({ post }) => {
    const [author, setAuthor] = useState(null)
    var avatar = '';
    var headline = '';
    var byline = '';
    if (!post) {
        return (<></>);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const userResponse = await getUser(post.Author);
            if (userResponse && userResponse.user) {
                setAuthor(userResponse.user);
            } else {
                // Xử lý trường hợp không tìm thấy người dùng
                Alert.alert('Error', 'User not found');
            }
        };
        fetchUser();
    }, []);

    const postId = post._id;
    const mediaType = post.mediaDetails.MediaType;
    const time = formatDate(post.CreatedAt);
    const content = post.content;
    const mediaPath = post.mediaDetails.filepath;
    const isCommunityPost = post.IsCommunityPost;

    if (isCommunityPost) {
        avatar = 'http://192.168.1.154:3000/uploads/1732679542370-664186079.jpg';
        headline = 'group';
        byline = `${author.username} ${time}`;
    } else {
        if (author) {
            avatar = author.avatar;
            headline = author.username;
        }
        byline = time;
    }
    const [isLiked, setIsLiked] = useState(false);

    const pathname = usePathname();

    const renderView = () => {
        
    }

    onclickLike = () => {
        setIsLiked(!isLiked);
        // do something
    }

    onclickComment = () => {
        if (!username) {
            Alert.alert('Missing query', 'Please input to search results across database');
        }
        else {
            if (pathname.startsWith('/post')) {
                router.setParams({ postId });
            }
            else {
                router.push(`/post/${postId}`);
            }
        }
    }


    onclickShare = () => {

    }

    return (
        <View className="flex-col items-center px-4 mb-4">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-blue-300 justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }}
                            className="h-full w-full rounded-lg"
                            resizeMode='cover'
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-lightText font-psemibold text-sm">{headline}</Text>
                        <Text className="text-xs text-gray-600 font-pregular">{byline}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu}
                        className="w-5 h-5"
                        resizeMode='contain'
                    />
                </View>
            </View>
            <Text className='w-full'>
                {content}
            </Text>
            <Image
                source={{ uri: mediaPath }}
                className="w-full rounded-xl mt-3 relative justify-center items-center bg-white/10"
                height={360}
                resizeMode={ResizeMode.COVER}
                allowsFullscreen={true}
            />
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

export default PostCard