import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { createUser, getCurrentUser, getFriendSuggestions } from '../../lib/apiClient'
import { Alert } from 'react-native'

const testAPI = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        try {
            console.log('hekdsjkf');
            const response = await createUser(email, phone, password, userName);
            Alert.alert('Create succested');
        }
        catch (e) {
            Alert.alert(e.message);
        }


    }
    const onget = async () => {
        try {
            //const response = await createUser(email, phone, password, userName);
            const currentUser = await getFriendSuggestions();
            console.log('curent user', currentUser);
        }
        catch (e) {
            Alert.alert(e.message);
        }


    }
    return (
        <SafeAreaView className='space-y-2'>
            <FormField title={'User name'} value={userName} handleChangeText={e => setUserName(e)} />
            <FormField title={'Email'} value={email} handleChangeText={e => setEmail(e)} />
            <FormField title={'Phone'} value={phone} handleChangeText={e => setPhone(e)} />
            <FormField title={'Password'} value={password} handleChangeText={e => setPassword(e)} />
            <CustomButton title={'Confirm'} handlePress={onSubmit} />
            <CustomButton title={'Get user'} handlePress={onget} />
        </SafeAreaView>
    )
}

export default testAPI