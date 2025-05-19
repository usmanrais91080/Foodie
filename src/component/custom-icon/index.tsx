import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// Add more imports as needed

type IconType =
  | 'MaterialIcons'
  | 'Ionicons'
  | 'FontAwesome'
  | 'Feather'
  | 'Entypo'
  | 'AntDesign'
  | 'MaterialCommunityIcons'
  | 'FontAwesome5'

type Props = {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
};

const Icon: React.FC<Props> = ({type, name, size = 24, color = 'black'}) => {
  const IconComponent = {
    MaterialIcons,
    Ionicons,
    FontAwesome,
    Feather,
    Entypo,
    AntDesign,
    MaterialCommunityIcons,
    FontAwesome5
  }[type];

  if (!IconComponent) {
    console.warn(`Unknown icon type: ${type}`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color} />;
};

export default Icon;
