```javascript

type $DeepPartial<T> = {[P in keyof T]?: $DeepPartial<T[P]>};
type FormBuilderProps = {
  formConfigArray: Array<
    Omit<LogicProps, 'control'> | Array<Omit<LogicProps, 'control'>>
  >;
  inputSpacing?: number;
  inputSpacingHorizontal?: number;
  theme?: $DeepPartial<Theme>;
  control: Control<any>;
  setFocus: (name: any) => void;
};

type INPUT_TYPES =
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'custom'
  | 'autocomplete';

type OPTIONS = Array<{label: string; value: string | number}>;

type LogicProps = {
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
};

type InputAutocompleteProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
  CustomAutoComplete?: typeof AutoComplete;
};

type AutoCompleteProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
  field: ControllerRenderProps<FieldValues, string>;
};

type InputSelectProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
};

```
