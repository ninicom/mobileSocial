import { View, Text, TextInput, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({title, initialQuery, placeholder, otherStyles, path='/search', ...props}) => {
    
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');


    const onSearch = () => {
        if(!query) {
            Alert.alert('Missing query', 'Please input to search results across database');
        }
        else {
            if(pathname.startsWith(path)) {
                router.setParams({query});
            }
            else {
                router.push(`${path}/${query}`);
            }
        }
    }

    return (
        <View
            className={`"space-y-2" ${otherStyles}` }
        >
            <View
                className="border-2 border-gray-300 w-full h-16 px-4
                 bg-lightBackground rounded-2xl
                 focus:border-primary
                 items-center flex-row space-x-4"
            >
                <TextInput
                    className='flex-1 text-lightText font-pregular text-base'
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