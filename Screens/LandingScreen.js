import * as React from 'react';
import { 
    View,
    Image
 } from 'react-native';
import { 
    Text,
    useTheme,
    Button
 } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
 } from 'react-native-responsive-screen';

function LandingScreen({navigation}) {
    const paperTheme = useTheme()

    return(
        <>
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                <Image
                    source={require('../Asset/Image/teacher.png')}
                    style={{
                        width: wp('92%'),
                        height: hp('40%'),
                        marginTop: wp('15%')
                    }}
                />
                <Text
                    style={{
                        marginTop: wp('5%'),
                        fontSize: wp('10%'),
                        color: paperTheme.colors.title,
                        fontWeight: 'bold'
                    }}
                >
                    Student Center.
                </Text>
                <Text
                    style={{
                        marginTop: wp('2%'),
                        fontSize: wp('5%'),
                        color: paperTheme.colors.subtitle,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        width: wp('90%')
                    }}
                >
                    This application helps teacher in managing student data and important school data easily and only through your cellphone.
                </Text>
                <View
                    style={{
                        marginTop: wp('10%'),
                        backgroundColor: '#C4C4C4',
                        borderRadius: 15,
                        flexDirection: 'row'
                    }}
                >
                    <Button
                        mode='contained'
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 15,
                            padding: wp('2%'),
                            width: wp('40%')
                        }}
                        labelStyle={{
                            fontWeight: 'bold',
                            color: '#2F80ED',
                        }}
                        onPress={() => navigation.replace('Auth')}
                    >
                        Log in
                    </Button>
                    <Button
                        style={{
                            width: wp('40%'),
                            padding: wp('2%'),
                        }}
                        labelStyle={{
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        Faq
                    </Button>
                </View>
            </View>
        </>
    )
}

export default LandingScreen