import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Controller, Control, FieldValues} from 'react-hook-form';

import themestyles from '../../assets/styles/themestyles';

type TInputProps = {
  placeholder?: string;
  control?: Control<FieldValues>;
  name?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  rules?: object;
  label?: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const Input: FC<TInputProps> = ({
  control,
  name,
  rules,
  placeholder,
  keyboardType,
  label,
  leftIcon,
  rightIcon,
  inputStyle,
  secureTextEntry,
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const dynamicInputStyle = {
    marginTop: label ? 5 : 0,
    marginBottom: label ? 8 : 0,
  } as ViewStyle;

  const inputOutlineColorStyle = {
    borderColor: isFocused ? themestyles.PRIMARY : 'transparent',
    borderWidth: isFocused ? 1 : 0,
  } as ViewStyle;

  return (
    <View style={{width: '100%'}}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name || ''}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.inputContainer,
                dynamicInputStyle,
                inputOutlineColorStyle,
              ]}>
              {leftIcon && <View style={{paddingRight: 10}}>{leftIcon}</View>}
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  setIsFocused(false), onBlur;
                }}
                onFocus={() => setIsFocused(true)}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor={'#000000'}
                style={[styles.input, inputStyle, {fontSize: 12}]}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {rightIcon && (
                <TouchableOpacity onPress={onPress}>
                  {rightIcon}
                </TouchableOpacity>
              )}
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 10,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: themestyles.LIGHT_GREY,
    fontSize: 16,
    lineHeight: 19.36,
    fontWeight: '400',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});
