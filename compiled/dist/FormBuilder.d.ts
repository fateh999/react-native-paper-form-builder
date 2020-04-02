import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ValidationOptions } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type FormConfigType = {
    name: string;
    type: 'input' | 'select' | 'autocomplete' | 'checkbox' | 'radio' | 'switch';
    variant?: 'outlined' | 'flat';
    options?: Array<{
        value: string | number;
        label: string;
    }>;
    label?: string | React.ReactNode;
    rules?: ValidationOptions;
    textInputProps?: React.ComponentProps<typeof TextInput>;
};
export declare type FormConfigArrayType = Array<Without<FormConfigType, 'handleSubmit'>>;
declare type FormBuilderPropType = {
    formConfigArray: FormConfigArrayType;
    form: any;
    children?: any;
    CustomInput?: React.ReactNode;
    helperTextStyle?: TextStyle;
    inputViewStyle?: ViewStyle;
};
declare function FormBuilder(props: FormBuilderPropType): JSX.Element;
export default FormBuilder;
