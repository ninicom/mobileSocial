import { View, Text, Image } from 'react-native'
import React from 'react'
import images from "../constants/images"
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle, enableBtn = false, btnText = 'Tạo bài viết mới', btnrouter = '/create', enableImg = true }) => {
    return (
        <View className="justify-center items-center p-2">

            {enableImg ? (
                <Image
                    source={images.empty}
                    className="w-[270px] h-[100px]"
                    resizeMode='contain'
                />
            ) : (
                <></>
            )}

            <Text className="text-2xl font-psemibold text-black text-center">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-500 pb-5 text-center">
                {subtitle}
            </Text>
            {(enableBtn) ? (
                <CustomButton
                    title={btnText}
                    handlePress={() => router.push(btnrouter)}
                />
            ) : (
                <></>
            )}

        </View>
    )
}

export default EmptyState