import React, { Fragment } from 'react';
import { useController } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import InputAutocomplete from '../Inputs/InputAutocomplete';
import InputSelect from '../Inputs/InputSelect';
import InputText from '../Inputs/InputText';
function Logic(props) {
    const { name, rules, shouldUnregister, defaultValue, control, type, textInputProps, JSX, options, CustomAutoComplete, CustomTextInput, onDismiss, } = props;
    const { field, formState } = useController({
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control,
    });
    switch (type) {
        case 'text': {
            return (<InputText field={field} formState={formState} textInputProps={textInputProps} CustomTextInput={CustomTextInput}/>);
        }
        case 'email': {
            return (<InputText field={field} formState={formState} textInputProps={{
                    ...textInputProps,
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                }} CustomTextInput={CustomTextInput}/>);
        }
        case 'password': {
            return (<InputText field={field} formState={formState} textInputProps={{
                    ...textInputProps,
                    secureTextEntry: true,
                }} CustomTextInput={CustomTextInput}/>);
        }
        case 'select': {
            return (<Fragment>
          {options && (<InputSelect field={field} formState={formState} textInputProps={{
                        ...textInputProps,
                        right: <TextInput.Icon name={'menu-down'}/>,
                    }} options={options} CustomTextInput={CustomTextInput} onDismiss={onDismiss}/>)}
        </Fragment>);
        }
        case 'autocomplete': {
            return (<Fragment>
          {options && (<InputAutocomplete field={field} formState={formState} textInputProps={{
                        ...textInputProps,
                        right: <TextInput.Icon name={'menu-down'}/>,
                    }} options={options} CustomAutoComplete={CustomAutoComplete} CustomTextInput={CustomTextInput}/>)}
        </Fragment>);
        }
        case 'custom': {
            return JSX && JSX(props);
        }
    }
}
export default Logic;
