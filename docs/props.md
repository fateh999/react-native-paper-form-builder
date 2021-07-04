```javascript

type $DeepPartial<T> = {[P in keyof T]?: $DeepPartial<T[P]>};
type FormBuilderProps = {
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
  CustomTextInput?: any;
  onDismiss?: () => void;
};

type InputAutocompleteProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: ComponentProps<typeof TextInput>;
  options: OPTIONS;
  CustomAutoComplete?: typeof AutoComplete;
  CustomTextInput?: any;
};

type AutoCompleteProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  textInputProps?: ComponentProps<typeof TextInput>;
  options: OPTIONS;
  field: ControllerRenderProps<FieldValues, string>;
};

type InputSelectProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: ComponentProps<typeof TextInput>;
  options: OPTIONS;
  CustomTextInput?: any;
};

type InputTextProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: ComponentProps<typeof TextInput>;
  CustomTextInput?: any;
};

```
