import { gql } from "@apollo/client";

export const DELETE_PROFORMA= gql` 
    mutation {
    removebyDocument(
        company: "nombreEmpresa",
        documentinit: "proforma1",
        documentend: "proforma2"
    )
}
`;

