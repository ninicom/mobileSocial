import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import FormField from '../../components/FormField'
import { icons } from '../../constants';
import { ResizeMode, Video } from 'expo-av';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvaider';
import community from '../(tabs)/community';
import Radio from '../../components/Radio';
import { createCommunity } from '../../lib/callAPIClient/CommunityAPI';


const CreateCommunity = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    communityName: '',
    description: null,
    media: null,
    mediaType: null,
    isPrivate: false,
  });

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/png', 'image/jpg', 'image/jpeg']
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
    if (!form.communityName) {
      return Alert.alert('Vui lòng nhập tên cộng đồng!');
    }

    setUploading(true)

    try {
      var isSuccess = await createCommunity(form);
      if (isSuccess) {
        Alert.alert('Thành công', 'Tạo nhóm thành công');
        setForm({
          communityName: '',
          description: null,
          media: null,
          mediaType: null,
          isPrivate: null,
        });
  
        router.push('/home');
      }
      else {
        Alert.alert('Thất bại', 'Tạo nhóm thất bại')
      }

    } catch (error) {
      //Alert.alert(error);
      Alert.alert('Thất bại', 'Tạo nhóm thất bại')
      console.log(error);
    } finally {      
      setUploading(false);
    }
  }

  return (
    <SafeAreaView className='bg-lightBackground h-full'>
      <ScrollView className='px-2'>
        <Text className='pt-2 text-2xl text-lightText font-semibold'>
          Tạo cộng đồng
        </Text>
        <FormField
          title="Tên cộng đồng"
          isMultiline={false}
          value={form.communityName}
          placeholder="Nhập tên cộng đồng của bạn"
          handleChangeText={(e) => setForm({ ...form, communityName: e })}
          otherStyles="mt-1 text-black"
        />
        <FormField
          title="Mô tả cộng đồng"
          value={form.description}
          isMultiline={true}
          placeholder="Nhập mô tả cộng đồng của bạn"
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="text-black"
        />
        <Text className='text-base text-gray-600 font-pmedium pt-2'>
          Quyền riêng tư
        </Text>
        <Radio
          options={[
            { label: 'Công khai', value: false },
            { label: 'Riêng tư', value: true }
          ]}
          checkedValue={form.isPrivate}
          onChange={(e) => setForm({ ...form, isPrivate: e })}
          ortherStyle={'pt-2'}
        />
        <View className='space-y-2'>
          <Text className='text-base text-gray-600 font-pmedium'>
            Chọn ảnh bìa nhóm
          </Text>
          <TouchableOpacity onPress={() => openPicker()} >
            {form.media ? (
              (form.mediaType == 'Image') ? (
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
                  className='w-full h-40 rounded-2xl'
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
          title='Tạo nhóm và thêm thành viên'
          handlePress={submit}
          containerStyles='mt-7 mb-10'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateCommunity