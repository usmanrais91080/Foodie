import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const MainRedirector = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Replace current screen with BioScreen as the first onboarding step
    navigation.replace('Signup');
  }, [navigation]);

  return null; // You can also return a spinner if needed
};

export default MainRedirector;
