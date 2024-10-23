import { View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { React, useEffect, useCallback } from 'react'
import EmptyState from '../../components/EmptyState'
import { getUserPost, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvaider'
import { icons } from '../../constants'
import { Avatars } from 'react-native-appwrite'
import InforBox from '../../components/InforBox'
import { router } from 'expo-router'

const Profile = () => {
  
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data:posts, refech } = useAppwrite(() => getUserPost(user.$id));

  const logout = async () => {
    await signOut();
    setIsLoggedIn(false);
    router.replace('sign-in');
  }
  
  const renderListHeader = useCallback(() => (
    <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
      <TouchableOpacity 
        className='w-full items-end mt-6 mb-8 px-4'
        onPress={logout}
      >
        <Image
          source={ icons.logout }
          resizeMode='contain'
          className='w-6 h-6'
         />
      </TouchableOpacity>
      <View
        className='w-16 h-16 border border-blue-300 rounded-lg justify-center items-center'
      >
        <Image 
          source={{uri: user?.avatar }}
          className='w-[90%] h-[90%] rounded-lg'
          resizeMode='cover'
        />
      </View>
      <InforBox 
        title={user?.username}
        containerStyles='mt-5'
        titleStyles='text-lg'
      />
      <View className="mt-5 flex-row">
        <InforBox 
          title={posts?.length || 0}
          subtitle="Posts"
          containerStyles='mr-5'
          titleStyles='text-xl'
        />
        <InforBox 
          title='1.2k'
          subtitle="Followers"
          titleStyles='text-xl'
        />
      </View>
    </View>
  ));

  useEffect(() => {
    refech();
  }, [user.$id])

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
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the fist of one to upload video"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile