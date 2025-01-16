import { gql } from "@apollo/client";

export const DELETE_CLIENTS= gql` 
    mutation {
        removebyCompanyClient(company: "nombreEmpresa", client: "nombreCliente") 
    }
`;