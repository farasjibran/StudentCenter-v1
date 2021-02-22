import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Auth/LoginScreen';
import { 
    useTheme
 } from 'react-native-paper';

function Auth() {
    const Stack = createStackNavigator();
    const paperTheme = useTheme()

    return(
        <>
            <Stack.Navigator
                initialRouteName='LoginScreen'
            >
                <Stack.Screen
                    name='LoginScreen'
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        cardStyle: {backgroundColor: paperTheme.colors.backgroundauth}
                    }}
                />
            </Stack.Navigator>
        </>
    )
}

export default Auth