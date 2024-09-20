import { gql } from "@apollo/client";

export const GET_PROFORMAS= gql` 
    query proformasBySopnumbe($sopnumbe: String!) {
        proformasBySopnumbe(SOPNUMBE: $sopnumbe) {
            SOPNUMBE
            detail {
                SOPNUMBE
                ITEMNMBR
                ITEMDESC
                UNITPRCE
                ORUNTPRC
                TAXAMNT
                ORTAXAMT
                TAXSCHID
                LNITMSEQ
            }
            work_history{
                COMMENT_1
            }
        }   
    }
`;