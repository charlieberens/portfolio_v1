import React, { Component } from 'react'

export default class Form extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            message: ''
        }
    }

    onSubmit = e => {
        e.preventDefault();

        if(this.state.phone || this.state.email){

        }else{
            
        }

        console.log(this.state);
    }
    
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    verifyPhone = phone => {
        const re = /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone).toLowerCase());
    }
    verifyEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    render() {
        return (
            <form id="contact-form" onSubmit={this.onSubmit}>
              <input type="text" name="name" placeholder="Name" onChange={this.onChange}/>
              <input type="text" name="email" placeholder="Email" onChange={this.onChange}/>
              <input type="text" name="phone" placeholder="Phone Number" onChange={this.onChange}/>
              <textarea name="message" placeholder="Message" onChange={this.onChange}></textarea>
              <input className="submit" type="submit"/>
            </form>
        )
    }
}