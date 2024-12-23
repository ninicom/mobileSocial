import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import {React, useState} from 'react'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/apiClient'
import { useGlobalContext } from '../../context/GlobalProvaider'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    else{
      setIsSubmitting(false);
      try {
        const result = await signIn(form.email, form.password);
        if(result!=null){
          const currentUser = await getCurrentUser();
          setUser(currentUser.user);
          setIsLoggedIn(true);
          // set it to global state...
          router.replace('/home');
        }
        else {
          Alert.alert('Invalid', 'Invalid credentials. Please check the email and password.');
        }
      } catch (error) {
        Alert.alert('Error', error);
      } finally {
        setIsSubmitting(false);
      }
    }    
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-4">
          <Image 
            source={images.logo2}
            resizeMode='contain'
            className="w-[115px] h-[65px]"
          />
          <Text
            className="text-2xl text-gray-600 font-psemibold mt-10 pb-5"
          >
            Đăng nhập 2Friend
          </Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt=7"
            ketboardType="Địa chỉ email"
            isMultiline={false}
          />
          
          <FormField 
            title="Mật khẩu"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt=7"
            onsubmit={submit}
            isMultiline={false}
          />

          <CustomButton
            title='Đăng nhập'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View 
            className='justify-center pt-5 flex-row gap-2 font-pregular'
          >
            <Text
              className='text-lg text-gray-500 font-pregular'
            >
              Chưa có tài khoản?
            </Text>
            <Link href="/sign-up"
              className='text-lg font-semibold text-secondary-100'
            >
              Tạo tài khoản
            </Link>
          </View>          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn