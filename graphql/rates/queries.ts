import { gql } from "@apollo/client";

export const GET_RATES= gql` 
    query tasasdecambio($FECHATASA: DateTime!) {
        tasasdecambio (FECHATASA: $FECHATASA) {
            EXGTBLID   
            CURNCYID   
            EXCHDATE   
            TIME1      
            XCHGRATE   
            EXPNDATE
        }
    }
`;