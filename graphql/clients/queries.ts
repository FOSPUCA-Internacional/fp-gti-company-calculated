import { gql } from "@apollo/client";

export const GET_CLIENTS= gql` 
    query clientProformasByRIF($custnmbr: String!, $page: Int!, $filterYear: Int!, $filterMonth: Int!) {
    clientProformasByRIF(CUSTNMBR: $custnmbr, PAGE:$page, FILTERYEAR:$filterYear, FILTERMONTH:$filterMonth) {
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
            detail{
                UNITPRCE
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