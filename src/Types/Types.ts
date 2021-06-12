import {ComponentProps} from 'react';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  UseFormStateReturn,
} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import AutoComplete from '../Components/AutoComplete';
import Logic from '../Logic/Logic';

export type $DeepPartial<T> = {[P in keyof T]?: $DeepPartial<T[P]>};
export type FormBuilderProps = {
  formConfigArray: Array<
    Omit<LogicProps, 'control'> | Array<Omit<LogicProps, 'control'>>
  >;
  inputSpacing?: number;
  inputSpacingHorizontal?: number;
  theme?: $DeepPartial<Theme> | Theme;
  control: Control<any>;
  setFocus: (name: any) => void;
  CustomTextInput?: any;
};

export type INPUT_TYPES =
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'custom'
  | 'autocomplete';

export type OPTIONS = Array<{label: string; value: string | number}>;

export type LogicProps = {
  name: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  shouldUnregister?: boolean;
  defaultValue?: unknown;
  type: INPUT_TYPES;
  textInputProps?: ComponentProps<typeof TextInput>;
  options?: OPTIONS;
  control: Control<any>;
  JSX?: typeof Logic;
  inputSpacing?: number;
  inputSpacingHorizontal?: number;
  CustomAutoComplete?: typeof AutoComplete;
  CustomTextInput?: any;
};

export type InputAutocompleteProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: ComponentProps<typeof TextInput>;
  options: OPTIONS;
  CustomAutoComplete?: typeof AutoComplete;
  CustomTextInput?: any;
};

export type AutoCompleteProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  textInputProps?: ComponentProps<typeof TextInput>;
  options: OPTIONS;
  field: ControllerRenderProps<FieldValues, string>;
};

export type InputSelectProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: ComponentProps<typeof TextInput>;
  options: OPTIONS;
  CustomTextInput?: any;
};

export type InputTextProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: ComponentProps<typeof TextInput>;
  CustomTextInput?: any;
};
