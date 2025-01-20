 import { Injectable } from '@nestjs/common';
import { CreateClientInformationDto } from './dto/create-client-information.dto';
import { UpdateClientInformationDto } from './dto/update-client-information.dto';
import { GET_CLIENTS_INFO } from "graphql/client-info/queries";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GET_CLIENTS_INFO_BY_RIF } from "graphql/client-info-rif/queries";

@Injectable()
export class ClientInformationService {
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

  async getClientInformationChacao(pageNumber){
    const infoResult = await this.apolloClientchacao.query({ 
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationManeiro(pageNumber){
    const infoResult = await this.apolloClientManeiro.query({
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
    
  }

  async getClientInformationCaroni(pageNumber){
    const infoResult = await this.apolloClientCaroni.query({
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationHatillo(pageNumber){
    const infoResult = await this.apolloClientHatillo.query({
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationBaruta(pageNumber){
    const infoResult = await this.apolloClientBaruta.query({
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationSanDiego(pageNumber){
    const infoResult = await this.apolloClientSDiego.query({
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationElTigre(pageNumber){
    const infoResult = await this.apolloClientTigre.query({
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationInvBaruta(pageNumber){
    const infoResult = await this.apolloClientInvBaruta.query({
      query: GET_CLIENTS_INFO,
      variables: {
        page: pageNumber
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationByRifChacao(CUSTNMBR){
    const infoResult = await this.apolloClientchacao.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationByRifManeiro(CUSTNMBR){
    const infoResult = await this.apolloClientManeiro.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });;

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
    
  }

  async getClientInformationByRifCaroni(CUSTNMBR){
    const infoResult = await this.apolloClientCaroni.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });;

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationByRifHatillo(CUSTNMBR){
    const infoResult = await this.apolloClientHatillo.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });;

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationByRifBaruta(CUSTNMBR){
    const infoResult = await this.apolloClientBaruta.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });;

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationByRifSanDiego(CUSTNMBR){
    const infoResult = await this.apolloClientSDiego.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });;

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationByRifElTigre(CUSTNMBR){
    const infoResult = await this.apolloClientTigre.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });;

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }

  async getClientInformationByRifInvBaruta(CUSTNMBR){
    const infoResult = await this.apolloClientInvBaruta.query({
      query: GET_CLIENTS_INFO_BY_RIF,
      variables: {
        custnmbr: CUSTNMBR
      }
    });;

   const { data: clientsbyrif } = infoResult;
    const infoclient = clientsbyrif.clientsbyrif || [];
    //console.log(infoclient)
    const infoarray = infoclient.map((Client) => {
      const RIF = Client.CUSTNMBR.trim();
      const Razon_Social = Client.CUSTNAME.trim();
      const Telefono = Client.PHONE1.trim();
      const Estado = Client.STATE.trim();
      const Email = Client.email[0]?.Email_Recipient?.trim();
      return {RIF, Razon_Social, Telefono, Estado, Email};
    })
    return infoarray;
  }
}
