import { useState } from 'react';

import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from '../form-input/form-input.component';

import { SignInContainer, ButtonsContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; 

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
 }
 const resetFormFields = () => {
    setFormFields(defaultFormFields);
 };

 const handleSubmit = async (e) => {
     e.preventDefault();
     try { 
        const {user} = await signInAuthUserWithEmailAndPassword(
            email, password
        );

        resetFormFields();
     } catch (error) {
        switch(error.code) {
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
            default: 
                console.log(error)
        }
     }
 }
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