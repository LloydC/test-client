import React, { Component } from 'react'
import AuthContext from '../context/auth-context'
import './Auth.css'

export default class AuthPage extends Component {
    state = {
        isLogin: true
    }

    static contextType = AuthContext

    constructor(props){
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }
    submitHandler = (e) => {
        e.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        
        if(email.trim().length === 0 || password.trim().length === 0){
            return
        }
        let requestBody = {
            query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password){
                        userId
                        token
                        tokenExpiration
                    }
                }`,
                variables: {
                    email: email,
                    password: password
                }
        }
        if(!this.state.isLogin){
             requestBody = {
                query: `
                    mutation CreateUser($email: String!, $password: String!) {
                        createUser(userInput: {email: $email, password: $password}){
                            _id
                            email
                        }
                    }`,
                    variables: {
                        email: email,
                        password: password
                    }
            }
        }
        
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.status !== 200){
                console.log(res.statusText)
                throw new Error(`Failed! Response ${res.status}: ${res.statusText}` )
            }
            return res.json()
        })
        .then(resData => {
            console.log(resData)
            if(resData.data.login.token){
                this.context.login(
                    resData.data.login.token, 
                    resData.data.login.userId,
                    resData.data.login.tokenExpiration
                    )
            }
            localStorage.setItem('user', JSON.stringify(resData.data.login))
            console.log(resData.data)
        })
        .catch(err => console.error(err))
    }

    switchToggle = () =>{
        this.setState(prevState => {
           return {isLogin: !prevState.isLogin}
        })
    }
    render() {
        return (
            <form className="auth-form" onSubmit={this.submitHandler}>
                <h1>{!this.state.isLogin ? 'Register your account' : 'Login'}</h1>
                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" id="email" ref={this.emailEl}/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordEl}/>
                </div>
                <div className="form-actions">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.switchToggle}>Switch to {this.state.isLogin ? 'Sign Up' : 'Login'}</button>
                </div>
            </form>
        )
    }
}
