import { gql } from "@apollo/client";

export const GET_USERS= gql` 
    query findUSER($usuario: String!) {
        findUSER(USUARIO: $usuario) {
            rif
            especial
            aplica_islr
            aplica_iae
            aplica_tf
        }
    }
`;