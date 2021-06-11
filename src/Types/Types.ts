import {ComponentProps} from 'react';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  UseFormStateReturn,
} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import {Theme} from 'react-native-paper/lib/typescript/types';
import AutoComplete from '../Components/AutoComplete';
import Logic from '../Logic/Logic';

export type $DeepPartial<T> = {[P in keyof T]?: $DeepPartial<T[P]>};
export type FormBuilderProps = {
  formConfigArray: Array<Omit<LogicProps, 'control'>>;
  inputSpacing?: number;
  theme?: $DeepPartial<Theme>;
  control: Control<any>;
  setFocus: (name: any) => void;
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
  CustomAutoComplete?: typeof AutoComplete;
};

export type InputAutocompleteProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
  CustomAutoComplete?: typeof AutoComplete;
};

export type AutoCompleteProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
  field: ControllerRenderProps<FieldValues, string>;
};

export type InputSelectProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
};
