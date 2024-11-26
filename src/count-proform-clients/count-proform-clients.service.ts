import { Injectable } from '@nestjs/common';
import { CreateCountProformClientDto } from './dto/create-count-proform-client.dto';
import { UpdateCountProformClientDto } from './dto/update-count-proform-client.dto';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GET_COUNTPROFORMAS } from "graphql/clients/queries";

@Injectable()
export class CountProformClientsService {
  private apolloClientchacao: ApolloClient<any>;
  private apolloClientManeiro: ApolloClient<any>;
  private apolloClientCaroni: ApolloClient<any>;
  private apolloClientHatillo: ApolloClient<any>;
  private apolloClientBaruta: ApolloClient<any>;
  private apolloClientSDiego: ApolloClient<any>;
  private apolloClientTigre: ApolloClient<any>;
  private apolloClientInvBaruta: ApolloClient<any>;
  
  constructor() {
    try {
      this.apolloClientchacao = new ApolloClient({
        uri: 'http://company-chacao-api-contenedor:4001/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientManeiro = new ApolloClient({
        uri: 'http://company-maneiro-api-contenedor:4002/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientCaroni = new ApolloClient({
        uri: 'http://company-caroni-api-contenedor:4000/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientHatillo = new ApolloClient({
        uri: 'http://company-hatillo-api-contenedor:4003/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientBaruta = new ApolloClient({
        uri: 'http://company-baruta-api-contenedor:4004/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientSDiego = new ApolloClient({
        uri: 'http://company-sdiego-api-contenedor:4005/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientTigre = new ApolloClient({
        uri: 'http://company-tigre-api-contenedor:4006/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientInvBaruta = new ApolloClient({
        uri: 'http://company-invbaruta-api-contenedor:4009/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }
  }

  async getcountproformabyclient(CUSTNMBR){
    const resultadosinvbaruta = [];
    const resultadoscaroni = [];
    const resultadosbaruta = [];
    const resultadoshatillo = [];
    const resultadosmaneiro = [];
    const resultadossdiego = [];
    const resultadostigre = [];
    const resultadoschacao = [];
    const resultados= [];
    const clientsResultinvbaruta = await this.apolloClientInvBaruta.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: CUSTNMBR,
      }
    });

    const clientsResultcaroni = await this.apolloClientCaroni.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: CUSTNMBR,
      }
    });

    const rif= CUSTNMBR+'T';
    const clientsResultbaruta = await this.apolloClientBaruta.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: rif,
      }
    });

    const clientsResulthatillo = await this.apolloClientHatillo.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: CUSTNMBR,
      }
    });

    const clientsResultmaneiro = await this.apolloClientManeiro.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: CUSTNMBR,
      }
    });

    const clientsResultsdiego = await this.apolloClientSDiego.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: CUSTNMBR,
      }
    });

    const clientsResulttigre = await this.apolloClientTigre.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: CUSTNMBR,
      }
    });

    const clientsResultchacao= await this.apolloClientchacao.query({
      query: GET_COUNTPROFORMAS,
      variables: {
        custnmbr: CUSTNMBR,
      }
    });

    const { data: clientsDatainvbaruta } = clientsResultinvbaruta;
    const resultcountinvbaruta = clientsDatainvbaruta.countProformasByRIF || {};
    //console.log(resultcountinvbaruta)
    if(Object.keys(resultcountinvbaruta).length === 0){
      resultadosinvbaruta.push({
        INV_BARUTA: 0
      });
    }else{
        const CUSTNMBR = resultcountinvbaruta.CUSTNMBR.trim();
        const countproforma = resultcountinvbaruta.proformasCount;
         
        resultadosinvbaruta.push({
          INV_BARUTA: countproforma
        });
    }
    

    const { data: clientsDatacaroni } = clientsResultcaroni;
    const resultcountcaroni = clientsDatacaroni.countProformasByRIF || {};

    if(Object.keys(resultcountcaroni).length === 0){
      resultadoscaroni.push({
        CARONI: 0
      });
    }else{
      
        const CUSTNMBR = resultcountcaroni.CUSTNMBR.trim();
        const countproforma = resultcountcaroni.proformasCount;
        
        resultadoscaroni.push({
          CARONI: countproforma
        });
    }

    if (!clientsResultbaruta || clientsResultbaruta.data === null) { 
      const { data: clientsDatabaruta } = clientsResultbaruta;
      const resultcountbaruta = clientsDatabaruta.countProformasByRIF || {};

      if(Object.keys(resultcountbaruta).length === 0){
        resultadosbaruta.push({
          BARUTA: 0
        });
      }else{
          const CUSTNMBR = resultcountbaruta.CUSTNMBR.trim();
          const countproforma = resultcountbaruta.proformasCount;
          
          resultadosbaruta.push({
            BARUTA: countproforma
          });
      }
    }else{
      const clientsResultbaruta = await this.apolloClientBaruta.query({
        query: GET_COUNTPROFORMAS,
        variables: {
          custnmbr: rif,
        }
      });
      const { data: clientsDatabaruta } = clientsResultbaruta;
      const resultcountbaruta = clientsDatabaruta.countProformasByRIF || {};
      //console.log(resultcountbaruta)
      if(Object.keys(resultcountbaruta).length === 0){
        resultadosbaruta.push({
          BARUTA: 0
        });
      }else{
          const CUSTNMBR = resultcountbaruta.CUSTNMBR.trim();
          const countproforma = resultcountbaruta.proformasCount;
          
          resultadosbaruta.push({
            BARUTA: countproforma
          });
        
      }
    }
    
    const { data: clientsDatahatillo } = clientsResulthatillo;
    const resultcounthatillo = clientsDatahatillo.countProformasByRIF || {};

    if(Object.keys(resultcounthatillo).length === 0){
      resultadoshatillo.push({
        HATILLO: 0
      });
    }else{
        const CUSTNMBR = resultcounthatillo.CUSTNMBR.trim();
        const countproforma = resultcounthatillo.proformasCount;
        
        resultadoshatillo.push({
          HATILLO: countproforma
        });
    }

    const { data: clientsDatamaneiro } = clientsResultmaneiro;
    const resultcountmaneiro = clientsDatamaneiro.countProformasByRIF || {};

    if(Object.keys(resultcountmaneiro).length === 0){
      resultadosmaneiro.push({
        MANEIRO: 0
      });
    }else{
        const CUSTNMBR = resultcountmaneiro.CUSTNMBR.trim();
        const countproforma = resultcountmaneiro.proformasCount;
        
        resultadosmaneiro.push({
          MANEIRO: countproforma
        });
    }

    const { data: clientsDatasdiego } = clientsResultsdiego;
    const resultcountsdiego = clientsDatasdiego.countProformasByRIF || {};

    if(Object.keys(resultcountsdiego).length === 0){
      resultadossdiego.push({
        SAN_DIEGO: 0
      });
    }else{
        const CUSTNMBR = resultcountsdiego.CUSTNMBR.trim();
        const countproforma = resultcountsdiego.proformasCount;
        
        resultadossdiego.push({
          SAN_DIEGO: countproforma
        });
    }

    const { data: clientsDatatigre } = clientsResulttigre;
    const resultcounttigre = clientsDatatigre.countProformasByRIF || {};

    if(Object.keys(resultcounttigre).length === 0){
      resultadostigre.push({
        EL_TIGRE: 0
      });
    }else{
        const CUSTNMBR = resultcounttigre.CUSTNMBR.trim();
        const countproforma = resultcounttigre.proformasCount;
        
        resultadostigre.push({
          EL_TIGRE: countproforma
        });
    }

    const { data: clientsDatachacao } = clientsResultchacao;
    const resultcountchacao = clientsDatachacao.countProformasByRIF || {};

    if(Object.keys(resultcountchacao).length === 0){
      resultadoschacao.push({
        CHACAO: 0
      });
    }else{
        const CUSTNMBR = resultcountchacao.CUSTNMBR.trim();
        const countproforma = resultcountchacao.proformasCount;
        
        resultadoschacao.push({
          CHACAO: countproforma
        });
    }
    //console.log(resultadostigre[0].countproforma)
    let suma = resultadosinvbaruta[0].INV_BARUTA + resultadoscaroni[0].CARONI + resultadosbaruta[0].BARUTA + resultadoshatillo[0].HATILLO + 
    resultadosmaneiro[0].MANEIRO + resultadossdiego[0].SAN_DIEGO + resultadostigre[0].EL_TIGRE + resultadoschacao[0].CHACAO;

    resultados.push({
      CUSTNMBR: CUSTNMBR,
      CHACAO: resultadoschacao[0].CHACAO,
      INV_BARUTA: resultadosinvbaruta[0].INV_BARUTA,
      CARONI: resultadoscaroni[0].CARONI,
      BARUTA: resultadosbaruta[0].BARUTA,
      HATILLO: resultadoshatillo[0].HATILLO,
      MANEIRO: resultadosmaneiro[0].MANEIRO,
      SAN_DIEGO: resultadossdiego[0].SAN_DIEGO,
      EL_TIGRE: resultadostigre[0].EL_TIGRE,
      TOTAL: suma
    });

    return resultados;
  }
}
