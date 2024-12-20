import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native'
import { useState, React, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import images from "../../constants/images"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import PostCard from '../../components/PostCard'
import { getNewPost } from '../../lib/callAPIClient/PostAPI'
import { useGlobalContext } from '../../context/GlobalProvaider'

const Home = () => {
  const { data: posts, refech } = useAppwrite(() => getNewPost(1, 10));
  const { data: lastedPosts } = useAppwrite(getLatestPosts);
  const user = useGlobalContext();
  console.log(user)
  const renderListHeader = useCallback(() => (
    <View className="w-full pb-2 px-4 space-y-6 flex-col">
      <View className="justify-between items-start flex-row md-6">
        <View>
          <Text className="font-pmedium text-sm text-gray-600">
            Chào mừng trở lại
          </Text>
          <Text className="text-2xl font-psemibold text-lightText">
            {user.user.username}
          </Text>
        </View>
        <View className='mt-1.5'>
          <Image
            source={images.logoSmall}
            className='w-9 h-10'
            resizeMode='contain'
          />
        </View>
      </View>

      <SearchInput
        placeholder="Tìm kiếm bài viết"
      />
      {
        (lastedPosts) ? (
          <View className="w-full flex-1 pb-8">
            <Text className="text-base text-gray-600 pb-5">
              Lasted video
            </Text>
            <View className='w-full h-75'>
              <Trending post={lastedPosts} />
            </View>
          </View>
        ) : (
          <></>
        )
      }
    </View>
  ), [images.logoSmall, lastedPosts]);


  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    // re call the video -> if any new video appeard
    await refech();
    setRefreshing(false);
  }
  // Sử dụng useFocusEffect để làm mới dữ liệu khi màn hình Home được focus 
  useFocusEffect( 
    useCallback(() => { 
      refech(); 
    }, []) 
  );

  return (
    <SafeAreaView className="bg-lightBackground h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
        ListHeaderComponent={renderListHeader}
        // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
        ListEmptyComponent={() => (
          <EmptyState
            title="Chưa có bài viết nào"
            subtitle="Hãy là người đang bài viết đầu tiên"
          />
        )}

        refreshControl={<RefreshControl
          refreshing={refreshing} 
          onRefresh={onRefresh}
        />}
        // buộc flatlist thay đổi khi post thay đổi
        extraData={posts}
      />
    </SafeAreaView>
  )
}

export default Home