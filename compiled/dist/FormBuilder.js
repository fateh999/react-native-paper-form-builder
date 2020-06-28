import { Checkbox, Divider, HelperText, IconButton, List, Menu, Modal, Portal, RadioButton, Searchbar, Subheading, Surface, Switch, TextInput, TouchableRipple, useTheme, } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { FlatList, Keyboard, Platform, ScrollView, View, } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
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
        const JSX = input.jsx;
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
            propsInput.loadOptions = input.loadOptions;
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
            case 'custom': {
                //@ts-ignore
                return <JSX {...input}/>;
            }
            default: {
                return <Input {...propsInput}/>;
            }
        }
    };
    const renderAppBuilderItem = (input, index) => (<View key={index} style={{ marginBottom: input.type === 'custom' ? 0 : 15, ...inputViewStyle }}>
      <Controller 
    //@ts-ignore
    as={inputSelector(input)} name={input.name} rules={input.rules} control={form.control} onChange={onChange}/>
      {form.errors[input.name] && input.type === 'custom' && (<HelperText style={{
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
    const { mode, options, setValue, name, watch, triggerValidation, label, Input, disabled, loadOptions, } = props;
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
    }, [searchValue, options]);
    useEffect(() => {
        if (searchValue.trim())
            setSearchValue('');
    }, [showDropdown]);
    return (<Fragment>
      <TouchableRipple disabled={disabled} onPress={() => {
        setFilteredOptions([]);
        setTimeout(() => {
            setFilteredOptions([...options]);
        }, 300);
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
            <FlatList refreshing={options.length === 0 ? true : false} onRefresh={() => {
        if (loadOptions) {
            loadOptions();
        }
    }} initialNumToRender={10} maxToRenderPerBatch={20} extraData={watch(name)} keyboardShouldPersistTaps={'handled'} data={filteredOptions} keyExtractor={(item) => `${item.value}`} renderItem={({ item }) => (<Fragment>
                  <Fragment key={item.value}>
                    <List.Item onPress={() => {
        setValue(name, item.value);
        setShowDropdown(false);
    }} title={<Subheading style={{
        color: watch(name) === item.value
            ? colors.primary
            : undefined,
    }}>
                          {item.label}
                        </Subheading>}/>
                    <Divider />
                  </Fragment>
                </Fragment>)}/>
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
