import React, {Fragment, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import Logic from './Logic/Logic';
import {FormBuilderProps} from './Types/Types';

function mergeDeep(...objects: any) {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

function FormBuilder(props: FormBuilderProps) {
  const currentTheme = useTheme();
  const {
    formConfigArray,
    theme,
    control,
    setFocus,
    inputSpacing = 15,
    inputSpacingHorizontal = 15,
    CustomTextInput,
  } = props;
  const THEME: Theme = theme ? mergeDeep(currentTheme, theme) : currentTheme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        rowStyle: {
          flexDirection: 'row',
        },
        columnStyle: {
          flex: 1,
        },
      }),
    [],
  );

  return (
    <Fragment>
      {formConfigArray.map((item, index) => {
        if (Array.isArray(item)) {
          return (
            <View key={index} style={styles.rowStyle}>
              {item.map((_item, _index) => {
                const INPUT = _item?.CustomTextInput ?? CustomTextInput;
                const next = item[_index + 1]
                  ? item[_index + 1]
                  : formConfigArray[index + 1];
                const nextItem = Array.isArray(next) ? next?.[0] : next;
                const onSubmitEditing =
                  _item.textInputProps?.onSubmitEditing ??
                  (() => {
                    if (nextItem) {
                      if (setFocus && nextItem.type !== 'custom') {
                        setFocus(nextItem.name);
                      }
                    }
                  });
                const returnKeyType = next ? 'next' : 'done';
                const horizontalSpacing =
                  _index < item.length - 1
                    ? _item.inputSpacingHorizontal ?? inputSpacingHorizontal
                    : 0;

                return (
                  <View
                    key={`${index} + ${_index}`}
                    style={[
                      styles.columnStyle,
                      {
                        marginRight: horizontalSpacing,
                      },
                    ]}>
                    <Logic
                      {..._item}
                      control={control}
                      textInputProps={{
                        onSubmitEditing,
                        returnKeyType,
                        theme: THEME,
                        ..._item.textInputProps,
                      }}
                      CustomTextInput={INPUT}
                    />
                    <View
                      style={{
                        height: _item?.inputSpacing ?? inputSpacing,
                      }}
                    />
                  </View>
                );
              })}
            </View>
          );
        } else {
          const INPUT = item?.CustomTextInput ?? CustomTextInput;
          const next = formConfigArray[index + 1];
          const nextItem = Array.isArray(next) ? next?.[0] : next;
          const onSubmitEditing =
            item.textInputProps?.onSubmitEditing ??
            (() => {
              if (nextItem) {
                if (setFocus && nextItem.type !== 'custom') {
                  setFocus(nextItem.name);
                }
              }
            });
          const returnKeyType = next ? 'next' : 'done';

          return (
            <Fragment key={index}>
              <Logic
                {...item}
                control={control}
                textInputProps={{
                  onSubmitEditing,
                  returnKeyType,
                  theme: THEME,
                  ...item.textInputProps,
                }}
                CustomTextInput={INPUT}
              />
              <View
                style={{height: item?.inputSpacing ?? inputSpacing ?? 15}}
              />
            </Fragment>
          );
        }
      })}
    </Fragment>
  );
}

export default FormBuilder;
