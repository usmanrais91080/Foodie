import React from 'react';
import LottieView from 'lottie-react-native';

export default function SuccessAnimation() {
  return (
    <LottieView source={require('../assets/lottie/success.json')} autoPlay  style={{height:100,width:100}}/>
  );
}