import { View, Text, Image, ScrollView, RefreshControl, TouchableOpacity, Alert, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCommunity } from '../../lib/callAPIClient/CommunityAPI';
import useAppwrite from '../../lib/useAppwrite';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { icons } from '../../constants';
import PostCard from '../../components/PostCard';
import CustomButton from '../../components/CustomButton';
import EmptyState from '../../components/EmptyState';
import { getNewPost } from '../../lib/callAPIClient/PostAPI';

const PrivateCommunity = () => {
  const { CommunityId } = useLocalSearchParams();
  const { data: Community, refech } = useAppwrite(() => getCommunity(CommunityId));
  const { data: posts, refech: refechPost } = useAppwrite(() => getNewPost(1, 10));
  const [thumbnail, setThumbnail] = useState('');
  const [name, setName] = useState('N/A');
  const [description, setDescription] = useState('No description available');
  const [communityMemberType, setCommunityMemberType] = useState('None');
  const [totalMembers, setTotalMembers] = useState(0);
  const [isprivate, setIsprivate] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const validMemberTypes = ['Admin', 'Member', 'Owner'];

  useEffect(() => {
    refech();
  }, [CommunityId])


  useEffect(() => {
    if (!Community) {
      return;
    }

    // Gán giá trị hoặc sử dụng giá trị mặc định nếu thiếu
    setThumbnail(Community.CommunityPictureUrl || '');
    setName(Community.name || 'N/A');
    setDescription(Community.description || 'No description available');
    setCommunityMemberType(Community.CommunityMemberType || 'None');
    setTotalMembers(Community.TotalMembers || 0);
    setIsprivate(Community.Isprivate === true);
  }, [Community]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Re-fetch community data
    await refech();
    setRefreshing(false);
  };

  // Xác định hình ảnh hiển thị (hoặc hình ảnh mặc định)
  const imageSource = thumbnail
    ? { uri: thumbnail }
    : require('../../assets/default.jpg'); // Hình ảnh mặc định

  const outGroupClick = () => {
    Alert.alert('Rời cộng đồng?', `Bạn có muốn rời khỏi ${name} không?`,
      [
        { text: 'Hủy', onPress: () => console.log('cancel') },
        { text: 'Rời cộng đồng', onPress: () => console.log('ok') }
      ]
    )
  }

  const onAddUser = () => {

  }

  const onCreatePost = () => {

  }

  const onJoinGroup = () => {

  }

  const onManage = () => {

  }

  return (

    <MenuProvider>
      <SafeAreaView className="h-full w-full bg-white">
        <ScrollView
          className="w-full h-full "
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Image
            source={imageSource}
            className="w-full h-56"
            resizeMode="cover" // Tùy chọn để hiển thị hình ảnh tốt hơn
          />
          <View className='w-full bg-blue-200 h-1' />
          <View>

          </View>
          <View className="py-2 px-2">
            <View className='flex-row'>
              <Text className="text-3xl font-bold flex-1 px-2">{name}</Text>
              {(validMemberTypes.includes(communityMemberType)) ? (
                <Menu>
                  <MenuTrigger >
                    <Image
                      source={icons.menu}
                      className='w-6 h-6'
                      resizeMode='contain'
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={outGroupClick} text='Rời nhóm' />
                    {(communityMemberType == 'Admin') ? (
                      <MenuOption onSelect={onManage} text='Quản lý thành viên' />
                    ) : (
                      <></>
                    )}
                    <MenuOption>
                      <Text style={{ color: 'red' }}>Hủy</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              ) : (
                <></>
              )}

            </View>

            {(isprivate) ? (
              <View className='flex-row py-1 items-center px-2'>
                <Image
                  source={icons.privategroup}
                  className='h-4 w-5 mr-1'
                  resizeMode='contain'
                />
                <Text>Cộng đồng riêng tư</Text>
              </View>
            ) : (
              <View className='flex-row py-1 items-center px-2'>
                <Image
                  source={icons.publicgroup}
                  className='h-4 w-5 mr-1'
                  resizeMode='contain'
                />
                <Text>Cộng đồng công khai</Text>
              </View>
            )}
            <Text className="text-sm text-gray-600 mt-2 px-2">
              {totalMembers} thành viên
            </Text>
            <Text className="text-sm text-gray-600 mt-2 px-2">Mô tả: {description}</Text>
          </View>
          {(validMemberTypes.includes(communityMemberType)) ? (
            <View className='flex-row p-2'>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onAddUser}
                className={'w-full bg-lightPrimary rounded-xl h-12 justify-center items-center flex-1 mx-1'}
              >
                <Text
                  className='first-letter:text-darkText text-base'
                >
                  Thêm thành viên
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onCreatePost}
                className={'w-full bg-lightPrimary rounded-xl h-12 justify-center items-center flex-1 mx-1'}
              >
                <Text
                  className='first-letter:text-darkText text-base'
                >
                  Tạo bài viết mới
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className='px-2'>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onJoinGroup}
                className={'w-full bg-lightPrimary rounded-xl h-[62px] justify-center items-center'}
              >
                <Text
                  className='first-letter:text-darkText text-lg'
                >
                  Tham gia cộng đồng
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Text className='text-gray-800 px-4 pb-1'>Bài viết</Text>
          {(validMemberTypes.includes(communityMemberType) || !isprivate) ? (
            <FlatList
              data={posts}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <PostCard post={item} />
              )}
              // nếu flat list rỗng sẽ hiển thị phần nội dung này thay cho flat list
              ListEmptyComponent={() => (
                <EmptyState
                  title="Chưa có bài viết nào"
                  subtitle="Hãy là người đang bài viết đầu tiên"
                />
              )}
              scrollEnabled={false}
              // buộc flatlist thay đổi khi post thay đổi
              extraData={posts}
            />
          ) : (
            <EmptyState
              title="Đây là cộng đồng riêng tư"
              subtitle={'Bạn cần tham gia cộng đồng để có thể xem bài viết'}
              enableImg={false}
            />
          )}

        </ScrollView>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default PrivateCommunity;
