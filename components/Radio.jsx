import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants';

const Radio = ({ options, checkedValue, onChange, ortherStyle }) => {
    return (
        <View className={`w-full ${ortherStyle}`}>
            {options.map((option) => {
                let acctive = checkedValue == option.value;
                return (
                    <TouchableOpacity
                        className={`w-full h-10 flex-row items-center mb-2 rounded-md p-2 ${(acctive)?'bg-blue-50':'bg-gray-50'}`}
                        onPress={() => {
                            onChange(option.value)
                        }}
                        key={option.value}
                    >
                        <Image 
                            source={(acctive)?icons.radiocheck:icons.radiouncheck}
                            className='w-5 h-5 mr-2'
                            tintColor={(!acctive)?'#9ca3af':null}
                        />
                        <Text className='text-sm text-gray-800'>{option.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Radio