import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import images from '../../assets';

type TMessageCardProps = {
  onPress: () => void;
  name: string;
  time: string;
  message: string;
};
const MessageCard = ({onPress, time, name, message}: TMessageCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.messageCard}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={images.defaultUserIcon} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.detailContainer}>
          <View style={styles.nameAndTime}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.name}>{time}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  messageCard: {
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 230, 0.87)',
    height: 100,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  detailContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 11,
    color: 'rgba(203, 203, 203, 0.87)',
  },
  nameAndTime: {
    flexDirection: 'row',
    gap: '60%',
  },
  message: {
    fontSize: 12,
    color: 'rgba(134, 134, 134, 0.87)',
  },
});
