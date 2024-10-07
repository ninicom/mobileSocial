import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icon from "../../constants/icons"

const TabIcons = ({icon, color, name, focused}) => {
    return(
        <View className="items-center justify-center gap-0.5">
            <Image 
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused? 'font-psemiboid' : 'font-pregular'} text-xs`} style={{color:color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>    
        <StatusBar 
                backgroundColor='#161622'
                barStyle='light-content'
                hidden={false}
        />
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#93c5fd',
                tabBarInactiveTintColor: '#C8CACD',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#93c5fd',
                    height: 56,
                }
            }}
        >
            <Tabs.Screen 
                name="home" 
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcons 
                            color={color}
                            icon={icon.home}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="bookmark" 
                options={{
                    title: "Bookmark",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcons 
                            color={color}
                            icon={icon.bookmark}
                            name="Bookmark"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="create" 
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcons 
                            color={color}
                            icon={icon.plus}
                            name="Create"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcons 
                            color={color}
                            icon={icon.profile}
                            name="Profile"
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout