
const HomeHeader = React.memo(() => (
    <View className="py-6 px-4 space-y-6">
      <View className="justify-between items-start flex-row md-6">
        <View>
          <Text className="font-pmedium text-sm text-gray-100">
            Welcome Back
          </Text>
          <Text className="text-2xl font-psemibold text-white">
            Quyen
          </Text>
        </View>
        <View className='mt-1.5'>
          <Image
            source={images.logoSmall}
            className='w-9 h-10'
            resizeMode='contain'
          />
        </View>
      </View>
  
      <SearchInput 
        placeholder="Search for a video topic"
      />   
  
      <View className="w-full flex-1 pt-3 pb-8">
        <Text className="text-base text-gray-100 pb-5">
          Lasted video
        </Text>
        <Trending post={lastedPosts ?? []}></Trending>
      </View>  
    </View>
  ));
  
  export default HomeHeader;
  