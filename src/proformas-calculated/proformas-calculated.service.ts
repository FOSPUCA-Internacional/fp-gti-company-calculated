import { Injectable } from '@nestjs/common';
import { CreateProformasCalculatedDto } from './dto/create-proformas-calculated.dto';
import { UpdateProformasCalculatedDto } from './dto/update-proformas-calculated.dto';
import { GET_PROFORMAS } from "graphql/proformas/queries";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

@Injectable()
export class ProformasCalculatedService {
  private apolloClientchacao: ApolloClient<any>;
  private apolloClientManeiro: ApolloClient<any>;
  private apolloClientCaroni: ApolloClient<any>;
  private apolloClientHatillo: ApolloClient<any>;
  private apolloClientBaruta: ApolloClient<any>;
  private apolloClientSDiego: ApolloClient<any>;
  private apolloClientTigre: ApolloClient<any>;
  private apolloClientInvBaruta: ApolloClient<any>;
  private apolloClientUsers: ApolloClient<any>;

  constructor() {
    try {
      this.apolloClientchacao = new ApolloClient({
        uri: 'http://localhost:4001/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientManeiro = new ApolloClient({
        uri: 'http://localhost:4002/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientCaroni = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientHatillo = new ApolloClient({
        uri: 'http://localhost:4003/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientBaruta = new ApolloClient({
        uri: 'http://localhost:4004/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientSDiego = new ApolloClient({
        uri: 'http://localhost:4005/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientTigre = new ApolloClient({
        uri: 'http://localhost:4006/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientInvBaruta = new ApolloClient({
        uri: 'http://localhost:4009/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientUsers = new ApolloClient({
        uri: 'http://localhost:4010/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }
  }


  async getProformasbysopnumbeChacao(SOPNUMBE){
    const { data } = await this.apolloClientchacao.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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

  async getProformasbysopnumbeManeiro(SOPNUMBE){
    const { data } = await this.apolloClientManeiro.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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

  async getProformasbysopnumbeCaroni(SOPNUMBE){
    const { data } = await this.apolloClientCaroni.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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

  async getProformasbysopnumbeHatillo(SOPNUMBE){
    const { data } = await this.apolloClientHatillo.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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

  async getProformasbysopnumbeBaruta(SOPNUMBE){
    const { data } = await this.apolloClientBaruta.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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

  async getProformasbysopnumbeSanDiego(SOPNUMBE){
    const { data } = await this.apolloClientSDiego.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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

  async getProformasbysopnumbeElTigre(SOPNUMBE){
    const { data } = await this.apolloClientTigre.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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

  async getProformasbysopnumbeInvBaruta(SOPNUMBE){
    const { data } = await this.apolloClientInvBaruta.query({
      query: GET_PROFORMAS,
      variables: {
        sopnumbe: SOPNUMBE,
      },
    });

    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

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
