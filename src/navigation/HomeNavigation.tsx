import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeStackParamList} from './screens';
import {DashboardScreen} from '../screens/home/DashboardScreen';
import {OrdersScreen} from '../screens/home/OrdersScreen';
import {FleetScreen} from '../screens/home/FleetScreen';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../util/colors';
import DashboardIcon from '../assets/icons/dashboard.svg';
import FleetIcon from '../assets/icons/fleet.svg';
import OrdersIcon from '../assets/icons/order.svg';

const Tab = createBottomTabNavigator<HomeStackParamList>();

export const HomeNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={TabBar}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: props => (
            <DashboardIcon
              color={props.color}
              width={props.size}
              height={props.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fleet"
        component={FleetScreen}
        options={{
          tabBarIcon: props => (
            <FleetIcon
              color={props.color}
              width={props.size}
              height={props.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: props => (
            <OrdersIcon
              color={props.color}
              width={props.size}
              height={props.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabBar = (props: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {props.state.routes.map(route => {
        const icon = props.descriptors[route.key].options.tabBarIcon;
        const active =
          props.state.routes[props.state.index].name === route.name;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              props.navigation.navigate(route.name);
            }}
            style={styles.item}>
            {icon &&
              icon({
                focused: active,
                color: active ? Colors.Primary0 : Colors.Primary1,
                size: active ? 24 : 20,
              })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 8,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.Dark1,
  },
  item: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
