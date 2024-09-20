import { Injectable } from '@nestjs/common';
import { CreateProformasCalculatedDto } from './dto/create-proformas-calculated.dto';
import { UpdateProformasCalculatedDto } from './dto/update-proformas-calculated.dto';
import { GET_PROFORMAS } from "graphql/proformas/queries";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

@Injectable()
export class ProformasCalculatedService {
  private apolloClient: ApolloClient<any>;

  constructor() {
    try {
      this.apolloClient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }
  }

  async getProformasbysopnumbe(SOPNUMBE){
    const { data } = await this.apolloClient.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);
    /*let comentario;
    const clientesConNombreCompletos = data.proformasBySopnumbe.work_history.map(cliente => {
      
      comentario = cliente.COMMENT_1
      
    });*/

    const clientesConNombreCompleto = data.proformasBySopnumbe.detail.map(proforma => {
      let comentario;
      const clientesConNombreCompletos = data.proformasBySopnumbe.work_history.map(cliente => {
        comentario = cliente.COMMENT_1
      });

      return{ 
        numero_proforma: proforma.ITEMNMBR.trim(),
        cod_articulo: proforma.ITEMNMBR.trim(),
        concepto: proforma.ITEMDESC.trim(),
        periodo: comentario,
        monto_bs: proforma.UNITPRCE,
        monto_usd: proforma.ORUNTPRC,
        impuesto_bs: proforma.TAXAMNT,
        impuesto_usd: proforma.ORTAXAMT,
        cod_impuesto: proforma.TAXSCHID.trim(),
        monto_detalle: proforma.LNITMSEQ
      }
    });
    return clientesConNombreCompleto;
  }

  create(createProformasCalculatedDto: CreateProformasCalculatedDto) {
    return 'This action adds a new proformasCalculated';
  }

  findAll() {
    return `This action returns all proformasCalculated`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proformasCalculated`;
  }

  update(id: number, updateProformasCalculatedDto: UpdateProformasCalculatedDto) {
    return `This action updates a #${id} proformasCalculated`;
  }

  remove(id: number) {
    return `This action removes a #${id} proformasCalculated`;
  }
}
