import React, { useMemo, useState } from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, Divider, List, Searchbar, Surface, useTheme, } from 'react-native-paper';
function AutoComplete(props) {
    const { visible, setVisible, textInputProps, options, field } = props;
    const theme = useTheme();
    const styles = useMemo(() => StyleSheet.create({
        containerStyle: {
            flex: 1,
        },
        searchStyle: {
            padding: 20,
        },
    }), []);
    const [selectedValue, setSelectedValue] = useState(field.value);
    const [search, setSearch] = useState('');
    return (<Modal visible={visible} onDismiss={() => setVisible(false)}>
      <Surface style={styles.containerStyle}>
        <Appbar.Header>
          <Appbar.Action icon={'close'} onPress={() => setVisible(false)}/>
          <Appbar.Content title={textInputProps?.label}/>
          <Appbar.Action icon={'check'} disabled={!selectedValue} onPress={() => {
            field.onChange(selectedValue);
            setVisible(false);
        }}/>
        </Appbar.Header>
        <SafeAreaView style={styles.containerStyle}>
          <View style={styles.searchStyle}>
            <Searchbar value={search} onChangeText={setSearch} placeholder={`Search ${textInputProps?.label ?? ''}`}/>
          </View>
          <FlatList data={options.filter((option) => option.label.toLowerCase().indexOf(search.toLowerCase()) !== -1)} renderItem={({ item }) => (<List.Item title={item.label} onPress={() => {
                setSelectedValue(`${item.value}`);
            }} titleStyle={{
                color: `${item.value}` === selectedValue
                    ? theme.colors.primary
                    : theme.colors.text,
            }}/>)} ItemSeparatorComponent={() => <Divider />} keyExtractor={(item) => `${item.value}`}/>
        </SafeAreaView>
      </Surface>
    </Modal>);
}
export default AutoComplete;
