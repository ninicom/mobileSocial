import { View, Text, FlatList, ScrollView } from 'react-native'
import { React, useEffect, useCallback, useState } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/callAPIClient/PostAPI'
import useAppwrite from '../../lib/useAppwrite'
import PostCard from '../../components/PostCard'
import { useLocalSearchParams } from 'expo-router'
import { RefreshControl } from 'react-native'
import { searchCommunity } from '../../lib/callAPIClient/CommunityAPI'
import CommunityCard from '../../components/CommunityCard'
import { SafeAreaView } from 'react-native-safe-area-context'


const SearchCommunity = () => {

  const { query } = useLocalSearchParams();
  const { data: communitys, refech } = useAppwrite(() => searchCommunity(query));
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [notJoinedCommunities, setNotJoinedCommunities] = useState([]);
  console.log(communitys);
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    // re call the video -> if any new video appeard
    await refech();
    setRefreshing(false);
  }


  useEffect(() => {
    refech();
  }, [query])

  useEffect(() => {
    if (!communitys)
      return;
    setJoinedCommunities(communitys.joinedCommunities);
    setNotJoinedCommunities(communitys.notJoinedCommunities);
  }, [communitys])

  return (
    <SafeAreaView className='px-2 bg-white h-full'>
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      >
        <View className='flex-row items-center w-full justify-center'>
          <Text className='font-semibold text-lg'>Tìm kiếm cộng đồng: {query}</Text>

        </View>
        <SearchInput
          otherStyles={'py-2'}
          height={12}
          path='/searchCommunity'
          placeholder={"Tìm kiếm cộng đồng"}
        />
        <Text className='text-sm text-gray-600 pb-2'>Cộng đồng của bạn</Text>
        <FlatList
          data={joinedCommunities}
          keyExtractor={(item) => `sec${item._id}-${Math.random().toString(36).substr(2, 9)}`}
          renderItem={({ item }) => (
            <CommunityCard Community={item} />
          )}
          ListEmptyComponent={(
            <Text className='pl-2 text-center'>Bạn chưa tham gia cộng đồng nào có tên là: {query}</Text>
          )}
          scrollEnabled={false}
        />
        <Text className='text-sm text-gray-600 pb-2'>Cộng đồng chưa tham gia</Text>
        <FlatList
          data={notJoinedCommunities}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CommunityCard Community={item} />
          )}
          ListEmptyComponent={(
            <Text className='pl-2 text-center'>Không có cộng đồng chưa tham gia có tên là: {query}</Text>
          )}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchCommunity