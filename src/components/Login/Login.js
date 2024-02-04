import React, { useState,useEffect,useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

const emailReducer=(state,action)=>{
  switch(action.type){
     case 'User_Email':
      return  {...state,value:action.val, isValid:action.val.includes('@')}
      case 'User_Blur':
        return{value:state.value, isValid:state.value.includes('@')}
        default:
          return{value:'',isValid:false}
  }

}
const passwordReducer=(state,action)=>{
  switch(action.type){
    case 'User_Password':
      return({...state,value:action.val,isValid:action.val.trim().length>6})
      case 'User_Blur':
        return({value:state.value ,isValid:state.value.trim().length>6 })
      default:
        return{value:'',isValid:false}
  }
  
}

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const context=useContext(AuthContext)
  const [enteredCollege,setEnteredCollege]=useState('')
  const [collegeNameIsValid,setCollegeIsValid]=useState()
 

  const[emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:false})
  const[passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:false})
  const [formIsValid, setFormIsValid] = useState(false);

  const{isValid:emailIsValid}=emailState
   const{isValid:passwordIsValid}=passwordState
  useEffect(()=>{
   const identifier= setTimeout(()=>{ 
  
    setFormIsValid(
      emailIsValid && passwordIsValid && enteredCollege.trim().length!==0
    );},500)
   
      return ()=>{
        clearTimeout(identifier)

      }
    
  },[emailIsValid,passwordIsValid ,enteredCollege])

  
  

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'User_Email',val:event.target.value})
    // setFormIsValid(emailState.isValid &&passwordState.isValid && enteredCollege.trim().length!==0)

    
  };
  const collegeChangeHandler=(event)=>{
    setEnteredCollege(event.target.value)

  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'User_Password',val:event.target.value})
    // setFormIsValid(emailState.isValid && passwordState.isValid && enteredCollege.trim().length!==0)

  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type:'User_Blur'})
  };

  const validatePasswordHandler = () => {
    // 
    dispatchPassword({type:'User_Blur'}) 
  };
  const validateCollegeHandler=()=>{
    setCollegeIsValid(enteredCollege.trim().length!==0)

  }

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogIn(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        isValid={emailState.isValid}
        type='email'
        id='email'
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
