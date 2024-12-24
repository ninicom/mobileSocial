import { View, Text, FlatList, ScrollView } from 'react-native'
import { React, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import useAppwrite from '../../lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { searchFriends } from '../../lib/callAPIClient/friendAPI'
import FriendRequestCard from '../../components/Friend/FriendRequestCard'
import FriendCard from '../../components/Friend/FriendCard'
import FriendMessageCard from '../../components/Friend/FriendMessageCard'

const Search = () => {

  const { query } = useLocalSearchParams();
  const { data, refech } = useAppwrite(() => searchFriends(query));
  useEffect(() => {
    refech();
  }, [query])

  const isNullFriends = !(Array.isArray(data.friends) && data.friends.length === 0);
  const isNullNonFriends = !(Array.isArray(data.nonFriends) && data.nonFriends.length === 0);
  const isNullOrderFriends = !(Array.isArray(data.orderFriends) && data.orderFriends.length === 0);
  const isNullRequestFriends = !(Array.isArray(data.requestFriends) && data.requestFriends.length === 0);

  

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="px-4 space-y-6">
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
        {
          (!isNullFriends && !isNullNonFriends && !isNullOrderFriends && !isNullRequestFriends) ? (
            <View className='p-2 w-full h-32 items-center justify-center'>
              <Text className='text-lg text-center'>Không tìm thấy người dùng có tên là "{query}"</Text>
            </View>
          ) : (<></>)
        }
        {
          (isNullFriends) ? (
            <FlatList
              className='p-2 w-full'
              scrollEnabled={false}
              data={data.friends}
              keyExtractor={(item) => item._id}
              ListHeaderComponent={(
                <Text className='text-lg'>Bạn bè</Text>
              )}
              renderItem={({ item }) => (
                <FriendMessageCard person={item} />
              )}
              ListEmptyComponent={(
                <Text className='pl-2'>Không tìm thấy bạn bè nào</Text>
              )}
            />
          ) : (<></>)
        }
        {
          (isNullRequestFriends) ? (
            <FlatList
              className='p-2 w-full'
              scrollEnabled={false}
              data={data.requestFriends}
              keyExtractor={(item) => `requestFriends${item._id}-${Math.random().toString(36).substr(2, 9)}`}
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
          ) : (<></>)
        }
        {
          (isNullOrderFriends) ? (
            <FlatList
              className='p-2 w-full'
              scrollEnabled={false}
              data={data.orderFriends}
              keyExtractor={(item) => `orderFriends${item._id}-${Math.random().toString(36).substr(2, 9)}`}
              ListHeaderComponent={(
                <Text className='text-lg'>Lời mời kết bạn đã nhận</Text>
              )}
              renderItem={({ item }) => (
                <FriendRequestCard userId={item} />
              )}
              ListEmptyComponent={(
                <Text className='pl-2'>Bạn chưa nhận được lời mời kết bạn nào</Text>
              )}
            />
          ) : (<></>)
        }
        {
          (isNullNonFriends) ? (
            <FlatList
              className='p-2 w-full'
              scrollEnabled={false}
              data={data.nonFriends}
              keyExtractor={(item) => `nonFriends${item._id}-${Math.random().toString(36).substr(2, 9)}`}
              ListHeaderComponent={(
                <Text className='text-lg'>Người dùng</Text>
              )}
              renderItem={({ item }) => (
                <FriendCard person={item} />
              )}
              ListEmptyComponent={(
                <Text className='pl-2'>Không tìm thấy người dùng có tên là {query}</Text>
              )}
            />
          ) : (<></>)
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search