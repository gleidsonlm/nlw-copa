import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Hidden, useTheme } from 'native-base';
import { Platform } from 'react-native';
import { Find } from '../screens/Find';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    // use colors from react native theme
    const { colors, sizes } = useTheme();
    // standarize icon size
    const iconSize = sizes[8];
    return (
    <Navigator screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
            position: 'absolute',
            height: sizes[20],
            borderTopWidth: 0,
            backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
            position: 'relative',
            top: Platform.OS === 'android' ? -10 : 0,
        }
    }}
    >

        <Screen
            name="new"
            component={New}
            options={{ 
                tabBarIcon: ({color}) => <PlusCircle color={color} size={iconSize} />,
                tabBarLabel: 'Create Group',
            }}
        />

        <Screen
            name="pools"
            component={Pools}
            options={{ 
                tabBarIcon: ({color}) => <SoccerBall color={color} size={iconSize}/>, 
                tabBarLabel: 'My Groups',
            }}
        />

        <Screen 
            name="find"
            component={Find}
            options={{ tabBarButton: () => null }}
        />

    </Navigator>    
    )
}