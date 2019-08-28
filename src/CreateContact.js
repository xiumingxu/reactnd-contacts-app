import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { timingSafeEqual } from 'crypto';
import {Link} from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component {

    handleSubmit = (e) =>{
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        console.log(values);
        // check whether a function is there
        if (this.props.onCreateContact) {
            this.props.onCreateContact(values)
          }


    }

    render(){
        // Todo 
        // TODO1: create a form
        // TODO: imageinput plugin
        // TODO2: onSumbit to add the serial infor
        return (

            <div>
                <Link to='/' className='close-create-contact'> Close </Link>
                <form onSubmit={this.handleSubmit} className='create-contact-form'>

                    <ImageInput 
                    className='create-contact-avatar-input'
                    name='avatarURL'
                    maxHeight={60}
                    />
                   <div className='create-contact-details'>
                    <input type='text' name='name' placeholder='Name' />
                    <input type='text' name='handle' placeholder='Handle' />
                    <button>Add Contact</button>
                   </div>

                </form>





            </div>




        );
    }
}



export default CreateContact;