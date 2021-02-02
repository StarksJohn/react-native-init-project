export const HOME = 'Home';
export const DetailsScreen = {
  routeName: 'DetailsScreen',
  screenTitle: '详情页',
};
export const MainTabNavigator = {
  routeName: 'MainTabNavigator',
  screenTitle: '',
};

export function push(navigation, {name, data, emitKey = 'UPDATE_PAGE'}, next) {
  navigation.push(name, data);

  // DeviceEventEmitter.emit(emitKey, data);
}

export function navigate(
  navigation,
  {name, data, emitKey = 'UPDATE_PAGE'},
  next,
) {
  navigation.navigate(name, data);

  // DeviceEventEmitter.emit(emitKey, data);
}

export function goback(
  navigation,
  {name, data, emitKey = 'UPDATE_PAGE'},
  next,
) {
  navigation.goBack();

  // DeviceEventEmitter.emit(emitKey, data);
}

export function popToTop(
  navigation,
  {name, data, emitKey = 'UPDATE_PAGE'},
  next,
) {
  navigation.popToTop();

  // DeviceEventEmitter.emit(emitKey, data);
}
