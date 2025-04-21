import {StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import themestyles from '../../assets/styles/themestyles';

const Shimmer = ShimmerPlaceHolder;
const HomeSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <Shimmer LinearGradient={LinearGradient} style={styles.title} />
      <Shimmer LinearGradient={LinearGradient} style={styles.subtitle} />
      <View style={styles.searchBarContainer}>
        <Shimmer LinearGradient={LinearGradient} style={styles.searchBar} />
        <Shimmer LinearGradient={LinearGradient} style={styles.notification} />
      </View>
      <View style={styles.bannerContainer}>
        <Shimmer LinearGradient={LinearGradient} style={styles.banner} />
      </View>
      <View style={styles.popularContainer}>
        <Shimmer LinearGradient={LinearGradient} style={styles.popular} />
        <Shimmer LinearGradient={LinearGradient} style={styles.viewAll} />
      </View>
      <View style={styles.postContainer}>
        <Shimmer LinearGradient={LinearGradient} style={styles.leftPost} />
        <Shimmer LinearGradient={LinearGradient} style={styles.rightPost} />
      </View>
      <View style={styles.popularContainer}>
        <Shimmer LinearGradient={LinearGradient} style={styles.popular} />
        <Shimmer LinearGradient={LinearGradient} style={styles.viewAll} />
      </View>
      <View style={styles.postContainer}>
        <Shimmer LinearGradient={LinearGradient} style={styles.leftPost} />
        <Shimmer LinearGradient={LinearGradient} style={styles.rightPost} />
      </View>
    </View>
  );
};

export default HomeSkeletonLoader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: themestyles.SCREEN_HEIGHT * 0.04,
  },
  title: {
    height: 20,
    width: 150,
    borderRadius: 5,
    marginBottom: 15,
  },
  subtitle: {
    height: 20,
    width: 190,
    borderRadius: 5,
  },
  searchBarContainer: {
    marginTop: themestyles.SCREEN_HEIGHT * 0.04,
    flexDirection: 'row',
    gap: 50,
  },
  searchBar: {
    height: 40,
    width: 250,
    borderRadius: 10,
  },
  notification: {
    height: 40,
    width: 60,
    borderRadius: 10,
  },
  bannerContainer: {
    marginTop: themestyles.SCREEN_HEIGHT * 0.04,
  },
  banner: {
    height: 150,
    width: '100%',
    borderRadius: 5,
  },
  popularContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: themestyles.SCREEN_HEIGHT * 0.03,
  },
  popular: {
    height: 15,
    width: 100,
    borderRadius: 5,
  },
  viewAll: {
    height: 15,
    width: 70,
    borderRadius: 5,
  },
  postContainer: {
    flexDirection: 'row',
   gap:themestyles.SCREEN_WIDTH*0.12,
    marginTop: 20,
  },
  leftPost: {
    height: 150,
    width: themestyles.SCREEN_WIDTH * 0.4,
    borderRadius: 7,
  },
  rightPost:{
    height: 150,
    width: themestyles.SCREEN_WIDTH * 0.4,
    borderRadius: 7,
  }
});
