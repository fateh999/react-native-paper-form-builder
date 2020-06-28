import { TextInput } from 'react-native-paper';
import { ValidationOptions } from 'react-hook-form';
import { TextStyle, ViewStyle } from 'react-native';
import React from 'react';
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type FormConfigType = {
    name: string;
    type: 'input' | 'select' | 'autocomplete' | 'checkbox' | 'radio' | 'switch' | 'custom';
    variant?: 'outlined' | 'flat';
    options?: Array<{
        value: string | number;
        label: string;
    }>;
    loadOptions?: any;
    jsx?: React.ReactNode;
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
