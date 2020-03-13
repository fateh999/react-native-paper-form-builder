import React, { useEffect, Fragment, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText, useTheme, Menu, TouchableRipple, Subheading, Divider, Searchbar, } from 'react-native-paper';
function FormBuilder(props) {
    const { form, formConfigArray, children } = props;
    const { colors } = useTheme();
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
        switch (input.type) {
            case 'input': {
                return <TextInput {...propsInput}/>;
            }
            case 'select': {
                return <AppDropdown {...propsInput}/>;
            }
            case 'autocomplete': {
                return <AppDropdown {...propsInput} autocomplete/>;
            }
            default: {
                return <TextInput {...propsInput}/>;
            }
        }
    };
    const renderAppBuilderItem = (input, index) => (<View key={index} style={{ marginBottom: 15 }}>
      <Controller as={inputSelector(input)} name={input.name} rules={input.rules} control={form.control} onChange={onChange}/>
      {form.errors[input.name] && (<HelperText style={{
        color: colors.error,
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
    const { mode, options, setValue, name, watch, triggerValidation, autocomplete, label, } = props;
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
    return (<Menu style={{ marginTop: autocomplete ? 0 : height + 10 }} visible={showDropdown} contentStyle={{ width }} onDismiss={() => setShowDropdown(false)} anchor={<Fragment>
          <TouchableRipple onPress={() => setShowDropdown(true)}>
            <TextInput onLayout={(ev) => {
        setWidth(ev.nativeEvent.layout.width);
        setHeight(ev.nativeEvent.layout.height);
    }} mode={mode} editable={false} pointerEvents={'none'} {...props} value={displayValue}/>
          </TouchableRipple>
        </Fragment>}>
      {autocomplete && (<Searchbar value={searchValue} onChangeText={setSearchValue} placeholder={`Search ${label}`}/>)}
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
export default FormBuilder;
