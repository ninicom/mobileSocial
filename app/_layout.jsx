import { StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import GlobalProvaider from '../context/GlobalProvaider'
import { MenuProvider } from 'react-native-popup-menu'

SplashScreen.preventAutoHideAsync();

const rootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error)
      throw error;
    if (fontsLoaded)
      SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvaider>
      <MenuProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#161622'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        >
          {/*Nơi khai báo các screen */}
          <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="(auth)" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="search/[query]" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="chat/[chatId]" options={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}></Stack.Screen>
          <Stack.Screen name="post/[postId]" options={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}></Stack.Screen>
          <Stack.Screen name="searchFriend/[query]" options={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}></Stack.Screen>
          <Stack.Screen name="searchCommunity/[query]" options={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}></Stack.Screen>
          <Stack.Screen name='(community)' options={{ headerShown: false }}></Stack.Screen>
        </Stack>
        <StatusBar
          backgroundColor='#FFFFFF'
          barStyle='light-content'
          hidden={false}
        />
      </MenuProvider>
    </GlobalProvaider>
  )
}

export default rootLayout

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})