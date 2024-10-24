import { View, Text, Image } from 'react-native'
import React from 'react'
import images from "../constants/images"
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center p-2">
        <Image 
            source={images.empty}
            className="w-[270px] h-[100px]"
            resizeMode='contain'
        />
        <Text className="text-2xl font-psemibold text-black">
            {title}
        </Text>
        <Text className="font-pmedium text-sm text-gray-500 pb-5">
            {subtitle}
        </Text>
        <CustomButton 
            title={"Creare video"}
            handlePress={() => router.push("/create")}
        />
    </View>
  )
}

export default EmptyState