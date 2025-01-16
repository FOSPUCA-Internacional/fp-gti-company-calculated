import { gql } from "@apollo/client";

export const GET_CLIENTS_INFO_BY_RIF= gql` 
    query clientsbyrif($custnmbr: String!) {
        clientsbyrif(CUSTNMBR: $custnmbr) {
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