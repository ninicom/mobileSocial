import { View, Text, Image, ImageBackground } from 'react-native'
import { React, useState } from 'react'
import { FlatList } from 'react-native'
import EmptyState from './EmptyState'
import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import { ResizeMode, Video, resizeMode } from 'expo-av'

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
}

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
}

const TrendingItem = ({ activeItem, item }) => {

  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className='mr-5'
      animation={ activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {
        play ? (
          <Video
            posterSource={{uri: item.thumbnail}}
            posterStyle={{
              resizeMode: 'cover',
            }}
            usePoster={true}
            source={{uri: item.video}}
            className="w-52 h-72 rounded-[20px] bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if(status.didJustFinish){
                setPlay(false)
              }
            }}
          />
        ) : (
          <TouchableOpacity
            className='justify-center items-center relative'
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground 
              source={{ uri: item.thumbnail}}
              className="w-52 h-72 rounded-[20px] overflow-hidden shadow-lg shadow-black/20"
              resizeMode='cover'
             />
            <Image source={icons.play} 
                className="w-12 h-12 absolute"
                resizeMode='contain'
             />
          </TouchableOpacity>
        )
      }
    </Animatable.View>
  )
}

const Trending = ({post}) => {

  const [activeItem, setActiveItem] = useState(post[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }

  return (
    <FlatList 
        data={post}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <TrendingItem 
            item={item}
            activeItem={activeItem}
          />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        horizontal
    ></FlatList>
  )
}

export default Trending