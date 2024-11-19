import * as React from 'react';
import { View, Image, useWindowDimensions, StatusBar, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import icon from "../../constants/icons";
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from '../(tabs)/home';
import Chat from '../(tabs)/chat';
import Create from '../(tabs)/create';
import Friend from '../(tabs)/friend';
import Profile from '../(tabs)/profile';
import TestAPI from '../(tabs)/testAPI';
import SearchInput from '../../components/SearchInput';

const renderScene = SceneMap({
  home: Home,
  chat: Chat,
  create: Create,
  friend: Friend,
  profile: Profile,
  testapi: TestAPI,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    renderIcon={({ route, focused, color }) => (
      <Image
        source={route.icon}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? '#93c5fd' : '#C8CACD',
        }}
      />
    )}
    showLabel={false}
    indicatorStyle={{ backgroundColor: '#93c5fd' }}
    style={{ backgroundColor: '#FFFFFF', height: 50 }}
  />
);

export default function SearchFriend() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'testapi', icon: icon.bookmark },
    { key: 'home', icon: icon.home },
    { key: 'chat', icon: icon.chat },
    { key: 'create', icon: icon.plus },
    { key: 'friend', icon: icon.friends },
    { key: 'profile', icon: icon.profile },
  ]);

  return (
    <SafeAreaView className='h-full'>
      <ScrollView>
        <StatusBar 
                backgroundColor='#FFFFFF'
                barStyle='dark-content'
                hidden={false}
        />
        <SearchInput />
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}              
        />
        </ScrollView>
    </SafeAreaView>
  );
}
