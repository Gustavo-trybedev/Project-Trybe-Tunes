import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
 state = {
   name: '',
   isUserLoggedIn: 'non-logged',
   isLoginButtonDisabled: true,
 }

 validateUserName = ({ target }) => {
   this.setState({ name: target.value }, () => {
     const { name } = this.state;
     const userMinLength = 3;
     const rule = name.length < userMinLength;
     this.setState({ isLoginButtonDisabled: rule });
   });
 }

 saveUserName = async () => {
   const { name } = this.state;
   this.setState({ isUserLoggedIn: 'logged' }, async () => {
     const userGonnaBeCreated = await createUser({ name });
     this.setState({ isUserLoggedIn: userGonnaBeCreated });
   });
 }

 render() {
   const { name, isLoginButtonDisabled, isUserLoggedIn } = this.state;
   return (
     <section data-testid="page-login">
       {
         isUserLoggedIn === 'non-logged'
           ? (
             <form className="login-form">
               <section className="elements-container">
                 <h2> Realize seu Login e comece já a ouvir seus hits favoritos!</h2>
                 <input
                   name={ name }
                   data-testid="login-name-input"
                   type="text"
                   placeholder="Nome"
                   value={ name }
                   onChange={ this.validateUserName }
                 />
                 <button
                   data-testid="login-submit-button"
                   type="submit"
                   disabled={ isLoginButtonDisabled }
                   onClick={ this.saveUserName }
                   className="login-button"
                 >
                   Entrar
                 </button>
               </section>
             </form>
           )
           : (
             <section>
               {
                 isUserLoggedIn === 'logged'
                   ? (
                     <Redirect to="/search" />
                   )
                   : (
                     <Loading />
                   )
               }
             </section>
           )
       }
     </section>
   );
 }
}

export default Login;
