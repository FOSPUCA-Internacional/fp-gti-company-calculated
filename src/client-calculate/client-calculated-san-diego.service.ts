import { Injectable } from '@nestjs/common';
import { GET_RATES } from "graphql/rates/queries";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

@Injectable()
export class ClientCalculatedSanDiegoService {
  private apolloClientSecundario: ApolloClient<any>;

  constructor() {
    try {
      this.apolloClientSecundario = new ApolloClient({
        uri: 'http://10.161.22.73:4011/graphql',
        cache: new InMemoryCache(),
      });
      console.log('Apollo Client initialized successfully.');
    } catch (error) {
      console.error("Error initializing Apollo Client:", error);
    }
  }

  async getProformasdataSanDiego(payload: any) {
    const { tasasDecambio1, clientesOV, proformasarrayOV, clientesConNombreCompletos } = payload;
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
  
      let especial: number;
      let aplica_islr: number;
      let aplica_iae: number;
      let aplica_tf: number;
  
      const obtenerinfocliente = () => {
        if (clientesOV === 0) {
          return { especial: 0, aplica_islr: 0, aplica_iae: 0, aplica_tf: 0 };
        } else {
          return {
            especial: clientesOV?.especial === 1 ? clientesOV.especial : 0,
            aplica_islr: clientesOV?.aplica_islr === 1 ? clientesOV.aplica_islr : 0,
            aplica_iae: clientesOV?.aplica_iae === 1 ? clientesOV.aplica_iae : 0,
            aplica_tf: clientesOV?.aplica_tf === 1 ? clientesOV.aplica_tf : 0,
          };
        }
      };
  
      ({ especial, aplica_islr, aplica_iae, aplica_tf } = obtenerinfocliente());
  
      //console.log(especial, aplica_islr, aplica_iae, aplica_tf);
  
      const resultados = [];
      if (!clientesConNombreCompletos || !Array.isArray(clientesConNombreCompletos) || clientesConNombreCompletos.length === 0) {
        resultados.push('El cliente no existe en GP')
      }else{
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
          if (cliente.work_history[0]?.USRDEF03?.trim() !== '' && cliente.work_history[0]?.USRDEF03?.trim() != undefined) {
              
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
                tasabasenow = usdnow;
              } else if (USD < EUR) {
                tasabasearmon = EUR;
                tasabasenow = eurnow;
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
            const UNITPRCE= cliente.detail[0]?.UNITPRCE;
            const tarifa=UNITPRCE/tasabasearmon;
            const tarifaval=parseFloat(tarifa.toFixed(5));
            let finalTarifa;
            const decimales = tarifaval.toString().split(".")[1]?.length || 0;
            if (decimales >= 5) {
              finalTarifa = (Math.floor(tarifa * 10000) / 10000).toFixed(4);
            } else {
              finalTarifa = tarifa.toFixed(4);
            }
            const tarifaConRelleno = finalTarifa.padEnd(finalTarifa.length + 1, '0')
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
                    basereal: Math.round(basebs* 100) / 100,
                    fechasEmisionOriginal:fechasEmisionOriginal,
                    montocalculadobase: Math.round(montocalculadobase* 100) / 100,
                    total_monto_retencion:Math.round(total_monto_retencion_base* 100) / 100,
                    probable:Math.round(probable_base* 100) / 100,
                    tarifa:tarifaConRelleno
    
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
                    basereal: Math.round(basebs* 100) / 100,
                    fechasEmisionOriginal:fechasEmisionOriginal,
                    montobase:Math.round(montobase* 100) / 100,
                    montocalculado: Math.round(montocalculado* 100) / 100,
                    total_monto_retencion:Math.round(total_monto_retencion* 100) / 100,
                    probable:Math.round(probable* 100) / 100,
                    tarifa:tarifaConRelleno
    
                  });
            }
          }
        }
      }
      return resultados;
    }
}
