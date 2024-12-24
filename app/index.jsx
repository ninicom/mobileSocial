import { Text, View, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants"
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvaider";

export default function App() {

    const {isLoading, isLoggedIn} = useGlobalContext();
    if(!isLoading && isLoggedIn) {
        return <Redirect href="/home"/>
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{height: '100.06%'}}>
                <View className='w-full justify-center items-center min-h-[85vh] px-4'>
                    <Image 
                        source={images.logo2} 
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[40vh]"
                        resizeMode="contain"
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-gray-600 font-bold text-center">
                            Khám phá những khả năng vô tận với
                            <Text className="text-secondary-200"> 2Friend</Text>
                        </Text>
                        <Image 
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                            resizeMethod="contain"
                        />
                    </View>

                    <Text className="text-sm font-pregular text-gray-500 mt-7 text-center">
                        Nơi sự sáng tạo gặp gỡ sự đổi mới: bắt đầu hành trình khám phá vô hạn với 2Friend
                    </Text>

                    <CustomButton 
                        title="Tiếp tục với Email"
                        handlePress = {()=> router.push('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>            
        </SafeAreaView>
    );
}
