import { gql } from "@apollo/client";

export const DELETE_CLIENTS= gql` 
    mutation removebyCompanyClient($nombreEmpresa: String!, $client: String!) {
        removebyCompanyClient(company: $nombreEmpresa, client: $client) 
    }
`;