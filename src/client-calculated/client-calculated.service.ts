
import { Injectable } from '@nestjs/common';
import { CreateClientCalculatedDto } from './dto/create-client-calculated.dto';
import { UpdateClientCalculatedDto } from './dto/update-client-calculated.dto';
import { GET_CLIENTS } from "graphql/clients/queries";
import { GET_RATES } from "graphql/rates/queries";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GET_USERS } from '@/graphql/usersov/queries';
import { GET_ARRAYPROFORMAS } from '@/graphql/proformasov/queries';


@Injectable()
export class ClientCalculatedService {
  private apolloClientchacao: ApolloClient<any>;
  private apolloClientManeiro: ApolloClient<any>;
  private apolloClientCaroni: ApolloClient<any>;
  private apolloClientHatillo: ApolloClient<any>;
  private apolloClientBaruta: ApolloClient<any>;
  private apolloClientSDiego: ApolloClient<any>;
  private apolloClientTigre: ApolloClient<any>;
  private apolloClientInvBaruta: ApolloClient<any>;
  private apolloClientSecundario: ApolloClient<any>;
  private apolloClientOV: ApolloClient<any>;

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

    try {
      this.apolloClientSecundario = new ApolloClient({
        uri: 'http://company-rates-api-contenedor:4008/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }

    try {
      this.apolloClientOV = new ApolloClient({
        uri: 'http://contenedor_ov_api:4010/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }
  }

  async getProformascalculatedChacao(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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
    
    const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'Chacao';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    console.log(especial, aplica_islr, aplica_iae, aplica_tf);
    
    const clientsResult = await this.apolloClientchacao.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      }
    });
  
    const { data: clientsData } = clientsResult;
    const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];

    const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"CHACAO"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];
    
    
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
  
    return resultados;
  }
  
  async getProformascalculatedManeiro(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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
  
    const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'Maneiro';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    //console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    //console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    //console.log(especial, aplica_islr, aplica_iae, aplica_tf);
    

    const clientsResult = await this.apolloClientManeiro.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      }
    });
  
    const { data: clientsData } = clientsResult;
    const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];

    const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"MANEIRO2"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];
  
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        //console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
    return resultados;
  }

  async getProformascalculatedCaroni(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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

    const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'Caroni';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    //console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    //console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    //console.log(especial, aplica_islr, aplica_iae, aplica_tf);

    // Obtener clientes
    const clientsResult = await this.apolloClientCaroni.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      }
    });
  //console.log(clientsResult)
    const { data: clientsData } = clientsResult;
    const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];

    const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    //console.log(proformasarray)
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"CARONI"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];
    //console.log(proformasarrayOV);
    //console.log(proformasarray)
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          ////console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
    return resultados;
  }

  async getProformascalculatedHatillo(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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
  
    const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'Hatillo';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    //console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    //console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    //console.log(especial, aplica_islr, aplica_iae, aplica_tf);
    
    const clientsResult = await this.apolloClientHatillo.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      }
    });
  
    const { data: clientsData } = clientsResult;
    const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];

    const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"HATILLO"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];
  
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
  
        const datearmonizacion = new Date('2024-03-01');
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        //console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
    return resultados;
  }

  async getProformascalculatedBaruta(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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
  
    
    const rif= CUSTNMBR+'T';
    const clientsResult = await this.apolloClientBaruta.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: rif,
        page: PAGE,
      }
    });

    if (!clientsResult || clientsResult.data === null) {
      const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'ManeiroB';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    //console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    //console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    //console.log(especial, aplica_islr, aplica_iae, aplica_tf);


      const clientsResult = await this.apolloClientBaruta.query({
        query: GET_CLIENTS,
        variables: {
          custnmbr: CUSTNMBR,
          page: PAGE,
        }
      });
    
      const { data: clientsData } = clientsResult;
      const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];
  
      const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"MANEIRO"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];

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
    
          const datearmonizacion = new Date('2024-03-01');
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        //console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          //console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
    return resultados;
    } else{
      const rif= CUSTNMBR+'T';

      const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'ElTigreB';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    //console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    //console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    //console.log(especial, aplica_islr, aplica_iae, aplica_tf);

      try {
        const clientOV = await this.apolloClientOV.query({
          query: GET_USERS,
          variables: {
            usuario: CUSTNMBR,
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      const { data: clientsData } = clientsResult;
      const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];
      
      const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"TIGRE"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];

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
    
          const datearmonizacion = new Date('2024-03-01');
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        //console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          //console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
      return resultados;
    }
  }

  async getProformascalculatedSanDiego(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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
    
    const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'SanDiego';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    //console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    //console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    //console.log(especial, aplica_islr, aplica_iae, aplica_tf);
    
    const clientsResult = await this.apolloClientSDiego.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      }
    });
  
    const { data: clientsData } = clientsResult;
    const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];
    
    const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"SAN_DIEGO"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];

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
  
        const datearmonizacion = new Date('2024-03-01');
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        //console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          //console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
    return resultados;
  }

  async getProformascalculatedElTigre(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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
    const clientsResult = await this.apolloClientTigre.query({
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
  
        const datearmonizacion = new Date('2024-03-01');
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
          fecha_creacion:fechaFormateada,
          comentario:comentario,
          basereal: basebs,
          fechasEmisionOriginal:fechasEmisionOriginal,
          montobase: montobase,
          montocalculado: montocalculado
        });
      }
    }
  
    return resultados;
  }

  async getProformascalculatedInvBaruta(CUSTNMBR, PAGE) {
    let montocalculado = 0;
    let tasabasenow;
    let fecha_emision_formato;
    let fecha_emision_original;
    let vigencia;
    let fechaFormateada;
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
  
    const fs = require('fs');
    const data = fs.readFileSync('./impuestos_empresas.json');
    const impuestos = JSON.parse(data);
    const municipioCliente = 'InvBaruta';

    const obtenerInfoimpuesto = (municipioCliente) => {
      const result = { aplicaEspecial: null, aplicaIslr: null, aplicaIae: null, aplicaTf: null };
    
      const impuestosCliente = impuestos.find(impuesto => impuesto.municipio === municipioCliente);
    
      if (impuestosCliente) {
        let impuestoIaeMasReciente = null;
        impuestosCliente.impuestos.forEach(impuesto => {
          
          switch (impuesto.nombre) {
            case 'porcentaje_iva':
              result.aplicaEspecial = impuesto.porcentaje;
              break;
            case 'porcentaje_islr':
                result.aplicaIslr = impuesto.porcentaje;
              break;
            case 'porcentaje_iae':
              const fechaC = new Date(impuesto.fechaC);
              if (!impuestoIaeMasReciente || fechaC > new Date(impuestoIaeMasReciente.fechaC)) {
                impuestoIaeMasReciente = impuesto;
              }
              if (impuestoIaeMasReciente) {
                result.aplicaIae = impuestoIaeMasReciente.porcentaje;
              }
              break;
            case 'porcentaje_tf':
              result.aplicaTf = impuesto.porcentaje;
              break;
          }
        });
      }
    
      return result;
    };
    
    const { aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf } = obtenerInfoimpuesto(municipioCliente);
    //console.log(aplicaEspecial, aplicaIslr, aplicaIae, aplicaTf )

    const clientOV = await this.apolloClientOV.query({
      query: GET_USERS,
      variables: {
        usuario: CUSTNMBR,
      }
    });

    const { data: clientOVData } = clientOV;
    const clientesOV = clientOVData.findUSER || [];
    //console.log(clientesOV)
    const obtenerinfocliente = () => {
      const result = {especial: null, aplica_islr: null, aplica_iae: null, aplica_tf: null};
      //console.log(clientesOV.especial)
        switch (clientesOV.especial) {
          case 1:
            result.especial = clientesOV.especial;
            break;
          default:
            result.especial = 0;
            break;
        }
        switch (clientesOV.aplica_islr) {
          case 1:
            result.aplica_islr = clientesOV.aplica_islr;
            break;
          default:
            result.aplica_islr = 0;
            break;
        }
        switch (clientesOV.aplica_iae) {
          case 1:
            result.aplica_iae = clientesOV.aplica_iae;
            break;
          default:
            result.aplica_iae = 0;
            break;
        }
        switch (clientesOV.aplica_tf) {
          case 1:
            result.aplica_tf =  clientesOV.aplica_tf;
            break;
          default:
            result.aplica_tf = 0;
            break;
        }
      
      return result;
    };
  
    const {especial, aplica_islr, aplica_iae, aplica_tf} = obtenerinfocliente();

    //console.log(especial, aplica_islr, aplica_iae, aplica_tf);
    
    const clientsResult = await this.apolloClientInvBaruta.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: CUSTNMBR,
        page: PAGE,
      }
    });
  
    const { data: clientsData } = clientsResult;
    const clientesConNombreCompletos = clientsData.clientProformasByRIF.proformas || [];
    
    const proformasarray=[];
    for (const proforma of clientesConNombreCompletos) {
      const sopnumbe = proforma.SOPNUMBE.trim();
      proformasarray.push(sopnumbe);
    }
    
    const proformasOV = await this.apolloClientOV.query({
      query: GET_ARRAYPROFORMAS,
      variables: {
        sopnumbe: proformasarray,
        empresa:"BARUTA"
      }
    });

    const { data: proformasData } = proformasOV;
    const proformasarrayOV = proformasData.findCount || [];

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
              break; 
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
  
        const datearmonizacion = new Date('2024-03-01');
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
        const basebs = parseFloat(cliente.SUBTOTAL.toFixed(2));
        const base_imponible = parseFloat(basebs.toFixed(2));
        const divi = base_imponible / tasabasearmon;
        const montobase = divi * tasabasenow;
        const montoporcentual = (montobase * porcimpuesto) / 100;
        const montocalculado = montobase + montoporcentual;
        const base_imponible_rebaja=
          (
            montobase*(aplica_islr === 1 ? aplicaIslr : 0)
          )
          +(
            montobase*(aplica_iae === 1 ? aplicaIae : 0)
          ) 
          +(
            montobase*(aplica_tf === 1 ? aplicaTf : 0)
          );
        const impuesto_rebaja = porcimpuesto *(especial ? aplicaEspecial : 0);
        const impuesto= (montobase*impuesto_rebaja)/100;
        const total_monto_retencion= parseFloat((base_imponible_rebaja + impuesto).toFixed(2))
        //console.log(base_imponible_rebaja)
        const probable= especial === 1 ? montocalculado-total_monto_retencion : 0;
        const proformasarrayval= [];
        proformasarrayOV.forEach(proformaarray => {
          const client2=proformaarray.numero_documento;
          if(proformaarray.numero_documento === client){
            proformasarrayval.push({
              client2:client2,
              valida:1
            })
          }
        })
        let flag1=0;
        proformasarrayval.forEach(proformaarray => {
          if(proformaarray.client2 === client && proformaarray.valida===1){
            const montoporcentualbase = (basebs * porcimpuesto) / 100;
            const montocalculadobase = montoporcentualbase + basebs;
            const base_imponible_rebaja_base=
            (
              base_imponible*(aplica_islr === 1 ? aplicaIslr : 0)
            )
            +(
              base_imponible*(aplica_iae === 1 ? aplicaIae : 0)
            ) 
            +(
              base_imponible*(aplica_tf === 1 ? aplicaTf : 0)
            );
          const impuesto_rebaja_base = porcimpuesto *(especial ? aplicaEspecial : 0);
          const impuesto_base= (base_imponible*impuesto_rebaja_base)/100;
          const total_monto_retencion_base= parseFloat((base_imponible_rebaja_base + impuesto_base).toFixed(2))
          //console.log(base_imponible_rebaja_base)
          const probable_base= especial === 1 ? montocalculadobase-total_monto_retencion_base : 0;
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montocalculadobase: parseFloat(montocalculadobase.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion_base.toFixed(2)),
                probable:parseFloat(probable_base.toFixed(2))
              });
              flag1=1;
          }
        });
        if(flag1===0){
              resultados.push({
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
                fecha_creacion:fechaFormateada,
                comentario:comentario,
                basereal: parseFloat(basebs.toFixed(2)),
                fechasEmisionOriginal:fechasEmisionOriginal,
                montobase:parseFloat(montobase.toFixed(2)),
                montocalculado: parseFloat(montocalculado.toFixed(2)),
                total_monto_retencion:parseFloat(total_monto_retencion.toFixed(2)),
                probable:parseFloat(probable.toFixed(2))
              });
        }
      }
    }
  
    return resultados;
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
