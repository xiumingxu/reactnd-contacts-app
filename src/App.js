import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";
import { createSecureContext } from "tls";

class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    ContactAPI.getAll().then(contacts => {
      this.setState({
        contacts: contacts
      });
    });
  }
  removeContact = contact => {
    ContactAPI.remove(contact).then(res => {
      let newContacts = this.state.contacts.filter(c => c.id != res.contact.id);
      this.setState({ contacts: newContacts });
    });
  };

  createContact = contact => {
    ContactAPI.create(contact).then(contact => {
      console.log("what");
      this.setState({
        contacts: this.state.contacts.concat([contact])
      });
    });
  };
  render() {
    return (
      <div>
        <Route
          exact
          path='/'
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />

        <Route
          path='/create'
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                history.push("/");
                this.createContact(contact);
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
