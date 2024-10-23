import { View, Text } from 'react-native'
import React from 'react'

const InforBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View
      className={containerStyles}
    >
      <Text
        className={`text-gray-600 text-center font-psemibold ${titleStyles}`}
      >
        {title}
      </Text>
      <Text
        className="text-sm text-gray-400 text-center font-pregular"
      >
        {subtitle}
      </Text>
    </View>
  )
}

export default InforBox