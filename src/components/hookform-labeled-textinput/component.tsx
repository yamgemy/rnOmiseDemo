import React, { FC, useRef, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setApiErrorMessage } from 'src/actions/credit-card-actions';
import { styles } from './styles';

interface HookFormLabeledTextInputProps extends TextInputProps {
  label: string;
  form: UseFormReturn<any>;
  inputName: string;
  modifiedString?: (text:string) => string
  valueSetter?: any
}

export const HookformLabeledTextInpout: FC<HookFormLabeledTextInputProps> = ({
  label,
  form,
  inputName,
  modifiedString,
  valueSetter,
  ...props
}) => {
  const {
    register,
    control,
    formState: {defaultValues},
  } = form;
  const dispatch = useDispatch<any>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isEditingTImeoutRef = useRef<NodeJS.Timeout>();

  const handleTextChange = (
    text: string,
    onChange: (...event: any[]) => void,
  ) => {
    !isEditing && setIsEditing(true);
    const targetValue = modifiedString ? modifiedString(text) : text;
    onChange(targetValue);
    valueSetter && valueSetter(targetValue);
    if (isEditingTImeoutRef.current) {
      clearTimeout(isEditingTImeoutRef.current);
    }
    isEditingTImeoutRef.current = setTimeout(() => {
      setIsEditing(false);
    }, 500);
    dispatch(setApiErrorMessage(''));
  };

  return (
    <View style={styles.root}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>
      <Controller
          control={control}
          name={inputName}
          render={({field: {onChange}, fieldState : {invalid, error}}) => (
            <>
              <View style={styles.inputWrap}>
                <TextInput
                    {...register(inputName)}
                    defaultValue={(defaultValues && defaultValues[inputName]?.toString()) ?? ''}
                    onChange={onChange}
                    onChangeText={(text) => handleTextChange(text, onChange)}
                    style={styles.inputText}
                    {...props}
                />
              </View>
              <View style={styles.errorTextContainer}>
                {invalid && !isEditing && (
                  <Text style={styles.errorText}>
                    {error ? error.message : ''}
                  </Text>
                )}
              </View>
            </>
          )}
      />
    </View>
  );
};