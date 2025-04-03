import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import images from '../../assets';
import themestyles from '../../assets/styles/themestyles';
import {Button, Input} from '../../component';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const Login = () => {

  const LoginSchema = z.object({
    email: z.string().email(),
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
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Input
          placeholder="sdfsdfsd"
          control={control}
          name="email"
          label="Email"
          keyboardType="email-address"
        />
        <Input
          placeholder="sdfsdfsd"
          control={control}
          name="password"
          label="Password"
        />
        <TouchableOpacity style={{justifyContent: 'flex-end'}}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
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
    elevation: 2,
    alignItems: 'center',
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
});
export default Login;
