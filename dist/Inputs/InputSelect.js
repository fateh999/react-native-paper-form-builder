import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Menu, TouchableRipple, useTheme, TextInput, Divider, HelperText, } from 'react-native-paper';
function InputSelect(props) {
    const { formState, field, textInputProps, options, CustomTextInput } = props;
    const theme = useTheme();
    const errorMessage = formState.errors?.[field.name]?.message;
    const textColor = errorMessage ? theme.colors.error : theme.colors.text;
    const [visible, setVisible] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const INPUT = CustomTextInput ?? TextInput;
    const styles = useMemo(() => StyleSheet.create({
        textInputStyle: {
            color: textColor,
        },
        menuStyle: {
            minWidth: width,
            width: width,
            marginTop: height,
        },
    }), [height, textColor, theme.colors.onSurface, theme.colors.surface, width]);
    const onLayout = useCallback((event) => {
        const { width: _width, height: _height } = event.nativeEvent.layout;
        setWidth(_width);
        setHeight(_height);
    }, []);
    return (<Fragment>
      <Menu visible={visible} onDismiss={() => { }} style={styles.menuStyle} anchor={<TouchableRipple onPress={() => {
                Keyboard.dismiss();
                setVisible(true);
            }}>
            <View pointerEvents={'none'} onLayout={onLayout}>
              <INPUT ref={field.ref} mode={'outlined'} error={errorMessage ? true : false} {...textInputProps} value={options.find(({ value }) => `${value}` === `${field.value}`)
                ?.label} onFocus={() => {
                Keyboard.dismiss();
                setVisible(true);
            }} style={[styles.textInputStyle, textInputProps?.style]}/>
            </View>
          </TouchableRipple>}>
        {options.map(({ label: _label, value: _value }, _index) => {
            return (<Fragment key={_value}>
              <Menu.Item title={_label} style={{ width, minWidth: width, maxWidth: width }} onPress={() => {
                    field.onChange(`${_value}`);
                    setVisible(false);
                }} titleStyle={{
                    color: `${_value}` === `${field.value}`
                        ? theme.colors.primary
                        : theme.colors.text,
                }}/>
              {_index < options.length - 1 && <Divider />}
            </Fragment>);
        })}
      </Menu>
      {errorMessage && <HelperText type={'error'}>{errorMessage}</HelperText>}
    </Fragment>);
}
export default InputSelect;
