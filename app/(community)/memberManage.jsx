import { View, Text, Image, ScrollView, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../lib/useAppwrite'
import { router, useLocalSearchParams } from 'expo-router'
import { getMember } from '../../lib/callAPIClient/CommunityAPI'
import MemberManageCard from '../../components/MemberManageCard'

const MemberManage = () => {

  const { CommunityId } = useLocalSearchParams();
  const { data: memberAdd, refech: refechSuggestions } = useAppwrite(() => getMember(CommunityId));
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    // re call the video -> if any new video appeard
    await refechSuggestions();
    setRefreshing(false);
  }

  useEffect(() => {
    if(!CommunityId)
      return;
    onRefresh();
  }, [CommunityId])
  

  return (
    <SafeAreaView className='w-full pb-1 bg-white h-full'>
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={refreshing} onRefresh={onRefresh}
        />}
        className="w-full"
      >
        {/* danh sách gợi ý kết bạn */}
        <FlatList
          className='w-full p-2'
          // thêm scroll enabled để các phần tử không cuộn riếng lẻ
          scrollEnabled={false}
          data={memberAdd}
          keyExtractor={(item) => `friendSuggestions${item._id}-${Math.random().toString(36).substr(2, 9)}`}
          ListHeaderComponent={() => (
            <Text className='text-lg'>Thành viên</Text>
          )}
          renderItem={({ item }) => (
            <MemberManageCard
              person={item}
              communityId={CommunityId}
            />
          )}
          ListEmptyComponent={(
            <Text className='pr-2'>Cộng đồng chưa có thành viên nào</Text>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default MemberManage