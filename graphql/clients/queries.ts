import { gql } from "@apollo/client";

export const GET_CLIENTS= gql` 
    query clientProformasByRIF($custnmbr: String!, $page: Int!) {
    clientProformasByRIF(CUSTNMBR: $custnmbr, PAGE:$page ) {
        CUSTNMBR
        proformas{
            SOPNUMBE
            PRSTADCD
            SUBTOTAL
            ORSUBTOT
            TAXAMNT
            ORTAXAMT
            DOCAMNT
            ORDOCAMT
            DOCDATE
            CURNCYID
            CREATDDT
            sales_taxes_work_history{
                TXDTLPCTAMT
            }
            work_history{
                USRDAT02
                COMMENT_1
                USRDEF03
            }
        }
    }
}
`;

export const GET_COUNTPROFORMAS= gql` 
    query countProformasByRIF($custnmbr: String!) {
        countProformasByRIF(CUSTNMBR: $custnmbr) {
            CUSTNMBR
            proformasCount
        }
    }
`;