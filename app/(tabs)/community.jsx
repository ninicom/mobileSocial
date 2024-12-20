import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import SearchInput from '../../components/SearchInput'
import { router } from 'expo-router'

const community = () => {


  const onCreate = () => {
    router.push('/createcommunity')
  }

  return (
    <SafeAreaView className='px-2'>
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
        height={10}
        path='/searchCommunity'
        placeholder={"Tìm kiếm cộng đồng"}
      />
      <Text className='text-sm text-gray-600'>Cộng đồng của bạn</Text>
    </SafeAreaView>
  )
}

export default community