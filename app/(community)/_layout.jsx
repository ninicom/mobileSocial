import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MenuProvider } from 'react-native-popup-menu'

const CommunityLayout = () => {
  return (
    <>
      <StatusBar
        backgroundColor='#FFFFFF'
        barStyle='dark-content'
        hidden={false}
      />
      <Stack>
        <Stack.Screen
          name="adminsetting"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="createcommunity"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="membercommunity"
          options={{
            headerShown: true,
            title: 'Thêm thành viên',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="memberManage"
          options={{
            headerShown: true,
            title: 'Quản lý thành viên',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="privatecommunity"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="userProfile"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="createCommunityPost"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default CommunityLayout