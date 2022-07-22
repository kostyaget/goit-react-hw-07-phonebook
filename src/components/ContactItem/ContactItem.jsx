import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'services/phoneBookApi';
import { showSuccessMessage, showErrorMessage } from 'utils/notofications';
import { FaTrashAlt, FaSpinner } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
    ContactItemWrapper,
    ContactItemName,
    ContactItemNum,
    DeleteBtn,
} from './ContactItem.styled';

export default function ContactItem({ id, name, number }) {
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    const onContactdelete = async (contactId, contactName) => {
        try {
            await deleteContact(contactId);
            showSuccessMessage(
                `"${contactName}" has been deleted from your phonebook`
            );
        }
        catch (error) {
            console.log(error.message);
            showErrorMessage(
                `Something goes wrong, "${contactName}" was not deleted`
            );
        };
    };


    return (
    <ContactItemWrapper>
        <ContactItemName>{name}</ContactItemName>
        <ContactItemNum href={`tel:${number}`}>{number}</ContactItemNum>
        <DeleteBtn type="button" onClick={() => onContactdelete(id, name)} disabled ={isDeleting} aria-label="Delete contact">
        <IconContext.Provider value={{ size: '2em' }}>
        {isDeleting ? <FaSpinner/> : <FaTrashAlt /> }
        </IconContext.Provider>
        </DeleteBtn>
    </ContactItemWrapper>
    );
}

ContactItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // number: PropTypes.string.isRequired,
}; 