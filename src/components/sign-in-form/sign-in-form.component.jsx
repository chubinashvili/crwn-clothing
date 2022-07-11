import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from '../form-input/form-input.component';

import { SignInContainer, ButtonsContainer} from './sign-in-form.styles';
import {
    googleSignInStart,
    emailSignInStart,
} from '../../store/user/user.action';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; 
  const navigate = useNavigate();

  const SignInWithGoogle = () => {
    dispatch(googleSignInStart());
 }
 const resetFormFields = () => {
    setFormFields(defaultFormFields);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };
 const handleChange = (event) => {
     const { name, value } = event.target;
     setFormFields({...formFields, [name]: value});
 }  
  return (
    <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and pasword</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                 label="email"
                 inputOptions={{
                    type: 'email',
                    required: true,
                    onChange: handleChange,
                    name: 'email',
                    value: email
                 }} 
                />
                
                <FormInput
                 label="password" 
                 inputOptions={{
                    type: 'password',
                    required: true,
                    onChange: handleChange,
                    name: 'password',
                    value: password
                 }} 
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
  )
}

export default SignInForm;