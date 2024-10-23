import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { React, useEffect, useCallback } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { router, useLocalSearchParams } from 'expo-router'
import { icons } from '../../constants'
import { getChatMessages } from '../../lib/offlineStorage'

const Message = () => {
  
  const { message } = useLocalSearchParams();
  const data =  getChatMessages(message);
  console.log('tesst',data);

  const renderListHeader = useCallback(() => (
    <View className="pt-6 px-4 space-x-2 flex-row">
        <TouchableOpacity onPress={router.back}>
            <Image 
                source={icons.leftArrow}
                className="w-6 h-6"
                resizeMode='contain'
                tintColor={'#87CEEB'}
            />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row'>
            <Image 
            />
        </TouchableOpacity>
    </View>
  ));

  const renderFooter = useCallback(() => (
    <View>

    </View>
  ));

  useEffect(() => {
    //refech();
  }, [message])

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList 
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <Text>{item.$id}</Text>
        )}
        ListHeaderComponent={renderListHeader}
        // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the fist of one to upload video"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Message