import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import {React, useState} from 'react'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvaider'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

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
          setUser(currentUser);
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
            Login to aora
          </Text>
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
            title='Sign In'
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
              Don't have account?
            </Text>
            <Link href="/sign-up"
              className='text-lg font-semibold text-secondary-100'
            >
              Sign Up
            </Link>
          </View>          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn