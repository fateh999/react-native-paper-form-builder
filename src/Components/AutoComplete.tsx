import React, {useMemo, useState} from 'react';
import {FlatList, Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Divider,
  List,
  Searchbar,
  Surface,
  useTheme,
} from 'react-native-paper';
import {AutoCompleteProps} from '../Types/Types';

function AutoComplete(props: AutoCompleteProps) {
  const {visible, setVisible, textInputProps, options, field, autoDismiss} =
    props;
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flex: 1,
        },
        searchStyle: {
          padding: 20,
        },
      }),
    [],
  );
  const [selectedValue, setSelectedValue] = useState(field.value);
  const [search, setSearch] = useState('');

  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)}>
      <Surface style={styles.containerStyle}>
        <Appbar.Header>
          <Appbar.Action
            testID={`${props.textInputProps?.testID}Close`}
            icon={'close'}
            onPress={() => setVisible(false)}
          />
          <Appbar.Content title={textInputProps?.label} />
          <Appbar.Action
            testID={`${props.textInputProps?.testID}Check`}
            icon={'check'}
            disabled={!selectedValue}
            onPress={() => {
              field.onChange(selectedValue);
              setVisible(false);
            }}
          />
        </Appbar.Header>
        <SafeAreaView style={styles.containerStyle}>
          <View style={styles.searchStyle}>
            <Searchbar
              testID={`${props.textInputProps?.testID}SearchBar`}
              value={search}
              onChangeText={setSearch}
              placeholder={
                props.textInputProps?.placeholder
                  ? props.textInputProps.placeholder
                  : `Search ${textInputProps?.label ?? ''}`
              }
            />
          </View>
          <FlatList
            data={options.filter(
              (option) =>
                option.label.toLowerCase().indexOf(search.toLowerCase()) !== -1,
            )}
            renderItem={({item}) => (
              <List.Item
                title={item.label}
                onPress={() => {
                  setSelectedValue(`${item.value}`);
                  if (autoDismiss) {
                    field.onChange(`${item.value}`);
                    setVisible(false);
                  }
                }}
                titleStyle={{
                  color:
                    `${item.value}` === selectedValue
                      ? theme.colors.primary
                      : theme.colors.text,
                }}
              />
            )}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(item) => `${item.value}`}
          />
        </SafeAreaView>
      </Surface>
    </Modal>
  );
}

export default AutoComplete;
