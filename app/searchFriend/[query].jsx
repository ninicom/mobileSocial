import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { React, useEffect, useCallback } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  
  const { query } = useLocalSearchParams();
  const { data:posts, refech } = useAppwrite(() => searchPosts(query));

  const renderListHeader = useCallback(() => (
    <View className="pt-6 px-4 space-y-6">
      <View className="justify-between items-start flex-row md-6">
        <View>
          <Text className="font-pmedium text-sm text-gray-600">
            Search Friends Results
          </Text>
          <Text className="text-2xl font-psemibold text-gray-600">
            {query}
          </Text>
        </View>
      </View>        
      <SearchInput 
        placeholder="Search for a friend"
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
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={renderListHeader}
        // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
        ListEmptyComponent={() => (
          <></>
        )}

      />
    </SafeAreaView>
  )
}

export default Search