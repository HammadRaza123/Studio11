import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import InputField from '../../components/InputField';
import { useDispatch } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Logo from '../../components/Logo';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
export default function Dashboard(props) {
  const [email, setemail] = useState();
  const [emailError, setEmailError] = useState('');
  const [checkIcon, setCheckIcon] = useState(false);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState('');
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const checkEmail = () => {
    let valid = false;
    reg.test(email) ? setEmailError('yeh') : setEmailError('woh')
    if (reg.test(email)) {
      setEmailError('')
      valid = true
    } else { setEmailError('Email address is invalid') }
    if (email == '') {
      setEmailError('Please enter an email address')
    }
    return valid
  }
  const checkPassword = (pass = password) => {
    let valid = false;
    if (pass.length < 7) { setPasswordError('invalid password') }
    else { setPasswordError(''); valid = true }
    return valid
  }

  const login = async () => {
    if (checkEmail()) {
      if (checkPassword()) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            // setPasswordError(''),
            console.log('Welcome, User signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setPasswordError('That email address is already in use!')
              setemail('')
              setPassword('')
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              setPasswordError('That email address is invalid!')
              setemail('')
              setPassword('')
              console.log('That email address is invalid!');
            }

            if (error.code === 'auth/user-not-found') {
              setPasswordError('No user found ')
              setemail('')
              setPassword('')
            }

            console.error(error);
            setPasswordError('User details are invalid!')
          });
      } else null
    }
    else null

  }
  const dispatch = useDispatch();
  return (
    <ScreenWrapper transclucent statusBarColor = {AppColors.transparent} 
      backgroundImage={require('../../assets/images/bg.png')}
    >
      <View
        style={styles.mainViewContainer}>
         <Logo imagepath={require('../../assets/images/logo.png')} />
          <Text style={styles.heading}> Welcome Studio 11</Text>
          <Text style={styles.description}> Login to continue</Text>

          <InputField value={email}
            onBlur={checkEmail}
            onChangeText={email => {
              setemail(email)
              checkEmail()
            }} fielderror={emailError}
            label={'Email'} placeholder={'Enter you Email'}
          />
          <InputField secureTextEntry value={password}
            onChangeText={password => {
              setPassword(password)
              checkPassword(password)
            }} fielderror={passwordError}
            label={'Password'} placeholder={'Enter you Password'}
          />
          <View style={styles.RowafterInputField}>
            <TouchableOpacity style={styles.rememberbeSection}
            onPress={() => { setCheckIcon(!checkIcon) }}>
              {checkIcon ?
                <Icon name="checkcircle" style={styles.checkIcon} color={AppColors.primaryGold}  />
                : <Icon name="checkcircle" style={styles.checkIcon} color={AppColors.white50} />}
              <Text style={styles.whiteText}>Remember me</Text>
            </TouchableOpacity>
            <HighlightedText onPress={() => props.navigation.navigate('ResetPassword')}
              text={'Forgot password?'}
            />
          </View>
          <Button containerStyle={{paddingVertical:height(2),width:'80%', borderRadius:width(4)}}
            title="Login"
            onPress={() =>
              // login()
              props.navigation.navigate('Dashboard')
            }
          />
          <View style={styles.TextRow}>
            <Text style={styles.whiteText}>Don't have any account? </Text>
            <HighlightedText text={'Register'}
              onPress={() => props.navigation.navigate('Register')}
            />
          </View>
          <View style={styles.TextRow}>
            <Text style={styles.whiteText}>Are you from the staff? </Text>
            <HighlightedText  onPress={() => props.navigation.navigate('StaffLogin')} text={'Login from here'} />
          </View>
      </View>
    </ScreenWrapper>

  );
}
