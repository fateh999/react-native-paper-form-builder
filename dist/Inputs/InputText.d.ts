/// <reference types="react" />
import { ControllerRenderProps, FieldValues, UseFormStateReturn } from 'react-hook-form';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
declare type InputTextProps = {
    field: ControllerRenderProps<FieldValues, string>;
    formState: UseFormStateReturn<FieldValues>;
    textInputProps?: Omit<TextInputProps, 'theme'>;
};
declare function InputText(props: InputTextProps): JSX.Element;
export default InputText;
