import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import themestyles from '../../assets/styles/themestyles';
import Icon from '../custom-icon';

type DropDownItem = {
  id: number | string;
  title: string;
};

type TDropDownProps = {
  title?: string;
  data: DropDownItem[];
  onSelect?: (item: DropDownItem) => void;
};

const DropDown: React.FC<TDropDownProps> = ({title, data, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItem | null>(null);

  const handleSelect = (item: DropDownItem) => {
    setSelectedItem(item);
    onSelect?.(item);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={() => setVisible(!visible)}>
        <Text style={{flex: 1}}>
          {selectedItem?.title || title || 'Select an item'}
        </Text>
        <Icon type="MaterialIcons" name="arrow-drop-down" />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropDownContainer}>
          <View style={{marginTop: 5}}>
            {data.map(it => (
              <TouchableOpacity
                key={it.id}
                style={styles.itemContainer}
                onPress={() => handleSelect(it)}>
                <Text style={styles.title}>{it.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: themestyles.LIGHT_GREY,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dropDownContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: themestyles.LIGHT_GREY,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    top: -2.5,
  },
  itemContainer: {
    marginTop: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
  },
});
export default DropDown;
