import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import themestyles from '../../assets/styles/themestyles';
import {Header} from '../../component';
import images from '../../assets';
import CustomSelectorModal from '../../component/modal';
import i18n from '../../component/translation/i18n';
import {StackNavigationProp} from '@react-navigation/stack';

type AuthStackParamList = {
  Login: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParamList>;

const Profile = () => {
  const [profileImage, setProfileImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleLogOut = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const LANGUAGES_DATA = [
    {id: '1', name: 'English', code: 'en'},
    {id: '2', name: 'Spanish', code: 'sp'},
    {id: '3', name: 'French', code: 'fr'},
  ];

  const PROFILE_DATA = [
    {
      id: 1,
      title: 'Edit Profile',
      image: (
        <Icon
          name="location-history"
          size={28}
          color={themestyles.COLOR_BLACK}
        />
      ),
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Payment Methods',
      image: <Icon name="payment" size={28} color={themestyles.COLOR_BLACK} />,
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Language',
      image: <Icon name="language" size={28} color={themestyles.COLOR_BLACK} />,
      onPress: () => setModalVisible(true),
    },
    {
      id: 4,
      title: 'Order History',
      image: <Icon name="history" size={28} color={themestyles.COLOR_BLACK} />,
      onPress: () => {},
    },
    {
      id: 5,
      title: 'Sign Out',
      image: <Icon name="logout" size={28} color={'red'} />,
      onPress: () => {
        handleLogOut();
      },
    },
  ];

  useEffect(function showUserEmail() {
    const user = auth().currentUser;
    if (user) {
      setUserEmail(user.email||'no email found');
      setUsername(user.displayName || 'No username found');
    }
  }, []);

  const renderItemList = (item: any) => {
    // iska mtlb h k item.title equal ho language agr language select na ki ho tu language text deka do ni tu selected language deka do
    const displayTitle =
      item.title === 'Language' && selectedItem ? selectedItem : item.title;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={item.onPress}>
        <View style={styles.listContainer}>
          <View style={styles.listIcon}>{item.image}</View>
          <Text
            style={[
              styles.listText,
              {color: item.title === 'Sign Out' ? 'red' : undefined},
            ]}>
            {displayTitle}
          </Text>
          {item.title === 'Sign Out' ? null : (
            <Icon
              name="chevron-right"
              size={25}
              color={themestyles.COLOR_BLACK}
              style={styles.arrowIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" gap={25} />
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <Image source={images.defaultUserIcon} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.cameraIcon}>
        <Icon name="photo-camera" size={20} color={themestyles.COLOR_WHITE} />
      </View>
      <View style={styles.nameEmailContainer}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </View>
      <View style={styles.itemListContainer}>
        <FlatList
          data={PROFILE_DATA}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderItemList(item)}
          scrollEnabled={false}
        />
      </View>
      <CustomSelectorModal
        visible={modalVisible}
        title={t('selectLanguage')}
        data={LANGUAGES_DATA}
        onSelect={item => {
          setSelectedItem(item.name);
          handleLanguageChange(item.code);
          console.log('Selected language:', item);
        }}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingHorizontal: 10,
    paddingTop:
      Platform.OS === 'ios'
        ? themestyles.SCREEN_HEIGHT * 0.03
        : themestyles.SCREEN_HEIGHT * 0.032,
  },
  icon: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  nameEmailContainer: {
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'column',
    gap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: themestyles.COLOR_BLACK,
  },
  email: {
    fontSize: 15,
    color: themestyles.DARK_GREY_CONSENT_MODAL,
  },
  itemListContainer: {
    marginTop: 20,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: themestyles.LIGHT_GREY,
    borderRadius: 10,
    marginTop: 15,
  },
  listIcon: {
    width: 30,
    height: 30,
  },
  listText: {
    fontSize: 16,
    color: themestyles.COLOR_BLACK,
    marginLeft: 10,
    fontWeight: '500',
  },
  arrowIcon: {position: 'absolute', right: 20},
  cameraIcon: {
    position: 'absolute',
    top: themestyles.SCREEN_HEIGHT * 0.27,
    right: themestyles.SCREEN_WIDTH * 0.32,
    backgroundColor: themestyles.PRIMARY,
    height: 28,
    width: 28,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
