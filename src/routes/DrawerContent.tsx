// eslint-disable-next-line no-use-before-define
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useThemeContext } from '~useHooks'
import { NavigationHelpers } from '@react-navigation/core'
import { routes } from '~routes'
/**
 * PureComponent
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
export interface Props {
  navigation:NavigationHelpers<any>
}
const DrawerContent :React.FC<Props> = (Props, parentRef) => {
  const { navigation } = Props
  const paperTheme = useTheme()
  const { toggleTheme } = useThemeContext()

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...Props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>John Doe</Title>
                <Caption style={styles.caption}>@j_doe</Caption>
              </View>
            </View>

            {/* <View style={styles.row}> */}
            {/*  <View style={styles.section}> */}
            {/*    <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph> */}
            {/*    <Caption style={styles.caption}>Following</Caption> */}
            {/*  </View> */}
            {/*  <View style={styles.section}> */}
            {/*    <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph> */}
            {/*    <Caption style={styles.caption}>Followers</Caption> */}
            {/*  </View> */}
            {/* </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              // icon={({ color, size }) => <Icon name='home-outline' color={color} size={size} />}
              label='MainStack'
              onPress={() => {
                routes.navigate(navigation, routes.MainStack.routeName, {})
              }}
            />
            <DrawerItem
              // icon={({ color, size }) => <Icon name='settings-outline' color={color} size={size} />}
              label='SecondStack'
              onPress={() => {
                routes.navigate(navigation, routes.SecondStack.routeName, {})
              }}
            />
          </Drawer.Section>
          <Drawer.Section title='Preferences'>
            <TouchableRipple
              onPress={() => {
                toggleTheme()
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents='none'>
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {/* <Drawer.Section style={styles.bottomDrawerSection}> */}
      {/*  <DrawerItem */}
      {/*    icon={({ color, size }) => <Icon name='exit-to-app' color={color} size={size} />} */}
      {/*    label='Sign Out' */}
      {/*    onPress={() => {}} */}
      {/*  /> */}
      {/* </Drawer.Section> */}
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
})

export default DrawerContent
