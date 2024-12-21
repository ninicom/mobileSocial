import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const PrivateCommunity = () => {
  const { CommunityId } = useLocalSearchParams();
  return (
    <View>
      <Text>{CommunityId}</Text>
    </View>
  )
}

export default PrivateCommunity