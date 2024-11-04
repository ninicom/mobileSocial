import { View, Text, ScrollView, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PostCard from '../../components/PostCard'
import { getComment } from '../../lib/offlineStorage'
import MessageInput from '../../components/MessageInput'
import CommentCard from '../../components/CommentCard'

const Post = () => {
    const postId = useLocalSearchParams();
    const coments = getComment('01');
    console.log(coments)
    const { data:posts, refech } = useAppwrite(getAllPosts);
    var item = null;
    if(posts){
        posts.forEach(items => {
            item = items;
        })
    }
    return (
        <SafeAreaView className='h-full'>
            {(item)?(
                <View className='flex-1'>
                    <PostCard video={item}></PostCard>
                    <FlatList 
                        data={coments}
                        keyExtractor={comment => comment.id}
                        renderItem={()=>(
                            <CommentCard />
                        )}
                    />
                </View>
            ):(<></>)} 
            <MessageInput/>        
        </SafeAreaView>
    )
}

export default Post