
import { Injectable } from '@nestjs/common';
import { CreateClientCalculatedDto } from './dto/create-client-proform-info.dto';
import { UpdateClientCalculatedDto } from './dto/update-client-proform-info.dto';
import { GET_CLIENTS } from "graphql/clients/queries";
import { GET_RATES } from "graphql/rates/queries";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

@Injectable()
export class ClientInfoService {
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

  
  async getProformasChacao(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientchacao.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }

  async getProformasManeiro(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientManeiro.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }

  async getProformasCaroni(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientCaroni.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }

  async getProformasHatillo(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientHatillo.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }

  async getProformasBaruta(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientBaruta.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }

  async getProformasSanDiego(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientSDiego.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }

  async getProformasElTigre(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientTigre.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }

  async getProformasInvBaruta(CUSTNMBR,PAGE){
    const { data } = await this.apolloClientInvBaruta.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      },
    });


    //console.log(data);
    //const primerClienteOriginal = data.clientProformasByRIF.proformas[0];
    //console.log(primerClienteOriginal);

 
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
    
    const clientesConNombreCompletos = data.clientProformasByRIF.proformas.map(cliente => {
      //comentario = comentario ? Math.round(Number(comentario)) : 0;
      const formato=new Date(cliente.DOCDATE);
      const day = formato.getDate().toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaaa=`${year}-${month}-${day}`;
      //fechaa.push(fechaaa);

      /*const len=(cliente.work_history[0]?.USRDEF03 ? cliente.work_history[0]?.USRDEF03 : 0).length;
      //console.log(cliente.work_history)
          if(len===0){
            const formato=new Date(cliente.DOCDATE);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }else{
            const formato=new Date(cliente.work_history[0]?.USRDAT02);
            const day = formato.getDate().toString().padStart(2, '0');
            const month = (formato.getMonth() + 1).toString().padStart(2, '0');
            const year = formato.getFullYear();
            fecha_emision_formato= `${day}-${month}-${year}`;
            fecha_emision_original= `${year}-${month}-${day}`;
          }

          const fecha1=new Date(cliente.DOCDATE).getTime();
          const now=new Date().getTime();
          const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
          if(len===0){
            if(now>fecha1){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          }else{
            if(now>fecha2){
              vigencia= 'VENCIDA';
            }else{
              vigencia= 'VIGENTE';
            }
          } */

          
    });
    const clientesConNombreCompleto = data.clientProformasByRIF.proformas.map(cliente => {
      const comentario = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const formato=new Date(cliente.DOCDATE);
      const day = (formato.getDate()+1).toString().padStart(2, '0');
      const month = (formato.getMonth() + 1).toString().padStart(2, '0');
      const year = formato.getFullYear();
      const fechaa=`${day}-${month}-${year}`;
      const fechaaa=`${year}-${month}-${day}`;
      if (cliente.work_history[0]?.USRDEF03?.trim() !== '') {
          
        const formato = new Date(cliente.work_history[0]?.USRDAT02);
        
        const day = (formato.getDate()+1).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        fecha_emision_formato= `${day}-${month}-${year}`;
        fecha_emision_original= `${year}-${month}-${day}`;
        //console.log(fecha_emision_original)
      } else {
        fecha_emision_formato=fechaa;
        fecha_emision_original=fechaaa; 
      }

      const fecha1=new Date(cliente.DOCDATE).getTime();
      const now=new Date().getTime();
      const fecha2=new Date(cliente.work_history[0]?.USRDAT02).getTime();
      if(cliente.work_history[0]?.USRDEF03?.trim() !== ''){
        if(now>fecha1){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      }else{
        if(now>fecha2){
          vigencia= 'VENCIDA';
        }else{
          vigencia= 'VIGENTE';
        }
      } 
      const fecha = new Date(cliente.CREATDDT);
      const opciones: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      };
      fechaFormateada = fecha.toLocaleString('en', opciones);
      return {
        numero_documento: cliente.SOPNUMBE.trim(),
        cuenta_contrato: cliente.PRSTADCD.trim(),
        base_imponible: parseFloat((cliente.SUBTOTAL).toFixed(2)),
        base_imponible_usd: parseFloat((cliente.ORSUBTOT).toFixed(2)),
        porcentaje_impuesto: comentario,
        total_impuesto: parseFloat((cliente.TAXAMNT).toFixed(2)),
        total_impuesto_usd: parseFloat((cliente.ORTAXAMT).toFixed(2)),
        monto_documento: parseFloat((cliente.DOCAMNT).toFixed(2)),
        monto_documento_usd: parseFloat((cliente.ORDOCAMT).toFixed(2)),
        fecha_emision:fechaaa,
        fecha_emision_formato:fecha_emision_formato,
        fecha_emision_original:fecha_emision_original,
        vencimiento_documento:fecha_emision_formato,
        periodo: cliente.work_history[0]?.COMMENT_1?.trim() ? cliente.work_history[0]?.COMMENT_1?.trim() : '',
        vigencia_documento: vigencia,
        moneda: cliente.CURNCYID.trim(),
        fecha_creacion:fechaFormateada
      }
        
         

    });
    return clientesConNombreCompleto;
  }
  /*async getProformascalculated(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    const fechaHoy = new Date();
    const fechaISO = fechaHoy.toISOString().split('T')[0];
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1;
    const año = fechaHoy.getFullYear();
    const noww = `${año}-${mes}-${dia}`;
    const nowww = new Date(noww);
    const noww12 = nowww.toLocaleDateString('sv');
    const nowwwwn = noww12.split('T');
    const fechafechafecha = new Date(nowwwwn[0]);
  
    // Obtener tasas de cambio
    const ratesResult = await this.apolloClientSecundario.query({
      query: GET_RATES,
      variables: {
        FECHATASA: fechaISO
      }
    });
  
    const { data: ratesData } = ratesResult;
    const tasasDecambio1 = ratesData.tasasdecambio || [];
  
    const obtenerValores1 = () => {
      const result = {usdnow: null, eurnow: null, ptrnow: null};
      tasasDecambio1.forEach(tasa => {
        switch (tasa.CURNCYID.trim()) {
          case 'USD':
            result.usdnow = tasa.XCHGRATE;
            break;
          case 'EUR':
            result.eurnow = tasa.XCHGRATE;
            break;
          case 'PTR':
            result.ptrnow = tasa.XCHGRATE;
            break;
        }
      });
      return result;
    };
  
    const {usdnow, eurnow, ptrnow} = obtenerValores1();
    tasabasenow = ptrnow;
    if(usdnow > eurnow){
      tasabasenow = usdnow;
    } else if(usdnow < eurnow){
      tasabasenow = eurnow;
    }
  
    // Obtener clientes
    const clientsResult = await this.apolloClientchacao.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      }
    });
  
    const { data: clientsData } = clientsResult;
    const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];
  
    const resultados = [];
    for (const cliente of clientesConNombreCompletos) {
      const sopnumbe = cliente.SOPNUMBE.trim();
      const porcimpuesto = cliente.sales_taxes_work_history[0]?.TXDTLPCTAMT;
      const comentario = cliente.work_history[0]?.COMMENT_1?.trim();
      const basereal = cliente.SUBTOTAL;
      const formato = new Date(cliente.DOCDATE);
      const year = formato.getUTCFullYear();
      const month = (formato.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = formato.getUTCDate().toString().padStart(2, '0');
      const fechaa = `${year}-${month}-${day}`;
  
      let fechasEmisionOriginal = [];
      if (cliente.work_history && cliente.work_history[0] && cliente.work_history[0].USRDEF03?.trim()) {
        const formato = new Date(cliente.work_history[0].USRDAT02);
        const day = (formato.getDate()).toString().padStart(2, '0');
        const month = (formato.getMonth() + 1).toString().padStart(2, '0');
        const year = formato.getFullYear();
        const fecha_emision_original = `${year}-${month}-${day}`;
        fechasEmisionOriginal.push(new Date(fecha_emision_original));
      } else {
        fechasEmisionOriginal.push(new Date(fechaa)); 
      }
  
      const ratePromises = fechasEmisionOriginal.map(fecha => 
        this.apolloClientSecundario.query({
          query: GET_RATES, 
          variables: {
            FECHATASA: fecha.toISOString().split('T')[0]
          }
        })
      );
  
      const ratesResults = await Promise.all(ratePromises);
      const tasasDecambioPa = ratesResults.flatMap(ratesResult => 
        (ratesResult.data || {}).tasasdecambio || []
      );
  
      const tasasPorMonedaYFecha = tasasDecambioPa.reduce((acc, tasa) => {
        const { CURNCYID, EXCHDATE, XCHGRATE } = tasa;
        const moneda = CURNCYID.trim();
        const fecha = EXCHDATE.split('T')[0];
  
        if (!acc[moneda]) {
          acc[moneda] = {};
        }
        
        acc[moneda][fecha] = XCHGRATE;
        return acc;
      }, {});
  
      const obtenerTasasPorFechas = (moneda, fechas) => {
        return fechas.map(fecha => {
          const fechaISO = fecha.toISOString().split('T')[0];
          const tasa = tasasPorMonedaYFecha[moneda]?.[fechaISO];
          return tasa ? { fecha: fechaISO, tasa } : null;
        }).filter(Boolean);
      };
  
      const tasasEUR = obtenerTasasPorFechas('EUR', fechasEmisionOriginal);
      const tasasUSD = obtenerTasasPorFechas('USD', fechasEmisionOriginal);
      const tasasPTR = obtenerTasasPorFechas('PTR', fechasEmisionOriginal);
  
      for (let i = 0; i < fechasEmisionOriginal.length; i++) {
        const fechaDate = new Date(fechasEmisionOriginal[i]);
        //const fechaISO = fechaDate.toISOString().split('T')[0];
        const noww12= fechaDate.toLocaleDateString('sv');
        const nowwwwn=noww12.split('T');
        const fechafechafecha=new Date(nowwwwn[0]);
        const fechaDatenumber=fechafechafecha.getTime();
  
        let EUR;
        let USD;
        let PTR;
        let tasabasptr;
        let tasabasearmon;
        //console.log(fechaDate)
        for (const tasa of tasasEUR) {
          if (new Date(tasa.fecha).getTime === fechaDate.getTime) {
              EUR = tasa.tasa;
              break; // Exit the loop once a match is found
          }
        }
        for (const tasa of tasasUSD) {
          if (new Date(tasa.fecha).getTime === fechaDate.getTime) {
              USD = tasa.tasa;
              break;
          }
        }
        for (const tasa of tasasPTR) {
          if (new Date(tasa.fecha).getTime === fechaDate.getTime) {
              PTR = tasa.tasa;
              break;
          }
          //console.log(tasa.fecha===fechaDatenumber);
        }
  
        const datearmonizacion = new Date('2024-02-01');
        const datearmonizacionn = datearmonizacion.getTime();
  
        if (fechaDate.getTime() < datearmonizacionn) {
          tasabasearmon = PTR;
          tasabasenow = ptrnow;
        } else if (fechaDate.getTime() >= datearmonizacionn) {
          if (USD > EUR) {
            tasabasearmon = USD;
          } else if (USD < EUR) {
            tasabasearmon = EUR;
          }
        }
  
        const client = cliente.SOPNUMBE.trim();
        const basebs = cliente.SUBTOTAL;
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
  
        resultados.push({
          comentario:comentario,
          sopnumbe: client,
          basereal: basebs,
          fechasEmisionOriginal:fechasEmisionOriginal,
          montobase: montobase,
          montocalculado: montocalculado
        });
      }
    }
  
    return resultados;
  }*/
  

  async fechastasas(usdnow,eurnow,ptrnow,fecha_emision_original,basebs){

    return 'clientesConNombreCompletos';
    
    
  }

  create(createClientCalculatedDto: CreateClientCalculatedDto) {
    return 'This action adds a new clientCalculated';
  }

  findAll() {
    return `This action returns all clientCalculated`;
  }


  update(id: number, updateClientCalculatedDto: UpdateClientCalculatedDto) {
    return `This action updates a #${id} clientCalculated`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientCalculated`;
  }
}
