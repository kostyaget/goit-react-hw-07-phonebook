import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {useGetAllContactsQuery,useAddContactMutation,} from 'services/phoneBookApi';
// import { getContactsItems, addContact } from 'redux/contacts/slice';
import { showInfoMessage, showSuccessMessage, showErrorMessage } from 'utils/notofications';
import {
  FormWrapper,
  ContactSubmitForm,
  FormInputLabel,
  FormInput,
  FormSubmitBtn,
} from './ContactForm.styled';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: contacts } = useGetAllContactsQuery();
  const [addContact, { isLoading: isCreating }] = useAddContactMutation();
  // const contacts = useSelector(getContactsItems);
  // const dispatch = useDispatch();

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const onNameChange = evt => {
    setName(evt.currentTarget.value);
  };

  const onNumberChange = evt => {
    setNumber(evt.currentTarget.value);
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const onContactFormSubmit = evt => {
    evt.preventDefault();

    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() 
      )
    ) {
      showInfoMessage('This contact is already in your phonebook');
      return;
    }

    if (contacts.find(contact => contact.number === number)) {
      showInfoMessage('This phone number is already in your phonebook');
      return;
    }

    const newContact = {
      name,
      number,
    };

    try {
      addContact(newContact);
      showSuccessMessage('New contact has been added in your phonebook');
    } catch (error) {
      console.log(error.message);
      showErrorMessage('Something goes wrong, new contact was not created');
    };
      formReset();
  }



  return (
    <FormWrapper>
      <ContactSubmitForm onSubmit={onContactFormSubmit}>
        <FormInputLabel htmlFor={nameInputId}>
          Name
          <FormInput
            type="text"
            name="name"
            placeholder="Type name here"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={onNameChange}
            id={nameInputId}
            required
          />
        </FormInputLabel>
        <FormInputLabel htmlFor={numberInputId}>
          Number
          <FormInput
            type="tel"
            name="number"
            placeholder="Type number here"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={onNumberChange}
            id={numberInputId}
            required
          />
        </FormInputLabel>
        <FormSubmitBtn type="submit" disabled={isCreating}>
          {isCreating ? 'Adding...' : 'Add contact'}
        </FormSubmitBtn>
      </ContactSubmitForm>
    </FormWrapper> 
  );
};

