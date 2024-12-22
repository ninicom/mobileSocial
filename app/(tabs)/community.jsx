import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import SearchInput from '../../components/SearchInput'
import { router } from 'expo-router'
import useAppwrite from '../../lib/useAppwrite'
import { getMyCommunity } from '../../lib/callAPIClient/CommunityAPI'
import EmptyState from '../../components/EmptyState'
import CommunityCard from '../../components/CommunityCard'

const community = () => {
  const { data: communities, refech } = useAppwrite(getMyCommunity);

  const onCreate = () => {
    router.push('/createcommunity')
  }

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
    <SafeAreaView className='px-2 bg-white h-full'>
      <View className='flex-row items-center w-full justify-center'>
        <Text className='font-semibold text-lg absolute'>Cộng đồng</Text>
        <View className='flex-1 items-end'>
          <TouchableOpacity onPress={onCreate} className='items-end'>
            <Image
              source={icons.upload}
              className='h-8 w-8'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>
      <SearchInput
        otherStyles={'py-2'}
        height={12}
        path='/searchCommunity'
        placeholder={"Tìm kiếm cộng đồng"}
      />
      <Text className='text-sm text-gray-600 pb-2'>Cộng đồng của bạn</Text>
      <FlatList
        data={communities}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CommunityCard Community={item} />
        )}
        scrollEnabled={false}
        ListEmptyComponent={(
          <EmptyState
            title={'Bạn chưa tham gia cộng đồng nào'}
            subtitle={'Hãy tham gia hoặc tạo cộng đồng mới'}
            enableBtn={false}
          />
        )}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  )
}

export default community