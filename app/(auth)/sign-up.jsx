import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/apiClient'
import { useGlobalContext } from '../../context/GlobalProvaider'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    userName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    else {
      setIsSubmitting(false);
      try {
        const result1 = await createUser(form.email, form.phone, form.password, form.userName);
        const result = await signIn(form.email, form.password);
        if (result != null) {
          const currentUser = await getCurrentUser();
          setUser(currentUser.user);
          setIsLoggedIn(true);
          // set it to global state...
          router.replace('/home');
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
        <View className="w-full min-h-[85vh] justify-center px-4 my-4s">
          <View className='flex-row items-center pt-2'>
            <Image
              source={images.logo2}
              resizeMode='contain'
              className="w-[35px] h-[35px]"
            />
            <Text
              className="text-2xl text-gray-600 font-psemibold"
            >
              Tạo tài khoản 2Friend
            </Text>
          </View>

          <FormField
            title="Tên người dùng"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt=7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt=7"
            ketboardType="Địa chỉ email"
          />

          <FormField
            title="Số điện thoại"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles="mt=7"
          />

          <FormField
            title="Mật khẩu"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt=7"
          />

          <CustomButton
            title='Tạo tài khoản'
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
              Đã có tài khoản?
            </Text>
            <Link href="/sign-in"
              className='text-lg font-semibold text-secondary-100'
            >
              Đăng nhập
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp