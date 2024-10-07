import { View, Text, TextInput, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({title, initialQuery, placeholder, otherStyles, ...props}) => {
    
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');


    const onSearch = () => {
        if(!query) {
            Alert.alert('Missing query', 'Please input to search results across database');
        }
        
        if(pathname.startsWith('/search')) {
            router.setParams({query});
        }
        else {
            router.push(`/search/${query}`);
        }
    }

    return (
        <View
            className={`"space-y-2" ${otherStyles}` }
        >
            <View
                className="border-2 border-black-200 w-full h-16 px-4
                 bg-black-100 rounded-2xl
                 focus:border-secondary
                 items-center flex-row space-x-4"
            >
                <TextInput
                    className='flex-1 text-white font-pregular text-base'
                    value={query}
                    placeholder={placeholder}
                    placeholderTextColor="#CDCDE0"
                    onChangeText={(e) => setQuery(e)}
                    onSubmitEditing={onSearch}
                />                
                <TouchableOpacity
                    onPress={onSearch}
                >
                    <Image
                        source={icons.search}
                        className='h-5 w-5 '
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchInput