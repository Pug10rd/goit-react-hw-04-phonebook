import { useEffect, useState } from "react";
import { ContactForm } from './ContactForm/ContactForm'
import { nanoid } from 'nanoid';
import { Contacts } from "./Contacts/Contacts";
import { SearchFilter } from "./SearchFilter/SearchFilter";

const getLocalData = () => {
    const contacts = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contacts);
    if (parsedContact) {
      return parsedContact
    }
  }

const App = () => {
  // contacts: [],
  // name: '',
  // number: '',
  // filter: '',
  const [contacts, setContacts] = useState(() => getLocalData() ?? []);
  const [filter, setFilter] = useState('');

const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const isExist = contacts.find(
      item => item.name === newContact.name
    );
    if (isExist) {
      alert(`${newContact.name} is already exists`);
    } else {
      setContacts((prev) => [newContact, ...prev]);
    }
  };
  
    const handleDeleteContact = id => {
    setContacts((prev) => prev.filter((contact) => id !== contact.id))
    };
  
    const findFilterValue = e => {
    const { value } = e.currentTarget;
    setFilter(value);
    };
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  return (
      <>
        <ContactForm addContact={addContact} />
        <Contacts
          contacts={filteredContacts}
          onDelete={handleDeleteContact}
        />
        <SearchFilter
          value={filter}
          onChange={findFilterValue}
        />
      </>
    );
};

export default App;
  // 

  // const componentDidUpdate = (_, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  // const addContact = data => {
  //   const newContact = {
  //     id: nanoid(),
  //     name: data.name,
  //     number: data.number,
  //   };
  //   const isExist = this.state.contacts.find(
  //     item => item.name === newContact.name
  //   );
  //   if (isExist) {
  //     alert(`${newContact.name} is already exists`);
  //   } else {
  //     this.setState(({ contacts }) => ({
  //       contacts: [newContact, ...contacts],
  //     }));
  //   }
  //   this.setState({ name: '' });
  // };
  // findFilterValue = e => {
  //   const { value } = e.currentTarget;
  //   this.setState({ filter: value });
  // };
  // handleDeleteContact = id => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(user => user.id !== id),
  //   }));
  // };
  // render() {
  //   console.log(this.state.filter);
  //   const filteredContacts = this.state.contacts.filter(({ name }) =>
  //     name.toLowerCase().includes(this.state.filter.toLowerCase())
  //   );
  //   // return (
  //   //   <>
  //   //     <ContactForm addContact={this.addContact} />
  //   //     <Contacts
  //   //       contacts={filteredContacts}
  //   //       onDelete={this.handleDeleteContact}
  //   //     />
  //   //     <SearchFilter
  //   //       value={this.state.filter}
  //   //       onChange={this.findFilterValue}
  //   //     />
  //   //   </>
  //   // );
  // }



  // onSubmit = e => {
  //   e.preventDefault();
  //   const newContact = { id: new Date(), name: this.state.name };
  //   const isExist = this.state.contacts.find(
  //     item => item.name === newContact.name
  //   );
  //   if (isExist) {
  //     alert(`${newContact.name} is already exists`);
  //   } else {
  //     this.setState(prev => ({
  //       contacts: [...prev.contacts, newContact],
  //     }));
  //   }
  //   this.setState({ name: '' });
  // };

  // onDelete = id => {
  //   const newContacts = this.state.contacts.filter(item => item.id !== id);
  //   this.setState({ contacts: newContacts });
  // };

