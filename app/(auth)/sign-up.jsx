import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import {React, useState} from 'react'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvaider'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.userName || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    else{
      setIsSubmitting(false);
      try {
        const result = await createUser(form.email, form.password, form.userName);
        setUser(result);
        setIsLoggedIn(true);
        // set it to global state...
        router.replace('/home');
      } catch (error) {
        Alert.alert('Error', error);
      } finally {
        setIsSubmitting(false);
      }
    }    
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-4">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text
            className="text-2xl text-white font-psemibold mt-10 pb-5"
          >
            Sign up to Aora
          </Text>

            
          <FormField 
            title="Username"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt=7"
          />

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt=7"
            ketboardType="email-address"
          />
          
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt=7"
          />

          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View 
            className='justify-center pt-5 flex-row gap-2 font-pregular'
          >
            <Text
              className='text-lg text-gray-100 font-pregular'
            >
              Have an account already?
            </Text>
            <Link href="/sign-in"
              className='text-lg font-semibold text-secondary-100'
            >
              Sign In
            </Link>
          </View>          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp