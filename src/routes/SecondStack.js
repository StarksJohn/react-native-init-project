import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

//如果采用 Drawer 导航,此文件就是 打开 DrawerContent 后可 点击的 第二个 路由栈
const SecondStack = () => {
  return (
    <View style={styles.container}>
      <Text>SecondStack</Text>
      <Button title='Click Here' onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default SecondStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
