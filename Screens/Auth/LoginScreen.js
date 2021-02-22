import * as React from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
 } from 'react-native';
import { 
    TextInput,
    Button,
    Text,
    useTheme,
    Modal,
    Portal
 } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {
    BarIndicator,
  } from 'react-native-indicators';

function LoginScreen({navigation}) {
    const [showpassword, setShowPassword] = React.useState(true)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const API_URL = `http://localhost:8000`;
    const paperTheme = useTheme()
    const [loading, setLoading] = React.useState(false)

    const handleShow = () => {
        setShowPassword(!showpassword)
    }
    
    const fetchLogin = async () => {
        // set loading to true
        if (loading === false) {
            setLoading(true)
        }

        // get validation
        if (!username) {
            alert('Please Fill Username First')
            setLoading(false)
        }
        if (!password) {
            alert('Please Fill Password First')
            setLoading(false)
        }

        try {
            let dataToSend = {username: username, password: password};
            let formBody = [];
            for (let key in dataToSend) {
              let encodedKey = encodeURIComponent(key);
              let encodedValue = encodeURIComponent(dataToSend[key]);
              formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
            const data = await fetch(`${API_URL}/login`, {
                method: 'POST',
                body: formBody,
                headers: {
                    //Header Defination
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
                  },
            })
            const resp = await data.json()
            console.log(resp)
            const setItemUser = await AsyncStorage.setItem('user_name', resp.result.username)
            console.log(setItemUser)
            if (resp.message === 'login_success') {
                 // set loading to false
                if (loading === true) {
                    setLoading(false)
                }
                console.log(resp.result.username)
                navigation.replace('Landing')
            } else {
                console.log('Please check your username or password')
                alert('Your username or password is not correct!')
                setLoading(false)
            }
        } catch (error) {
            alert('Something Error!')
            console.log(error)
            setLoading(false)
        }
    }

    const handleLogin = () => {
        fetchLogin()
    }

    // Styles
    const styles = StyleSheet.create({
        passwordcontainer: {
            flexDirection: 'row',
            top: wp('125%'),
            left: wp('5%'),
            position: 'absolute',
            zIndex: 2,
        },
        iconpassword: {
           position: 'absolute',
           marginLeft: wp('80%'),
           marginTop: wp('8%')
        },
        inputpassword: {
            width: wp('90%'),
            height: hp('10%'),
            backgroundColor: paperTheme.colors.title,
            fontWeight: 'bold',
        }
    })

    return(
        <>
            <ScrollView>

                    {/* view */}
                    <View
                        style={{
                            marginTop: wp('10%'),
                            marginLeft: wp('5%')
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: wp('8%'),
                                fontWeight: 'bold'
                            }}
                        >
                        Welcome 
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: wp('8%'),
                                fontWeight: 'bold'
                            }}
                        >
                        Back, 
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: wp('8%'),
                                    fontWeight: 'bold'
                                }}
                            >
                            People
                            </Text>
                            <Image
                                source={require('../../Asset/Image/login.png')}
                                style={{
                                    width: wp('50%'),
                                    height: hp('20%'),
                                    position: 'absolute',
                                    top: wp('-20%'),
                                    right: 0
                                }}
                            />
                        </View>
                    </View>

                    {/* Username */}
                    <TextInput
                        mode='flat'
                        label='username'    
                        placeholder='johndoe'
                        onChangeText={(username) => setUsername(username)}
                        underlineColor='#2F80ED'
                        style={{
                            width: wp('90%'),
                            height: hp('10%'),
                            backgroundColor: paperTheme.colors.title,
                            top: wp('100%'),
                            left: wp('5%'),
                            fontWeight: 'bold',
                            position: 'absolute',
                            zIndex: 2,
                        }}
                    />
                    {/* Password */}
                    <View style={styles.passwordcontainer}>
                        <TextInput
                            label='password'
                            secureTextEntry={showpassword}
                            style={styles.inputpassword}
                            onChangeText={(password) => setPassword(password)}
                            placeholder='12345***'
                            underlineColor='#2F80ED'
                        />
                        <TouchableOpacity
                            onPress={handleShow}
                            style={styles.iconpassword}
                        >
                        {showpassword 
                            ?
                            <MaterialCommunityIcons name='eye' size={wp('5%')} />
                            :
                            <MaterialCommunityIcons name='eye-off' size={wp('5%')} />
                        }
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            color: '#2F80ED',
                            top: 530,
                            left: wp('59%'),
                            fontWeight: 'bold',
                            position: 'absolute',
                            zIndex: 2                    
                        }}
                    >
                        Forgot Password?
                    </Text>
                    <Button
                        onPress={() => handleLogin()}
                        mode='contained'
                        style={{
                            borderRadius: 10,
                            width: wp('90%'),
                            padding: wp('2%'),
                            backgroundColor: paperTheme.colors.backgroundauth,
                            alignContent: 'center',
                            position: 'absolute',
                            zIndex: 2,
                            marginLeft: wp('5%'),
                            bottom: 30
                        }}
                        labelStyle={{
                            color: 'white',
                            fontWeight: 'bold' 
                        }}
                    >
                        Login
                    </Button>
                <Image
                    source={require('../../Asset/Image/gelombang.png')}
                    style={{
                        marginTop: wp('20%')
                    }}
                />
                
                {/* modal loading */}
                <Portal>
                    <Modal
                            visible={loading}
                            contentContainerStyle={{
                                backgroundColor: 'transparent',
                                padding: 20,
                                width: wp('50%'),
                                height: hp('30%'),
                                borderRadius: 20,
                                marginLeft: wp('25%'),
                                
                            }}
                        >
                            <BarIndicator
                                color='white'
                            />
                    </Modal>
                </Portal>
            </ScrollView>
        </>
    )
}

export default LoginScreen