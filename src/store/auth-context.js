import React,{ useState,useEffect} from 'react'

 const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogIn:(email,password)=>{},
    onLogOut:()=>{}
 })
 
 export const AuthContextProvider=(props)=>{
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const isLogin=localStorage.getItem('isLogin')
    if(isLogin==='1'){
      setIsLoggedIn(true)
    }
    
  },[])

  const loginHandler = (email, password) => {
    localStorage.setItem('isLogin','1')
  
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLogin')
  };

  return <AuthContext.Provider value={{
      isLoggedIn:isLoggedIn,
      onLogOut:logoutHandler,
      onLogIn:loginHandler

    }}>
      {props.children}
   </AuthContext.Provider>
}

 export default AuthContext