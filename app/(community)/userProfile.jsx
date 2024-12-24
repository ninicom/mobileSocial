import { View, Image, SafeAreaView, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { React, useEffect, useCallback, useState } from 'react'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvaider'
import { icons } from '../../constants'
import { Avatars } from 'react-native-appwrite'
import InforBox from '../../components/InforBox'
import { router, useLocalSearchParams } from 'expo-router'
import { getCurrentUser, signOut } from '../../lib/apiClient'
import { getUserPost } from '../../lib/callAPIClient/PostAPI'
import PostCard from '../../components/PostCard'
import { getFriends } from '../../lib/callAPIClient/friendAPI'
import FriendMessageCard from '../../components/Friend/FriendMessageCard'
import { getUser } from '../../lib/callAPIClient/userAPI'

const UserProfile = () => {

    const { userId } = useLocalSearchParams();
    const { data: user, refech: refechUser } = useAppwrite(() => getUser(userId));
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [postCount, setPostCount] = useState(0);
    const [friendCount, setFriendCount] = useState(0);
    const [posts, setPosts] = useState([]);
    console.log(userId);
    useEffect(() => {

        const refech = async (userId) => {
            const getposts = await getUserPost(userId);
            setPosts(getposts);
        }

        if (user && user.user) {
            console.log(user.user)
            setAvatar(user.user.avatar);
            setName(user.user.username);
            setPostCount(user.user.postCount);
            setFriendCount(user.user.friendsCount);
            refech(user.user.userId);
        }
    }, [user]);

    useEffect(() => {
      refechUser();
    }, [userId])
    

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = async () => {
        setRefreshing(true);
        // re call the video -> if any new video appeard
        await refechUser();
        setRefreshing(false);
    }

    const imageSource = avatar
        ? { uri: avatar }
        : require('../../assets/default.jpg'); // Hình ảnh mặc định

    const onBack = () => {
        router.back();
    }

    const renderListHeader = useCallback(() => (
        <View className='w-full justify-center items-center mb-2 pt-2'>
            <View className='w-full flex-row'>
                <TouchableOpacity
                    className='items-start mb-8 px-4 flex-1'
                    onPress={onBack}
                >
                    <Image
                        source={icons.arrow}
                        resizeMode='contain'
                        className='w-6 h-6'
                    />
                </TouchableOpacity>
            </View>

            <View
                className='w-16 h-16 border border-blue-300 rounded-lg justify-center items-center'
            >
                <Image
                    source={imageSource}
                    className='w-[90%] h-[90%] rounded-lg'
                    resizeMode='cover'
                />
            </View>
            <InforBox
                title={name}
                containerStyles='mt-2'
                titleStyles='text-lg'
            />
            <View className="mt-2 flex-row ">
                <InforBox
                    title={postCount}
                    subtitle="Bài viết"
                    containerStyles='mr-5'
                    titleStyles='text-xl'
                />
                <InforBox
                    title={friendCount}
                    subtitle="Bạn bè"
                    titleStyles='text-xl'
                />
            </View>
        </View>
    ));

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            >
                <FlatList
                    data={posts}
                    keyExtractor={(item) => `post${item._id}-${Math.random().toString(36).substr(2, 9)}`}
                    renderItem={({ item }) => (
                        <PostCard post={item} />
                    )}
                    ListHeaderComponent={renderListHeader}
                    // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
                    ListEmptyComponent={() => (
                        <EmptyState
                            title="Không tìm thấy bài viết"
                        />
                    )}
                    scrollEnabled={false}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserProfile