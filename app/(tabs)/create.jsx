import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import {React, useState} from 'react'
import FormField from '../../components/FormField'
import { icons } from '../../constants';
import { ResizeMode, Video } from 'expo-av';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvaider';
import { createPost } from '../../lib/callAPIClient/PostAPI';

const Create = () => {

  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    content: '',
    media: null,
    communityId: null,
  });

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/gif']
    })

    if(!result.canceled) {
      setForm({...form, media: result.assets[0] })
    }
    else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if( !form.content || !form.media) {
      return Alert.alert('Please fill in all the fields');
    }

    setUploading(true)
    
    try {
      await createPost(form);

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error);
      console.log('Upload error:', error);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      });

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className='bg-lightBackground h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='pt-2 text-2xl text-lightText font-semibold'>
          Upload post
        </Text>
        <FormField
          title="Post content"
          value={form.content}
          placeholder="Give your post a catch content..."
          handleChangeText={(e) => setForm({...form, content: e})}
          otherStyles="mt-5 text-black"
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-600 font-pmedium'>
            Upload media
          </Text>
          <TouchableOpacity onPress={() => openPicker()} >
            {form.video ? (
              <Video
                source={{uri: form.video.uri}}
                className='w-full h-64 rounded-2xl'
                useNativeControls
                shouldPlay = {true}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                isMuted={true}
              />
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
          <View className='mt-7 space-y-2'>   
            <Text className='text-base text-gray-600 font-pmedium'>
              Thumbnail Image
            </Text>
            <TouchableOpacity onPress={() => openPicker('image')}>
              {form.media ? (
                <Image
                  source={{uri: form.media.uri}}
                  className='w-full h-64 rounded-2xl'
                  resizeMode='cover'
                />
              ) : (
                <View className='w-full h-16 px-4 bg-lightPrimary rounded-2xl justify-center items-center flex-row space-x-2'>
                    <Image source={icons.upload}
                      resizeMode='contain'
                      className='w-5 h-5'
                    />
                    <Text className='text-sm text-darkText font-psemibold'>
                      Choose a file
                    </Text>
                </View>
              )}
            </TouchableOpacity>         
          </View>
          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The prompt you use to this video"
            handleChangeText={(e) => setForm({...form, prompt: e})}
            otherStyles="mt-17 text-white"
          />
        </View>
        <CustomButton 
          title='Submit & Publish'
          handlePress={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create