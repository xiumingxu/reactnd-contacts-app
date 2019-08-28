import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { timingSafeEqual } from 'crypto';

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        removeContact: PropTypes.func.isRequired
    }
    
    state = {
        query:''
    }

    updateQuery = (val) => {
        this.setState({query: val.trim()});
    }
    clearQuery = ()=>{
        this.setState({query: ''});
    }

    render(){

        const showingContacts = this.state.query == ''?
          this.props.contacts : 
          this.props.contacts.filter(c=>(
              c.name.toLowerCase().includes(this.state.query.toLowerCase())
          ))
        const curCnt = showingContacts.length;
        const total = this.props.contacts.length;
        return(

            <div className="lists-contacts">
               
                <div className='list-contacts-top' style={{position:'relative'}}>
                     <input 
                     className="search-contacts" 
                     type="text"
                     placeholder="Search"
                     value={this.state.query}
                     onChange={(event) => (this.updateQuery(event.target.value))}
                    />
                    {/* <p>{JSON.stringify(this.state)}></p> */}
                     {/* <p>{this.state.query} </p> */}
                </div>
                {
                    (showingContacts.length !== this.props.contacts.length) &&
                    (
                     <div className="show-more">
                      <span> Now showing {curCnt} of {total}  </span> <button onClick={this.clearQuery}> Show More </button>
                      </div>
                    )
                }
                <ol className='contact-list'>

                {showingContacts.map((contact) => (
                    <li key={contact.id} className='contact-list-item'>
                        <div
                            className = 'contact-avatar'
                            style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}>
                        </div>
                        <div className='contact-details'>
                            <p className ='contact-name'>{contact.name}</p>
                            <p className='contact-handle'>{contact.handle}</p>
                        </div>
                        {/* {have to be a function} */}
                        <button className="contact-remove" onClick={(event)=>this.props.removeContact(contact.id)}></button>
                       
                    </li>)
                  )
                }
            </ol>
            </div>  
        )
    }
}

export default ListContacts