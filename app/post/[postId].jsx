import { View, Text, ScrollView, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useAppwrite from '../../lib/useAppwrite'
import PostCard from '../../components/PostCard'
import MessageInput from '../../components/MessageInput'
import CommentCard from '../../components/CommentCard'
import { getPost } from '../../lib/callAPIClient/PostAPI'
import { createComment, getComment } from '../../lib/callAPIClient/CommentAPI'

const Post = () => {
    const { postId } = useLocalSearchParams();
    const { data: post, refech } = useAppwrite(() => getPost(postId));
    const { data: comments, refech: refechComment } = useAppwrite(() => getComment(postId));
    const [uploading, setUploading] = useState(false);
    const [commetText, setCommetText] = useState("");
    const [form, setForm] = useState({
      message: '',
      data: [],
    })
    if (!post || post.length == 0) {
        return <></>
    };
    const submit = async () => {
        if (!commetText) {
            console.log('Please fill in all the fields');
            return Alert.alert('Please fill in all the fields');
        }

        setUploading(true);

        try {
            var isSuccess = await createComment(postId, commetText);
            if (isSuccess) {
                await refechComment();
                console.log('Success', 'Comment uploaded successfully');
                Alert.alert('Success', 'Comment uploaded successfully');
            }
            else {
                Alert.alert('Failed', 'Comment uploaded failed')
            }

        } catch (error) {
            //Alert.alert(error);
            Alert.alert('Failed', 'Comment uploaded failed')
            console.log(error);
        } finally {
            setCommetText('');
            setUploading(false);
        }
    }

    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView>
                <PostCard post={post} />
                <FlatList
                    className='flex-1 px-2'
                    data={comments}
                    keyExtractor={(item) => `comment${item._id}-${Math.random().toString(36).substr(2, 9)}` || $`comment{item.id}-${Math.random().toString(36).substr(2, 9)}` || Math.random().toString()}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <CommentCard comment={item} />
                    )}
                    // buộc flatlist thay đổi khi comments thay đổi
                    extraData={comments}
                />
            </ScrollView>
            <MessageInput
                chooseFile={false}
                value={commetText}
                handleChangetext={(e) => setCommetText(e)}
                handleSend={submit}
                isLoading={uploading}
                form={form}
                setForm={setForm}
            />
        </SafeAreaView>
    )
}

export default Post