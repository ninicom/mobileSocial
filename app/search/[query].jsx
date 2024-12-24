import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { React, useEffect, useCallback, useState } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/callAPIClient/PostAPI'
import useAppwrite from '../../lib/useAppwrite'
import PostCard from '../../components/PostCard'
import { useLocalSearchParams } from 'expo-router'
import { RefreshControl } from 'react-native'

const Search = () => {
  
  const { query } = useLocalSearchParams();
  const { data:posts, refech } = useAppwrite(() => searchPosts(query));

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    // re call the video -> if any new video appeard
    await refech();
    setRefreshing(false);
  }

  const renderListHeader = useCallback(() => (
    <View className="px-4 space-y-6 pb-2">
      <View className="justify-between items-start flex-row md-6">
        <View>
          <Text className="font-pmedium text-sm text-gray-600 pb-1">
            Search Results
          </Text>
        </View>
      </View>        
      <SearchInput 
        placeholder="Search for a video topic"
        initialQuery={query}
      />         
    </View>
  ));

  useEffect(() => {
    refech();
  }, [query])

  return (
    <SafeAreaView className="bg-white h-full">
     <FlatList
        data={posts}
        keyExtractor={(item) => `se${item._id}-${Math.random().toString(36).substr(2, 9)}`}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
        ListHeaderComponent={renderListHeader}
        // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the fist of one to upload video"
          />
        )}

        refreshControl={<RefreshControl
          refreshing={refreshing} onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  )
}

export default Search