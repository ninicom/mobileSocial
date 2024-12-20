import { View, Text , StatusBar} from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CommunityLayout = () => {
  return (
    <>
      <StatusBar 
          backgroundColor='#161622'
          barStyle='light-content'
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
              headerShown: false
            }}
        />
        <Stack.Screen 
            name="privatecommunity"
            options={{
              headerShown: false
            }}
        />
      </Stack>      
    </>
  )
}

export default CommunityLayout