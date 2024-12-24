import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { React, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState'
import { useGlobalContext } from '../../context/GlobalProvaider';
import FormField from '../../components/FormField';
import { icons } from '../../constants';
import ChatCard from '../../components/ChatCard';
import useAppwrite from '../../lib/useAppwrite';
import { useFocusEffect } from 'expo-router'
import { getAllChats } from '../../lib/offlineStorage';
import { getChats } from '../../lib/callAPIClient/ChatAPI';

const Chat = () => {

  const { user } = useGlobalContext();
  const { data: chats, refech } = useAppwrite(getChats);

  const [refreshing, setRefreshing] = useState(false);
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
    <SafeAreaView
      className='h-full pr-3 pl-3 w-full bg-white'
    >
      <View
        className='flex-row w-full h-20 justify-center items-center space-x-2'
      >
        <View
          className='w-12 h-12 border border-blue-300 rounded-lg justify-center items-center mr-2'
        >
          <Image
            source={{ uri: user?.avatar }}
            className='w-[90%] h-[90%] rounded-lg'
            resizeMode='cover'
          />
        </View>
        <FormField
          otherStyles={'flex-1'}
          placeholder={'Search message'}
          isMultiline={false}
          textBoxMinHeight={46}
        />
        <TouchableOpacity className="h-10 w-10 items-center justify-center">
          <Image
            className='w-[90%] h-[90%]'
            source={icons.more}
            resizeMode='cover'
            tintColor={'#87CEEB'}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => `chat${item._id}-${Math.random().toString(36).substr(2, 9)}`}
        renderItem={({ item }) => (
          <ChatCard chat={item} />
        )}
        // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
        ListEmptyComponent={() => (
          <EmptyState
            title="No Chat Found"
            subtitle="Make new chat"
          />
        )}

        refreshControl={<RefreshControl
          refreshing={refreshing} onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  )
}

export default Chat