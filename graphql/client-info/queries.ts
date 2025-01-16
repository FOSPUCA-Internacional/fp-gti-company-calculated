import { gql } from "@apollo/client";

export const GET_CLIENTS_INFO= gql` 
    query clients($page: Int!) {
        clients(PAGE:$page) {
            CUSTNMBR
            CUSTNAME
            PHONE1
            STATE
            email{
                Email_Recipient
            }
        }
    }
`;