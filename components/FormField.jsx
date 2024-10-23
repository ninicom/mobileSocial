import { View, Text, TextInput, Image } from 'react-native'
import React, {useState} from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, isMultiline=true, textBoxMinHeight=64, textInputStyle, titleStyle, onsubmit, ...props}) => {
    
    const [showPassword, setshowPassword] = useState(false)

    return (
        <View
            className={`${otherStyles}` }
        >   
            {   
            title?(
                <Text
                    className={`text-base text-gray-600 font-pmedium py-2 ${titleStyle}`}
                    >
                    {title}
                </Text>
                ):(<></>)
            }
            
            <View
                className={`border-2 border-gray-300 w-full px-4 bg-lightBackground rounded-2xl focus:border-lightPrimary items-center flex-row`}
            >
                <TextInput
                    className={`flex-1 text-lightText font-psemibold text-base ${textInputStyle}`}
                    style={{minHeight:textBoxMinHeight}}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#CDCDE0"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    multiline={isMultiline}          
                    onsubmit={onsubmit}                     
                />
                {
                    title === "Password" && (
                        <TouchableOpacity onPress={() => setshowPassword(!showPassword)} >
                            <Image source={!showPassword? icons.eye : icons.eyeHide} className="w-8 h-8" resizeMode='contain'/>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

export default FormField