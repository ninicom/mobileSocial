import { View, Text, Touchable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton = ({title, handlePress, containerStyles, textStyle, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`w-full bg-lightPrimary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
        <Text 
            className={`text-darkText font-psemibold text-lg ${textStyle}`}
        >
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton