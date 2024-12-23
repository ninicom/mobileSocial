import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { React, useState, useEffect } from 'react'
import FormField from '../../components/FormField'
import { icons } from '../../constants';
import { ResizeMode, Video } from 'expo-av';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker'
import { router, useLocalSearchParams } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvaider';
import { createPost } from '../../lib/callAPIClient/PostAPI';

const CreateCommunityPost = () => {

  const { user } = useGlobalContext();
  const { CommunityId, name } = useLocalSearchParams();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    content: '',
    media: null,
    mediaType: null,
    communityId: null,
    
  });

  useEffect(() => {
    if (CommunityId) {
      setForm(prevForm => ({
        ...prevForm,
        communityId: CommunityId
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        communityId: null
      }));
    }
  }, [CommunityId]);

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/gif']
    })

    if (!result.canceled) {
      setForm({ ...form, media: result.assets[0] });
      if (form.media) {
        form.mediaType = 'unknown';
        if (form.media.mimeType.startsWith('image/')) {
          form.mediaType = 'Image';
        } else if (form.media.mimeType.startsWith('video/')) {
          form.mediaType = 'video';
        } else if (form.media.mimeType.startsWith('audio/')) {
          form.mediaType = 'Audio';
        }
      }
    }
    else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if (!form.content || !form.media) {
      return Alert.alert('Vui lòng nhập đủ các trường dữ liệu');
    }

    setUploading(true)

    try {
      var isSuccess = await createPost(form);
      if (isSuccess) {
        Alert.alert('Thành công', 'Bài viết đã được đăng thành công');
        router.back();
      }
      else {
        Alert.alert('Thất bại', 'Tạo bài viết thất bại');
      }

    } catch (error) {
      //Alert.alert(error);
      Alert.alert('Thất bại', 'Tạo bài viết thất bại');
      console.log(error);
    } finally {
      setForm({
        content: '',
        media: null,
        mediaType: null,
        communityId: null,
      });

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className='bg-lightBackground h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='pt-2 text-2xl text-lightText font-semibold'>
          Tạo bài viết tại cộng đồng: {name}
        </Text>
        <FormField
          title="Nội dung bài viết"
          value={form.content}
          placeholder="Nhập nội dung bài viết..."
          handleChangeText={(e) => setForm({ ...form, content: e })}
          otherStyles="mt-5 text-black"
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-600 font-pmedium'>
            Tải media
          </Text>
          <TouchableOpacity onPress={() => openPicker()} >
            {form.media ? (
              (form.mediaType == 'Video') ? (
                <Video
                  source={{ uri: form.media.uri }}
                  className='w-full h-64 rounded-2xl'
                  useNativeControls
                  shouldPlay={true}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  isMuted={true}
                />
              ) : (
                <Image
                  source={{ uri: form.media.uri }}
                  className='w-full h-64 rounded-2xl'
                />
              )
            ) : (
              <View className='w-full h-40 px-4 bg-gray-200 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image source={icons.upload}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CustomButton
          title='Đăng bài'
          handlePress={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateCommunityPost