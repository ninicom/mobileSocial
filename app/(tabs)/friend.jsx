import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFriendSuggestions } from '../../lib/apiClient'
import FormField from '../../components/FormField'
import FriendCard from '../../components/FriendCard'
import useAppwrite from '../../lib/useAppwrite'

const Friend = () => {

  const { data: friendSuggestions, refech } = useAppwrite(getFriendSuggestions);
  return (
    <SafeAreaView className='h-full w-full '>
      <FlatList
        data={friendSuggestions}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <FormField />
        )}
        renderItem={({ item }) => (
          <FriendCard
            person={item}
          />
        )}

        className='w-full p-2'
      />
    </SafeAreaView>
  )
}

export default Friend