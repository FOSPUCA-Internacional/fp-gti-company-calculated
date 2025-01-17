import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { DELETE_CLIENTS } from "graphql/client-delete/mutation";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

@Injectable()
export class ClientService {
  private ApolloClientGestionAdministracion: ApolloClient<any>;

  constructor() {
    try {
      this.ApolloClientGestionAdministracion = new ApolloClient({
        uri: 'http://contenedor_gestion-administracion_api:4100/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }
  }
  create(createClientDto: CreateClientDto) {
    return 'This action adds a a new client';
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async deleteclient(company,client) {
    const { data } = await this.ApolloClientGestionAdministracion.query({
      query: DELETE_CLIENTS,
      variables: {
        nombreEmpresa: company,
        client: client,
      },
    });
    if (data.removebyCompanyClient) {
      return 'El proceso fue exitoso';
    } else {
      return 'No se pudo realizar el proceso';
    }
  }
}
