/// <reference types="react" />
import { ValidationOptions } from 'react-hook-form';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';
import { Theme } from 'react-native-paper/lib/typescript/src/types';
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type OptionalThemeType = {
    theme?: Theme;
};
export declare type FormConfigType = {
    name: string;
    type: 'input' | 'select' | 'autocomplete';
    variant?: 'outlined' | 'flat';
    options?: Array<{
        value: string | number;
        label: string;
    }>;
    label?: string;
    rules?: ValidationOptions;
    textInputProps?: Without<TextInputProps, 'theme'> | OptionalThemeType;
};
export declare type FormConfigArrayType = Array<Without<FormConfigType, 'handleSubmit'>>;
declare type FormBuilderPropType = {
    formConfigArray: FormConfigArrayType;
    form: any;
    children?: any;
};
declare function FormBuilder(props: FormBuilderPropType): JSX.Element;
export default FormBuilder;
