import { gql } from "@apollo/client";

export const GET_ARRAYPROFORMAS= gql` 
    query findCount($sopnumbe: [String!]!, $empresa: String!) {
        findCount(SOPNUMBE: $sopnumbe, EMPRESA: $empresa) {
            numero_documento
        }
    }
`;
