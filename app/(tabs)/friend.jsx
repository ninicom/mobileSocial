import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFriendSuggestions, getOrderFriend, getRequestFriend } from '../../lib/callAPIClient/friendAPI'
import FormField from '../../components/FormField'
import FriendCard from '../../components/Friend/FriendCard'
import useAppwrite from '../../lib/useAppwrite'
import FriendRequestCard from '../../components/Friend/FriendRequestCard'
import { getCurrentUser } from '../../lib/appwrite'
import SearchInput from '../../components/SearchInput'

const Friend = () => {

  const { data: friendSuggestions, refech: refechSuggestions } = useAppwrite(getFriendSuggestions);
  const { data: listOrderFriend, refech: refechOrder } = useAppwrite(getOrderFriend);
  const { data: listRequestFriend, refech: refechRequest } = useAppwrite(getRequestFriend);
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    // re call the video -> if any new video appeard
    await refechSuggestions();
    await refechRequest();
    await refechOrder();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className='w-full pb-1'>
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={refreshing} onRefresh={onRefresh}
        />}
        className="w-full"
      >
        <SearchInput otherStyles={'p-2'}
          placeholder="Search for friend"
          path='/searchFriend2'
        />
        {/* danh sách lời mời đã nhận */}
        <FlatList
          className='p-2 w-full'
          scrollEnabled={false}
          data={listOrderFriend}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={(
            <Text className='text-lg'>Lời mời kết bạn</Text>
          )}
          renderItem={({ item }) => (
            <FriendRequestCard userId={item} />
          )}
          ListEmptyComponent={(
            <Text className='pl-2'>Chưa có lời mời kết bạn nào</Text>
          )}
        />
        {/* danh sách lời mời kết bạn đã gửi*/}
        <FlatList
          className='p-2 w-full'
          scrollEnabled={false}
          data={listRequestFriend}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={(
            <Text className='text-lg'>Lời mời kết bạn đã gửi</Text>
          )}
          renderItem={({ item }) => (
            <FriendCard person={item} status={true} />
          )}
          ListEmptyComponent={(
            <Text className='pl-2'>Bạn chưa gửi lời mời kết bạn nào</Text>
          )}
        />
        {/* danh sách gợi ý kết bạn */}
        <FlatList
          className='w-full p-2'
          // thêm scroll enabled để các phần tử không cuộn riếng lẻ
          scrollEnabled={false}
          data={friendSuggestions}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => (
            <Text className='text-lg'>Gợi ý kết bạn</Text>
          )}
          renderItem={({ item }) => (
            <FriendCard
              person={item}
            />
          )}
          ListEmptyComponent={(
            <Text className='pr-2'>Không có gợi ý kết bạn nào</Text>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Friend