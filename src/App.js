import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact';
import { createSecureContext } from 'tls';

class App extends Component {
  state = {
    contacts : [],
    screen : 'were',
 };

 componentDidMount(){
    ContactAPI.getAll()
    .then((contacts) => {
       this.setState(() => ({
         contacts:contacts
       }))
    })
 }
  removeContact = (contact) =>{

    let newContacts = this.state.contacts.filter(c => c.id!= contact);
    this.setState({contacts: newContacts});
    ContactAPI.remove(contact);


  }
  render() {
    return (
      <div>
        {
          this.state.screen === 'list' && (
            <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            />
          )
        }
        {
          this.state.screen === 'contact' && (
            <CreateContact />
          )
        }
       
     
      </div>
    );
  }
}

export default App;
