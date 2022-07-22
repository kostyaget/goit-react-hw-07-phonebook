
import { useSelector} from 'react-redux';
import { getFilterValue } from 'redux/filter/slice';
import sortContactsByName from 'utils/sortContactsByName';
import ContactItem from 'components/ContactItem';
import { FaRedo } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
    TotalContactsText,
    TotalContactsNum,PhonebookList,
    ListElement,LoaderItem,
    NoMatchesText,NoContactsText,
    FetchErrorText,RefetchBtn,
} from './ContactList.styled';
import { useGetAllContactsQuery } from 'services/phoneBookApi';

export default function ContactList() {
    const {
    data = [],
    isLoading,
    isError,
    refetch,
    } = useGetAllContactsQuery();

    const filterValue = useSelector(getFilterValue);

    const totalContactsAmount = () => {
    if (!data) {
        return 0;
    }
    return data.length;
    };

    const getVisibleContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return data
        .filter(data =>
        data.name.toLowerCase().includes(normalizedFilter) ||
        data.number.includes(normalizedFilter)
    )
    .sort(sortContactsByName);
    };

    const visibleContacts = getVisibleContacts();

    return (
    <>
        {isLoading ? (
        <LoaderItem>Loading...</LoaderItem>
        ) : totalContactsAmount() > 0 ? (
        <>
            <TotalContactsText>
            Contacts amount:{' '}
            <TotalContactsNum>{totalContactsAmount()}</TotalContactsNum>
            </TotalContactsText>
            <PhonebookList>
            {visibleContacts.length ? (
                visibleContacts.map(({ id, name, number }) => (
                <ListElement key={id}>
                    <ContactItem id={id} name={name} phone={number} />
                </ListElement>
            ))
            ) : (
                <NoMatchesText>No contact matches</NoMatchesText>
            )}
            </PhonebookList>
        </>
        ) : (
        <>
            <NoContactsText> There are no contacts in your phonebook </NoContactsText>
        </>
        )}
        {isError && (
        <>
            <FetchErrorText>Fetch error! Refetch contacts</FetchErrorText>
            <RefetchBtn type="button" onClick={() => refetch()}>
            <IconContext.Provider value={{ size: '5em' }}>
                <FaRedo />
            </IconContext.Provider>
            </RefetchBtn>
        </>
        )}
    </>
    );
}