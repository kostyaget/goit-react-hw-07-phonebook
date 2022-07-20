import styled from '@emotion/styled';

export const FormWrapper = styled.div`
  margin-bottom: 40px;
`;

export const ContactSubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid darkgray;
  border-radius: 5px;
  background: rgb(144,58,180);
  background: linear-gradient(90deg, rgba(144,58,180,1) 40%, rgba(69,69,252,1) 86%);
  box-shadow: 0px 2px 10px -3px;
`;

export const FormInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0px 20px;
  font-size: 24px;
`;

export const FormInput = styled.input`
  width: 300px;
  margin-top: 4px;
  padding: 4px;
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 5px;
  background-color: ghostwhite;
`;

export const FormSubmitBtn = styled.button`
  display: inline-block;  
  width: 160px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  text-transform: uppercase;
  border: 0px;
  border-radius: 20px;
  background-color: rgb(144,58,180,0);;
  color: white;
  box-shadow: none;
  transition: all 250ms ease-in-out; 

  :hover, :focus {
    box-shadow:  0px 0px 9px rgba(0, 0, 0, 1),
                inset 0px 0px 0px 0px #0000004d;
  }
`;