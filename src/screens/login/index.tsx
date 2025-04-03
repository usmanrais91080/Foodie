import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import images from '../../assets';
import themestyles from '../../assets/styles/themestyles';
import {Button, Input} from '../../component';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

type AuthStackParamList = {
  SignUp: undefined;
};
type NavigationProps = StackNavigationProp<AuthStackParamList>;
const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const LoginSchema = z.object({
    email: z
      .string()
      .min(1, 'Email Required')
      .max(30, 'Email cannot be more than 30 characters')
      .email(),
    password: z.string().min(6),
  });

  type FormValue = z.infer<typeof LoginSchema>;
  const {control, handleSubmit} = useForm<FormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = data => {
    console.log(data);
  };
  const navigation = useNavigation<NavigationProps>();

  const togglePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword, setShowPassword]);

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Input
          placeholder="Email"
          control={control}
          name="email"
          label="Email"
          keyboardType="email-address"
          leftIcon={<Icon name="person" size={18} color="black" />}
        />
        <Input
          placeholder="Password"
          control={control}
          secureTextEntry={showPassword}
          name="password"
          label="Password"
          leftIcon={<Icon name="lock" size={18} color="black" />}
          rightIcon={
            showPassword ? (
              <Icon
                name="visibility-off"
                size={18}
                color="black"
                onPress={togglePassword}
              />
            ) : (
              <Icon
                name="visibility"
                size={18}
                color="black"
                onPress={togglePassword}
              />
            )
          }
        />
        <TouchableOpacity style={styles.forgotTextContainer}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image source={images.google} style={styles.googleIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.facebook} style={styles.googleIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.dontHaveText}>Don't have an account?</Text>
      <TouchableOpacity style={styles.Register}>
        <Text
          style={{
            color: themestyles.PRIMARY,
            textTransform: 'uppercase',
            fontWeight: '600',
          }}
          onPress={() => navigation.navigate('SignUp')}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  logo: {
    height: themestyles.SCREEN_HEIGHT * 0.2,
    width: themestyles.SCREEN_WIDTH * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formContainer: {
    backgroundColor: themestyles.COLOR_WHITE,
    height: 400,
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
    marginTop: 20,
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
});
export default Login;
