import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import themestyles from '../../assets/styles/themestyles';
import {Header, MessageCard} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type MainStackParamList = {
  ConversationScreen: undefined;
};

type NavigationProps = StackNavigationProp<MainStackParamList>;
const Chat = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleOnpress = useCallback(function handleOnpress() {
    navigation.navigate('ConversationScreen');
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Chat" fontWeight={'700'} />
      <View style={{marginTop: 30}}>
        <MessageCard
          name="Usman"
          time="12:00"
          message="Your order has been arrived!"
          onPress={handleOnpress}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingTop:
      Platform.OS === 'ios'
        ? themestyles.SCREEN_HEIGHT * 0.03
        : themestyles.SCREEN_HEIGHT * 0.032,
    paddingHorizontal: 15,
  },
});
