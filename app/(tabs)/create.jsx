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

const Create = () => {

  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' 
        ? ['image/png', 'image/jpg', 'image/jpeg']
        : ['video/mp4', 'video/gif']
    })

    if(!result.canceled) {
      if (selectType === 'image') {
        setForm({...form, thumbnail: result.assets[0] })
      }

      if (selectType === 'video') {
        setForm({...form, video: result.assets[0] })
      }
    }
    else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if( !form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert('Please fill in all the fields');
    }

    setUploading(true)
    
    try {
      await createVideo({
        ...form, userId: user.$id
      })

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
          Upload video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles="mt-5 text-black"
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-600 font-pmedium'>
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')} >
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
              {form.thumbnail ? (
                <Image
                  source={{uri: form.thumbnail.uri}}
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