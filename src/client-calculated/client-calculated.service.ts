
import { Injectable } from '@nestjs/common';
import { CreateClientCalculatedDto } from './dto/create-client-calculated.dto';
import { UpdateClientCalculatedDto } from './dto/update-client-calculated.dto';
import { GET_CLIENTS } from "graphql/clients/queries";
import { GET_RATES } from "graphql/rates/queries";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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
      this.apolloClientSecundario = new ApolloClient({
        uri: 'http://localhost:4008/graphql',
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
  }
  
  async getProformascalculatedManeiro(CUSTNMBR, PAGE) {
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
    const clientsResult = await this.apolloClientManeiro.query({
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
  
        resultados.push({
          comentario:comentario,
          sopnumbe: client,
          basereal: basebs,
          fechasEmisionOriginal:fechasEmisionOriginal,
          montobase: montobase,
        });
      }
    }
  
    return resultados;
  }

  async getProformascalculatedCaroni(CUSTNMBR, PAGE) {
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
    const clientsResult = await this.apolloClientCaroni.query({
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
  }

  async getProformascalculatedHatillo(CUSTNMBR, PAGE) {
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
    const clientsResult = await this.apolloClientHatillo.query({
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
  }

  async getProformascalculatedBaruta(CUSTNMBR, PAGE) {
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
    const rif= CUSTNMBR+'T';
    const clientsResult = await this.apolloClientBaruta.query({
      query: GET_CLIENTS,
      variables: {
        custnmbr: rif,
        page: PAGE,
      }
    });

    if (!clientsResult || clientsResult.data === null) {
      const clientsResult = await this.apolloClientBaruta.query({
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
    
          resultados.push({
            comentario:comentario,
            sopnumbe: client,
            basereal: basebs,
            fechasEmisionOriginal:fechasEmisionOriginal,
            montobase: montobase
          });
        }
      }
    return resultados;
    } else{
      const rif= CUSTNMBR+'T';
      const clientsResult = await this.apolloClientBaruta.query({
        query: GET_CLIENTS,
        variables: {
          custnmbr: rif,
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
    }
  }

  async getProformascalculatedSanDiego(CUSTNMBR, PAGE) {
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
    const clientsResult = await this.apolloClientSDiego.query({
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
  }

  async getProformascalculatedElTigre(CUSTNMBR, PAGE) {
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
  }

  async getProformascalculatedInvBaruta(CUSTNMBR, PAGE) {
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
    
    const clientsResult = await this.apolloClientInvBaruta.query({
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
  }

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
