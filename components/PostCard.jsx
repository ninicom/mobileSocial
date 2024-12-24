import { View, Text, Image, Touchable } from 'react-native'
import { React, useState, useEffect } from 'react'
import { icons, images } from '../constants'
import { TouchableOpacity } from 'react-native'
import { ResizeMode } from 'expo-av'
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { formatDate, timeSinceMessage } from '../lib/formatDate'
import { shortenText } from '../lib/textUtils'
import { router, usePathname } from 'expo-router'
import { getUser } from '../lib/callAPIClient/userAPI'
import { likePost, unLikePost } from '../lib/callAPIClient/PostAPI'
import { getCommunity } from '../lib/callAPIClient/CommunityAPI'

const PostCard = ({ post, showCommunity = false, menuShow = false }) => {

    const [authorId, setAuthorId] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [postLikeCount, setPostLikeCount] = useState(0);
    const [avatar, setAvatar] = useState('http://192.168.1.154:3000/uploads/1732679542370-664186079.jpg');
    const [headline, setHeadline] = useState('');
    const [byline, setByline] = useState('');
    const [postId, setPostId] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [content, setContent] = useState('');
    const [mediaPath, setMediaPath] = useState('');
    const [isCommunityPost, setIsCommunityPost] = useState(false);
    const [communityId, setCommunityId] = useState('')

    useEffect(() => {
        if (!post) return;

        // Thiết lập thông tin bài viết
        setPostId(post._id || '');
        setMediaType(post.mediaDetails?.MediaType || '');
        setContent(post.content || '');
        setMediaPath(post.mediaDetails?.filepath || '');
        setIsLiked(post.isLiked || false);
        setPostLikeCount(post.likeCount || 0);
        if (showCommunity) {
            setIsCommunityPost(post.IsCommunityPost || false);
        }
        setCommunityId(post.Community || '');

        // Thiết lập thông tin tác giả
        const fetchUser = async () => {
            try {
                const userResponse = await getUser(post.Author);
                if (userResponse?.user) {
                    setAuthorId(userResponse.user.userId || '');
                    setAvatar(userResponse.user.avatar || 'default-avatar-url');
                    setHeadline(userResponse.user.username || 'Unknown');
                    setByline(formatDate(post.CreatedAt));
                } else {
                    console.warn('User not found for post author.');
                    setAvatar('default-avatar-url');
                    setHeadline('Unknown');
                    setByline(formatDate(post.CreatedAt));
                }
            } catch (error) {
                console.log('Error fetching user:', error);
                Alert.alert('Error', 'Unable to fetch author details.');
            }
        };

        const fetchGroup = async () => {
            try {
                const userResponse = await getUser(post.Author);
                const groupRessponse = await getCommunity(post.Community);
                console.log(groupRessponse)
                if (groupRessponse) {
                    setAvatar(groupRessponse.CommunityPictureUrl || 'default-avatar-url');
                    setHeadline(groupRessponse.name || 'Unknown');
                }
                if (userResponse?.user) {
                    setAuthorId(userResponse.user.userId || '');
                    setByline(userResponse.user.username + " " + formatDate(post.CreatedAt));
                } else {
                    console.warn('User not found for post author.');
                    setAvatar('default-avatar-url');
                    setHeadline('Unknown');
                    setByline(formatDate(post.CreatedAt));
                }
            } catch (error) {
                console.log('Error fetching user:', error);
                Alert.alert('Error', 'Unable to fetch author details.');
            }
        };

        if (isCommunityPost) {
            fetchGroup();
        } else {
            fetchUser();
        }
    }, [post]);

    const player = useVideoPlayer(mediaPath, player => {
        player.loop = false;
        player.pause();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });


    const pathname = usePathname();

    const onRouteHeadLine = () => {
        if (isCommunityPost) {
            if (pathname.startsWith('/privatecommunity')) {
                router.setParams({ communityId });
            }
            else {
                router.push(`/privatecommunity`);
                setTimeout(() => {
                    router.setParams({ communityId });
                }, 0); // Đặt thời gian chờ ngắn để đảm bảo router.push hoàn tất
            }
        } else {
            if (pathname.startsWith('/userProfile')) {
                router.setParams({ userId: authorId });
            }
            else {
                router.push(`/userProfile`);
                setTimeout(() => {
                    router.setParams({ userId: authorId });
                }, 0); // Đặt thời gian chờ ngắn để đảm bảo router.push hoàn tất
            }
        }
    }

    const onRouteByLine = () => {
        if (isCommunityPost) {
            if (pathname.startsWith('/privatecommunity')) {
                router.setParams({ query });
            }
            else {
                router.push(`privatecommunity/${query}`);
            }
        } else {
            if (pathname.startsWith('/userProfile')) {
                router.setParams({ query });
            }
            else {
                router.push(`/userProfile/${query}`);
            }
        }
    }

    const renderView = () => {
        if (mediaType == 'Image') {
            return (
                <Image
                    source={{ uri: mediaPath }}
                    className="w-full rounded-xl mt-3 relative justify-center items-center bg-white/10"
                    height={360}
                    resizeMode={ResizeMode.COVER}
                    allowsFullscreen={true}
                />
            )
        } else if (mediaType == 'video') {
            return (
                <VideoView
                    className="w-full rounded-xl mt-3 relative justify-center items-center bg-white/10"
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

    onclickLike = () => {
        setIsLiked(!isLiked);
        // do something
        if (isLiked) {
            setPostLikeCount(postLikeCount - 1);
            try {
                var statusLike = Promise.all(unLikePost(post._id));
                if (!statusLike) {
                    throw new Error('Like thất bại');
                }
            } catch (error) {
                setPostLikeCount(postLikeCount + 1);
                setIsLiked(isLiked);
                console.log('like error', error);
            }
        }
        else {
            setPostLikeCount(postLikeCount + 1);
            try {
                var statusLike = Promise.all(likePost(post._id));
                if (!statusLike) {
                    throw new Error('unLike thất bại');
                }
            } catch (error) {
                setPostLikeCount(postLikeCount - 1);
                setIsLiked(isLiked);
                console.log('like error', error);
            }
        }
    }

    onclickComment = () => {
        if (pathname.startsWith('/post')) {
            router.setParams({ postId });
        }
        else {
            router.push(`/post/${postId}`);
        }
    }


    onclickShare = () => {

    }

    return (
        <View className="flex-col items-center px-4 mb-4">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-blue-300 justify-center items-center p-0.5">
                        <TouchableOpacity
                            onPress={onRouteHeadLine}
                            className="h-full w-full"
                        >
                            <Image source={{ uri: avatar }}
                                className="h-full w-full rounded-lg"
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <TouchableOpacity onPress={onRouteHeadLine}>
                            <Text className="text-lightText font-psemibold text-sm">{headline}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onRouteByLine}>
                            <Text className="text-xs text-gray-600 font-pregular">{byline}</Text>
                        </TouchableOpacity>
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
            {renderView()}
            <View className='h-[50px] w-full justify-center items-center flex-row border-b border-gray-300'>

                {isLiked ? (
                    <TouchableOpacity className=' flex-1 h-full items-center justify-center flex-row space-x-1' onPress={onclickLike}>
                        <Image source={icons.liked}
                            className='w-[24px] h-[24px]'
                            tintColor={'#93c5fd'}
                        />
                        {postLikeCount > 0 ? (
                            <Text className='text-gray-600'>{postLikeCount}</Text>
                        ) : (
                            <Text className='text-gray-600'>Like</Text>
                        )}
                    </TouchableOpacity>

                ) : (
                    <TouchableOpacity className=' flex-1 h-full items-center justify-center flex-row space-x-1' onPress={onclickLike}>
                        <Image source={icons.like}
                            className='w-[24px] h-[24px]'
                            tintColor={'#4b5563'}
                        />
                        {postLikeCount > 0 ? (
                            <Text className='text-gray-600'>{postLikeCount}</Text>
                        ) : (
                            <Text className='text-gray-600'>Like</Text>
                        )}
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