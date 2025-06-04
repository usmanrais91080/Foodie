import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import images from '../../assets';
import themestyles from '../../assets/styles/themestyles';
import {useToast} from '../../component/toast';
import {Button, Input} from '../../component';
import {registerWithEmailAndPassword} from '../../auth';

type AuthStackParamList = {
  Login: undefined;
  Home: undefined;
  BioScreen: undefined;
};
type NavigationProps = StackNavigationProp<AuthStackParamList>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  const {showToast} = useToast();

  const LoginSchema = z.object({
    name: z.string().min(1, 'Required'),
    email: z.string().email(),
    password: z.string().min(6),
  });

  type FormValue = z.infer<typeof LoginSchema>;
  const {control, handleSubmit} = useForm<FormValue>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  const togglePassword = useCallback(() => {
    setShowPassword(showPassword => !showPassword);
  }, []);

  const handleSignUp = async (formData: FormValue) => {
    setLoading(true);
    try {
      const userData = await registerWithEmailAndPassword({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(userData);
      navigation.navigate('BioScreen');
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        showToast({
          message: 'That email address is already in use!',
          type: 'error',
        });
      } else if (error.code === 'auth/invalid-email') {
        showToast({
          message: 'That email address is invalid!',
          type: 'error',
        });
      } else {
        showToast({
          message: error?.message || 'Something went wrong',
          type: 'error',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Signup</Text>
        <Input
          placeholder="Name"
          control={control}
          name="name"
          label="Name"
          keyboardType="email-address"
          leftIcon={<Icon name="person" size={18} color="black" />}
        />
        <Input
          placeholder="Email"
          control={control}
          name="email"
          label="Email"
          keyboardType="email-address"
          leftIcon={<Icon name="email" size={18} color="black" />}
        />
        <Input
          placeholder="Password"
          control={control}
          name="password"
          label="Password"
          secureTextEntry={showPassword}
          leftIcon={<Icon name="lock" size={18} color="black" />}
          rightIcon={
            showPassword ? (
              <Icon
                name="visibility"
                size={18}
                color="black"
                onPress={togglePassword}
              />
            ) : (
              <Icon
                name="visibility-off"
                size={18}
                color="black"
                onPress={togglePassword}
              />
            )
          }
        />
        <Button
          title="Create an Account"
          onPress={handleSubmit(handleSignUp)}
          isLoading={loading}
          style={styles.button}
        />
      </View>
      <Text style={styles.dontHaveText}>Already have an account?</Text>
      <TouchableOpacity style={styles.Register}>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: themestyles.SCREEN_HEIGHT * 0.2,
    width: themestyles.SCREEN_WIDTH * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formContainer: {
    backgroundColor: themestyles.COLOR_WHITE,
    height: 380,
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 25,
    elevation: 4,
    alignItems: 'center',
    shadowColor: themestyles.DARK_BLACK,
    shadowOffset: {height: 2, width: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: 300,
    height: 30,
    backgroundColor: 'red',
  },
  orText: {
    color: themestyles.PRIMARY,
  },
  forgotTextContainer: {alignItems: 'flex-end', width: '100%'},
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    gap: 10,
  },
  googleIcon: {
    height: 30,
    width: 30,
  },
  dontHaveText: {
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 20,
  },
  Register: {
    alignSelf: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 28,
  },
  loginText: {
    color: themestyles.PRIMARY,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});
export default SignUp;
