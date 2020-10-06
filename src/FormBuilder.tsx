import {
  Checkbox,
  Divider,
  HelperText,
  IconButton,
  List,
  Menu,
  Modal,
  Portal,
  RadioButton,
  Searchbar,
  Subheading,
  Surface,
  Switch,
  TextInput,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {Controller, ValidationOptions} from 'react-hook-form';
import {
  FlatList,
  Keyboard,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export type FormConfigType = {
  name: string;
  type:
    | 'input'
    | 'select'
    | 'autocomplete'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'custom';
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
  createTag?: React.ReactNode
};

export type FormConfigArrayType = Array<
  Without<FormConfigType, 'handleSubmit'>
>;

type FormBuilderPropType = {
  formConfigArray: FormConfigArrayType;
  form: any;
  children?: any;
  CustomInput?: React.ReactNode;
  helperTextStyle?: TextStyle;
  inputViewStyle?: ViewStyle;
};

function FormBuilder(props: FormBuilderPropType) {
  const {
    form,
    formConfigArray,
    children,
    CustomInput,
    helperTextStyle,
    inputViewStyle,
  } = props;
  const {colors} = useTheme();
  const Input: any = CustomInput ? CustomInput : TextInput;

  useEffect(() => {
    console.log('Render called...', form.errors);
  });

  const onChange = (args: any) => args[0].nativeEvent.text;

  const inputSelector = (input: FormConfigType) => {
    const JSX: any = input.jsx;
    const propsInput: any = {
      label: input.label,
      error: form.errors[input.name] && form.errors[input.name]?.message,
      mode: input.variant,
      ...input.textInputProps,
    };

    if (input.type === 'select' || input.type === 'autocomplete') {
      propsInput.mode = input.variant;
      propsInput.options = input.options;
      propsInput.name = input.name;
      propsInput.setValue = form.setValue;
      propsInput.watch = form.watch;
      propsInput.triggerValidation = form.triggerValidation || form.trigger;
      propsInput.loadOptions = input.loadOptions;
      if ( input.type === 'autocomplete' ) {
          propsInput.createTag = input.createTag;
      }
    }

    if (
      input.type === 'checkbox' ||
      input.type === 'radio' ||
      input.type === 'switch'
    ) {
      propsInput.name = input.name;
      propsInput.setValue = form.setValue;
      propsInput.watch = form.watch;
      propsInput.triggerValidation = form.triggerValidation || form.trigger;
    }

    switch (input.type) {
      case 'input': {
        return <Input {...propsInput} />;
      }
      case 'select': {
        return <AppDropdown {...propsInput} Input={Input} />;
      }
      case 'autocomplete': {
        return <AppAutocomplete {...propsInput} Input={Input} />;
      }
      case 'checkbox': {
        return <AppCheckbox {...propsInput} />;
      }
      case 'radio': {
        return <AppCheckbox {...propsInput} radio />;
      }
      case 'switch': {
        return <AppSwitch {...propsInput} radio />;
      }
      case 'custom': {
        //@ts-ignore
        return <JSX {...input} />;
      }
      default: {
        return <Input {...propsInput} />;
      }
    }
  };

  const renderAppBuilderItem = (input: FormConfigType, index: number) => (
    <View
      key={index}
      style={{
        marginBottom: input.type === 'custom' ? 0 : 15,
        ...inputViewStyle,
      }}>
      <Controller
        //@ts-ignore
        as={inputSelector(input)}
        name={input.name}
        rules={input.rules}
        control={form.control}
        onChange={onChange}
      />
      {form.errors[input.name] && input.type !== 'custom' && (
        <HelperText
          style={{
            color: colors.error,
            ...helperTextStyle,
          }}>
          {form.errors[input.name]?.message}
        </HelperText>
      )}
    </View>
  );

  return (
    <Fragment>
      {formConfigArray.map(renderAppBuilderItem)}
      {children}
    </Fragment>
  );
}

function AppDropdown(props: any) {
  const {colors} = useTheme();
  const {
    mode,
    options,
    setValue,
    name,
    watch,
    triggerValidation,
    Input,
  } = props;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [displayValue, setDisplayValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (watch(name) === '') {
      return setDisplayValue('');
    } else {
      triggerValidation(name);
    }
    const activeOption = options.find(
      (option: any) => option.value === watch(name),
    );
    setDisplayValue(activeOption?.label);
  }, [watch(name)]);

  useEffect(() => {
    if (searchValue.trim()) {
      setFilteredOptions(
        [...options].filter(
          (option) =>
            option.label.toLowerCase().indexOf(searchValue.toLowerCase()) !==
            -1,
        ),
      );
    } else {
      setFilteredOptions([...options]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.trim()) setSearchValue('');
  }, [showDropdown]);

  return (
    <Menu
      style={{marginTop: height + 10}}
      visible={showDropdown}
      contentStyle={{width}}
      onDismiss={() => setShowDropdown(false)}
      anchor={
        <Fragment>
          <TouchableRipple
            onPress={() => {
              Keyboard.dismiss();
              setShowDropdown(true);
            }}
            rippleColor={'transparent'}>
            <Input
              onLayout={(ev: LayoutChangeEvent) => {
                setWidth(ev.nativeEvent.layout.width);
                setHeight(ev.nativeEvent.layout.height);
              }}
              mode={mode}
              editable={false}
              pointerEvents={'none'}
              {...props}
              value={displayValue}
            />
          </TouchableRipple>
        </Fragment>
      }>
      <ScrollView style={{width, maxHeight: 250}}>
        <Fragment>
          {filteredOptions.map((option: any) => (
            <Fragment key={option.value}>
              <Menu.Item
                onPress={() => {
                  setValue(name, option.value);
                  setShowDropdown(false);
                }}
                title={
                  <Subheading
                    style={{
                      color:
                        watch(name) === option.value
                          ? colors.primary
                          : undefined,
                    }}>
                    {option.label}
                  </Subheading>
                }
                style={{maxWidth: width}}
              />
              <Divider />
            </Fragment>
          ))}
        </Fragment>
      </ScrollView>
    </Menu>
  );
}

function AppAutocomplete(props: any) {
  const {colors} = useTheme();
  const {
    mode,
    options,
    setValue,
    name,
    watch,
    triggerValidation,
    label,
    Input,
    disabled,
    loadOptions,
    createTag
  } = props;
  const [displayValue, setDisplayValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (watch(name) === '') {
      return setDisplayValue('');
    } else {
      triggerValidation(name);
    }
    const activeOption = options.find(
      (option: any) => option.value === watch(name),
    );
    setDisplayValue(activeOption != null ? activeOption?.label : watch(name));
  }, [watch(name)]);

  useEffect(() => {
    if (searchValue.trim()) {
      let editableOption = options.slice()
      const activeOption = options.find((option) => option.value === searchValue.trim().toLowerCase());
      if ( createTag != undefined  && ( activeOption == undefined ) ) {
          editableOption.push({value: searchValue.trim().toLowerCase(), label: searchValue, isNew: true})
      }
      setFilteredOptions(
        [...editableOption].filter(
          (option) =>
            option.label.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !==
            -1,
        ),
      );
    } else {
      setFilteredOptions([...options]);
    }
  }, [searchValue, options]);

  useEffect(() => {
    if (searchValue.trim()) setSearchValue('');
  }, [showDropdown]);

  return (
    <Fragment>
      <TouchableRipple
        disabled={disabled}
        onPress={() => {
          setFilteredOptions([]);
          setTimeout(() => {
            setFilteredOptions([...options]);
          }, 300);
          Keyboard.dismiss();
          setShowDropdown(true);
        }}
        rippleColor={'transparent'}>
        <Input
          mode={mode}
          editable={false}
          pointerEvents={'none'}
          {...props}
          value={displayValue}
        />
      </TouchableRipple>
      <Portal>
        <Modal
          visible={showDropdown}
          dismissable={true}
          onDismiss={() => setShowDropdown(false)}
          contentContainerStyle={{flex: 1}}>
          <Surface style={{flex: 1}}>
            <List.Item
              title={''}
              left={(props: any) => (
                <View style={{justifyContent: 'center'}}>
                  <IconButton
                    icon={'close'}
                    onPress={() => setShowDropdown(false)}
                    {...props}></IconButton>
                </View>
              )}></List.Item>
            <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
              <Searchbar
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder={`Search ${label}`}
              />
            </View>
            <FlatList
              refreshing={options.length === 0 ? true : false}
              onRefresh={() => {
                if (loadOptions) {
                  loadOptions();
                }
              }}
              initialNumToRender={10}
              maxToRenderPerBatch={20}
              extraData={watch(name)}
              keyboardShouldPersistTaps={'handled'}
              data={filteredOptions}
              keyExtractor={(item: any) => `${item.value}`}
              renderItem={({item}) => (
                <Fragment>
                  <Fragment key={item.value}>
                    <List.Item
                      onPress={() => {
                        setValue(name, item.value);
                        setShowDropdown(false);
                      }}
                      title={
                        <Subheading
                          style={{
                            color:
                              watch(name) === item.value
                                ? colors.primary
                                : undefined,
                          }}>
                          {item.label} {(item.isNew && createTag)}
                        </Subheading>
                      }
                    />
                    <Divider />
                  </Fragment>
                </Fragment>
              )}
            />
          </Surface>
        </Modal>
      </Portal>
    </Fragment>
  );
}

function AppCheckbox(props: any) {
  const {colors} = useTheme();
  const [statusValue, setStatusValue] = useState(
    Platform.OS === 'ios' ? 'indeterminate' : 'unchecked',
  );
  const {setValue, name, watch, triggerValidation, label, error, radio} = props;

  useEffect(() => {
    triggerValidation(name);
    if (watch(name) === false) {
      return setStatusValue(
        Platform.OS === 'ios' ? 'indeterminate' : 'unchecked',
      );
    } else {
      return setStatusValue('checked');
    }
  }, [watch(name)]);

  const Input = radio && Platform.OS === 'android' ? RadioButton : Checkbox;

  return (
    <List.Item
      title={label}
      left={(innerProps) => (
        <Input
          status={statusValue}
          {...props}
          {...innerProps}
          color={error ? colors.error : colors.primary}
          onPress={() => setValue(name, !watch(name))}
        />
      )}></List.Item>
  );
}

function AppSwitch(props: any) {
  const {colors} = useTheme();
  const {setValue, name, watch, triggerValidation, label, error} = props;

  useEffect(() => {
    triggerValidation(name);
  }, [watch(name)]);

  return (
    <List.Item
      title={label}
      right={(innerProps) => (
        <Switch
          value={watch(name)}
          {...props}
          {...innerProps}
          color={error ? colors.error : colors.primary}
          onValueChange={(value) => setValue(name, value)}
        />
      )}></List.Item>
  );
}

export default FormBuilder;
