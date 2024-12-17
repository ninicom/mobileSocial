import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getUser } from '../lib/callAPIClient/userAPI'
import { timeSinceMessage } from '../lib/formatDate';
import { icons } from '../constants';
import { likeComment, unlikeComment } from '../lib/callAPIClient/CommentAPI';


const CommentCard = ({ comment }) => {
  const [userComment, setUserComment] = useState(null)
  const content = comment.content;
  const time = timeSinceMessage(comment.createdAt);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount)
  const [isLiking, setIsLiking] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await getUser(comment.Author);
      if (userResponse && userResponse.user) {
        setUserComment(userResponse.user);
      } else {
        // Xử lý trường hợp không tìm thấy người dùng
        Alert.alert('Error', 'User not found');
      }
    };
    fetchUser();
  }, []);

  const onClickLike = async () => {
    try {
      setIsLiked(true);
      setIsLiking(true);
      setLikeCount(likeCount + 1);
      var statusLike = await likeComment(comment._id);
      setIsLiking(false);
    } catch (error) {
      setIsLiked(false);
      setLikeCount(likeCount);
      setIsLiking(false);
      console.log('like comment error:', error);
    }
  }
  const onClickUnLike = async () => {
    try {
      setIsLiked(false);
      setIsLiking(true);
      setLikeCount(likeCount - 1);
      var statusLike = await unlikeComment(comment._id);
      setIsLiking(false);
    } catch (error) {
      setIsLiked(true);
      setLikeCount(likeCount);
      setIsLiking(false);
      console.log('unlike comment error:', error);
    }
  }

  if (!userComment) {
    return <></>
  }

  return (
    <View className='flex-row pb-3'>
      <View className="w-[46px] h-[46px] rounded-lg border border-blue-300 justify-center items-center p-0.5">
        <Image source={{ uri: userComment.avatar }}
          className="h-full w-full rounded-lg"
          resizeMode='cover'
        />
      </View>
      <View className='pl-2 pr-1 flex-1'>
        <View className='bg-gray-300 rounded-lg pr-2 pl-2 pt-1 pb-1 space-y-1 w-full'>
          <Text className='font-semibold'>{userComment.username}</Text>
          <Text>{content}</Text>
        </View>
        <View className='flex-row space-x-2 pt-1'>
          <Text>{time}</Text>
          {(isLiked) ? (
            <TouchableOpacity
              onPress={onClickUnLike}
              disabled={isLiking}
            >
              <Text className='text-primary'>Like</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onClickLike}
              disabled={isLiking}
            >
              <Text className='text-gray-600'>Like</Text>
            </TouchableOpacity>
          )}
          {(likeCount > 0) ? (
            <View className='flex-1 flex-row justify-end'>
              <Text className='text-gray-600'>{likeCount}</Text>
              <Image
                source={icons.like}
                resizeMode='contain'
                tintColor={'#87ceeb'}
                className='w-5 h-5'
                style={{ height: '85%' }}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  )
}

export default CommentCard