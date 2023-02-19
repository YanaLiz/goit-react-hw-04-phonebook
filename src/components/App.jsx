
import React, { useState, useEffect } from 'react'
import ContactForm from './Contacts/ContactsForm';
import ContactList from './Contacts/ContactList';
import { Filter } from './Contacts/FilterContacts';


const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

    const changeFilter = e => {
      setFilter(e.currentTarget.value );
    };

    const handleSubmit = obj => {
     
      const checkContact = contacts.find(
        contact => contact.name.toLowerCase() === obj.name.toLowerCase()
      );
      if (!checkContact) {
        setContacts( contacts => [...contacts, obj] );
        // console.log(obj)
        return;
      }
      alert(`${obj.name} is already in contacts `);
    }

    const deleteContact = id => {
      setContacts(contacts => contacts.filter(el => el.id !== id));
    }

    const visibileContacts = () => {
     
      const normalize = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalize)
      );
    };
    
      
      
      return (
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={handleSubmit} contacts={contacts} />
          <h2>Contacts</h2>
          <Filter filterName={changeFilter} value={filter} />
          <ContactList
            contacts={visibileContacts()}
            onDelete={deleteContact}
          />
        </div>
      );
    
};
export default App;


// ===
// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: ''
//   }

//   componentDidMount(){
//   const contacts = localStorage.getItem('contacts')
//   const parsedContacts =JSON.parse(contacts)
//   if (parsedContacts) {
//     this.setState({contacts: parsedContacts})
//   }
//   console.log(parsedContacts)
  
//   }

//   componentDidUpdate(prevProps, prevState){
//     console.log('ContactsForm componentDidUpdate')
//     if(this.state.contacts !==prevState.contacts){
//       console.log('оновлені контакти')
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }

//   }

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   handleSubmit = obj => {
//     const { contacts } = this.state;
//     const checkContact = contacts.find(
//       contact => contact.name.toLowerCase() === obj.name.toLowerCase()
//     );
//     if (!checkContact) {
//       this.setState({ contacts: [...contacts, obj] });
//       // console.log(obj)
//       return;
//     }
//     alert(`${obj.name} is already in contacts `);
//   }


//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(el => el.id !== id),
//     }))
//   }


//   visibileContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalize = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalize)
//     );
//   };
//   render() {
//     const visibileContacts = this.visibileContacts();
//     console.log(this.state);
//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.handleSubmit} contacts={this.state.contacts} />
//         <h2>Contacts</h2>
//         <Filter filterName={this.changeFilter} value={this.state.filter} />
//         <ContactList
//           contacts={visibileContacts}
//           onDelete={this.deleteContact}
//         />
//       </div>
//     );
//   }


// };