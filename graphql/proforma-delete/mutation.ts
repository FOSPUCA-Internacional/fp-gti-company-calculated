import { gql } from "@apollo/client";

export const DELETE_PROFORMA= gql` 
    mutation removebyDocument($nombreEmpresa: String!, $proforma1: String!, $proforma2: String!) {
        removebyDocument(company: $nombreEmpresa, documentinit: $proforma1,  documentend: $proforma2) 
    }
`;

