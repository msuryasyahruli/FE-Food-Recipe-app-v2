import { Text, View } from "react-native";
import React from "react";
import { Select } from "native-base";

const SelectInput = ({ options, selectedValue, onChange }) => {
  const selectedId = options?.find(
    (option) => option.category_name === selectedValue
  )?.category_id;

  return (
    <View>
      <Select
        selectedValue={selectedId}
        accessibilityLabel="Choose Service"
        placeholder="Choose Category"
        borderRadius={10}
        borderWidth={0}
        backgroundColor="white"
        p={5}
        fontSize="sm"
        _selectedItem={{
          bg: "gray.300",
        }}
        onValueChange={onChange}
      >
        {options.length > 0 ? (
          options.map((data, i) => (
            <Select.Item
              key={i}
              label={data.category_name}
              value={data.category_id}
            />
          ))
        ) : (
          <Text>no item</Text>
        )}
      </Select>
    </View>
  );
};

export default SelectInput;
