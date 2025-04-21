import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';

type LoaderProps = {
  loading: boolean;
  message?: string;
};
const Loader: React.FC<LoaderProps> = ({loading, message}) => {
  if (!loading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'small'} color={themestyles.PRIMARY} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center'
  }
});
