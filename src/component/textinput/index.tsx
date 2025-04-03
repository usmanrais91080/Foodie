import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { FC } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import themestyles from '../../assets/styles/themestyles';

type TInputProps = {
  placeholder?: string;
  control?: Control<FieldValues>;
  name?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  rules?: object; 
  label?: string;
};

const Input: FC<TInputProps> = ({
  control,
  name,
  rules,
  placeholder,
  keyboardType,
  label
}) => {
  return (
    <View style={{width:'100%'}}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name || ''}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <>
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType={keyboardType}
              placeholderTextColor={'#000000'}
              style={[styles.input,{fontSize:12}]}
            />
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
    marginTop: 8,
    fontSize: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 5,
    backgroundColor: themestyles.LIGHT_GREY,
    fontSize: 16,
    lineHeight: 19.36,
    fontWeight: '400',
    paddingHorizontal: 10, 
    height: 40,
    borderRadius:5,
  },
  label:{
    fontSize:12,
    fontWeight:"500"
  }
});
