import React, { useEffect, Fragment, useState } from 'react';
import { View, ScrollView, Platform, Keyboard, } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText, useTheme, Menu, TouchableRipple, Subheading, Divider, Searchbar, Checkbox, List, RadioButton, Switch, Modal, Portal, Surface, IconButton, } from 'react-native-paper';
//@ts-ignore
import KeyboardSpacer from './KeyboardSpacer';
function FormBuilder(props) {
    const { form, formConfigArray, children, CustomInput, helperTextStyle, inputViewStyle, } = props;
    const { colors } = useTheme();
    const Input = CustomInput ? CustomInput : TextInput;
    useEffect(() => {
        console.log('Render called...', form.errors);
    });
    const onChange = (args) => args[0].nativeEvent.text;
    const inputSelector = (input) => {
        const propsInput = {
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
        if (input.type === 'checkbox' ||
            input.type === 'radio' ||
            input.type === 'switch') {
            propsInput.name = input.name;
            propsInput.setValue = form.setValue;
            propsInput.watch = form.watch;
            propsInput.triggerValidation = form.triggerValidation;
        }
        switch (input.type) {
            case 'input': {
                return <Input {...propsInput}/>;
            }
            case 'select': {
                return <AppDropdown {...propsInput} Input={Input}/>;
            }
            case 'autocomplete': {
                return <AppAutocomplete {...propsInput} Input={Input}/>;
            }
            case 'checkbox': {
                return <AppCheckbox {...propsInput}/>;
            }
            case 'radio': {
                return <AppCheckbox {...propsInput} radio/>;
            }
            case 'switch': {
                return <AppSwitch {...propsInput} radio/>;
            }
            default: {
                return <Input {...propsInput}/>;
            }
        }
    };
    const renderAppBuilderItem = (input, index) => (<View key={index} style={{ marginBottom: 15, ...inputViewStyle }}>
      <Controller as={inputSelector(input)} name={input.name} rules={input.rules} control={form.control} onChange={onChange}/>
      {form.errors[input.name] && (<HelperText style={{
        color: colors.error,
        ...helperTextStyle,
    }}>
          {form.errors[input.name]?.message}
        </HelperText>)}
    </View>);
    return (<Fragment>
      {formConfigArray.map(renderAppBuilderItem)}
      {children}
    </Fragment>);
}
function AppDropdown(props) {
    const { colors } = useTheme();
    const { mode, options, setValue, name, watch, triggerValidation, Input, } = props;
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [displayValue, setDisplayValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    useEffect(() => {
        if (watch(name) === '') {
            return setDisplayValue('');
        }
        else {
            triggerValidation(name);
        }
        const activeOption = options.find((option) => option.value === watch(name));
        setDisplayValue(activeOption?.label);
    }, [watch(name)]);
    useEffect(() => {
        if (searchValue.trim()) {
            setFilteredOptions([...options].filter(option => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                -1));
        }
        else {
            setFilteredOptions([...options]);
        }
    }, [searchValue]);
    useEffect(() => {
        if (searchValue.trim())
            setSearchValue('');
    }, [showDropdown]);
    return (<Menu style={{ marginTop: height + 10 }} visible={showDropdown} contentStyle={{ width }} onDismiss={() => setShowDropdown(false)} anchor={<Fragment>
          <TouchableRipple onPress={() => {
        Keyboard.dismiss();
        setShowDropdown(true);
    }} rippleColor={'transparent'}>
            <Input onLayout={(ev) => {
        setWidth(ev.nativeEvent.layout.width);
        setHeight(ev.nativeEvent.layout.height);
    }} mode={mode} editable={false} pointerEvents={'none'} {...props} value={displayValue}/>
          </TouchableRipple>
        </Fragment>}>
      <ScrollView style={{ width, maxHeight: 250 }}>
        <Fragment>
          {filteredOptions.map((option) => (<Fragment key={option.value}>
              <Menu.Item onPress={() => {
        setValue(name, option.value);
        setShowDropdown(false);
    }} title={<Subheading style={{
        color: watch(name) === option.value
            ? colors.primary
            : undefined,
    }}>
                    {option.label}
                  </Subheading>} style={{ maxWidth: width }}/>
              <Divider />
            </Fragment>))}
        </Fragment>
      </ScrollView>
    </Menu>);
}
function AppAutocomplete(props) {
    const { colors } = useTheme();
    const { mode, options, setValue, name, watch, triggerValidation, label, Input, } = props;
    const [displayValue, setDisplayValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    useEffect(() => {
        if (watch(name) === '') {
            return setDisplayValue('');
        }
        else {
            triggerValidation(name);
        }
        const activeOption = options.find((option) => option.value === watch(name));
        setDisplayValue(activeOption?.label);
    }, [watch(name)]);
    useEffect(() => {
        if (searchValue.trim()) {
            setFilteredOptions([...options].filter(option => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                -1));
        }
        else {
            setFilteredOptions([...options]);
        }
    }, [searchValue]);
    useEffect(() => {
        if (searchValue.trim())
            setSearchValue('');
    }, [showDropdown]);
    return (<Fragment>
      <TouchableRipple onPress={() => {
        Keyboard.dismiss();
        setShowDropdown(true);
    }} rippleColor={'transparent'}>
        <Input mode={mode} editable={false} pointerEvents={'none'} {...props} value={displayValue}/>
      </TouchableRipple>
      <Portal>
        <Modal visible={showDropdown} dismissable={true} onDismiss={() => setShowDropdown(false)} contentContainerStyle={{ flex: 1 }}>
          <Surface style={{ flex: 1 }}>
            <List.Item title={''} left={(props) => (<View style={{ justifyContent: 'center' }}>
                  <IconButton icon={'close'} onPress={() => setShowDropdown(false)} {...props}></IconButton>
                </View>)}></List.Item>
            <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
              <Searchbar value={searchValue} onChangeText={setSearchValue} placeholder={`Search ${label}`}/>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <Fragment>
                {filteredOptions.map((option) => (<Fragment key={option.value}>
                    <List.Item onPress={() => {
        setValue(name, option.value);
        setShowDropdown(false);
    }} title={<Subheading style={{
        color: watch(name) === option.value
            ? colors.primary
            : undefined,
    }}>
                          {option.label}
                        </Subheading>}/>
                    <Divider />
                  </Fragment>))}
              </Fragment>
            </ScrollView>
            {Platform.OS === 'ios' ? <KeyboardSpacer /> : <Fragment />}
          </Surface>
        </Modal>
      </Portal>
    </Fragment>);
}
function AppCheckbox(props) {
    const { colors } = useTheme();
    const [statusValue, setStatusValue] = useState(Platform.OS === 'ios' ? 'indeterminate' : 'unchecked');
    const { setValue, name, watch, triggerValidation, label, error, radio } = props;
    useEffect(() => {
        triggerValidation(name);
        if (watch(name) === false) {
            return setStatusValue(Platform.OS === 'ios' ? 'indeterminate' : 'unchecked');
        }
        else {
            return setStatusValue('checked');
        }
    }, [watch(name)]);
    const Input = radio && Platform.OS === 'android' ? RadioButton : Checkbox;
    return (<List.Item title={label} left={innerProps => (<Input status={statusValue} {...props} {...innerProps} color={error ? colors.error : colors.primary} onPress={() => setValue(name, !watch(name))}/>)}></List.Item>);
}
function AppSwitch(props) {
    const { colors } = useTheme();
    const { setValue, name, watch, triggerValidation, label, error } = props;
    useEffect(() => {
        triggerValidation(name);
    }, [watch(name)]);
    return (<List.Item title={label} right={innerProps => (<Switch value={watch(name)} {...props} {...innerProps} color={error ? colors.error : colors.primary} onValueChange={value => setValue(name, value)}/>)}></List.Item>);
}
export default FormBuilder;
