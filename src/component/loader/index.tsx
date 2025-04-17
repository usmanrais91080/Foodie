import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';

type LoaderProps = {
  loading: boolean;
  message?: string;
};
const Loader: React.FC<LoaderProps> = ({loading, message}) => {
  if (!loading) return null;
  return (
    <View>
      <ActivityIndicator size={'small'} color={themestyles.PRIMARY} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

export default Loader;

// const styles = StyleSheet.create({});
