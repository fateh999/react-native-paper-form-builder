import React, {useEffect, Fragment, useState} from 'react';
import {View, LayoutChangeEvent, ScrollView, Platform} from 'react-native';
import {Controller, ValidationOptions} from 'react-hook-form';
import {
  TextInput,
  HelperText,
  useTheme,
  Menu,
  TouchableRipple,
  Subheading,
  Divider,
  Searchbar,
  Checkbox,
  List,
  RadioButton,
  Switch,
} from 'react-native-paper';

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export type FormConfigType = {
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

export type FormConfigArrayType = Array<
  Without<FormConfigType, 'handleSubmit'>
>;

type FormBuilderPropType = {
  formConfigArray: FormConfigArrayType;
  form: any;
  children?: any;
};

function FormBuilder(props: FormBuilderPropType) {
  const {form, formConfigArray, children} = props;
  const {colors} = useTheme();

  useEffect(() => {
    console.log('Render called...', form.errors);
  });

  const onChange = (args: any) => args[0].nativeEvent.text;

  const inputSelector = (input: FormConfigType) => {
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
      propsInput.triggerValidation = form.triggerValidation;
    }

    if (
      input.type === 'checkbox' ||
      input.type === 'radio' ||
      input.type === 'switch'
    ) {
      propsInput.name = input.name;
      propsInput.setValue = form.setValue;
      propsInput.watch = form.watch;
      propsInput.triggerValidation = form.triggerValidation;
    }

    switch (input.type) {
      case 'input': {
        return <TextInput {...propsInput} />;
      }
      case 'select': {
        return <AppDropdown {...propsInput} />;
      }
      case 'autocomplete': {
        return <AppDropdown {...propsInput} autocomplete />;
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
      default: {
        return <TextInput {...propsInput} />;
      }
    }
  };

  const renderAppBuilderItem = (input: FormConfigType, index: number) => (
    <View key={index} style={{marginBottom: 15}}>
      <Controller
        as={inputSelector(input)}
        name={input.name}
        rules={input.rules}
        control={form.control}
        onChange={onChange}
      />
      {form.errors[input.name] && (
        <HelperText
          style={{
            color: colors.error,
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
    autocomplete,
    label,
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
          option =>
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
      style={{marginTop: autocomplete ? 0 : height + 10}}
      visible={showDropdown}
      contentStyle={{width}}
      onDismiss={() => setShowDropdown(false)}
      anchor={
        <Fragment>
          <TouchableRipple onPress={() => setShowDropdown(true)}>
            <TextInput
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
      {autocomplete && (
        <Searchbar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder={`Search ${label}`}
        />
      )}
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
      left={innerProps => (
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
      right={innerProps => (
        <Switch
          value={watch(name)}
          {...props}
          {...innerProps}
          color={error ? colors.error : colors.primary}
          onValueChange={value => setValue(name, value)}
        />
      )}></List.Item>
  );
}

export default FormBuilder;
