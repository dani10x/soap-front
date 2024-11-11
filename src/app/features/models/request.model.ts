import * as convert from 'xml-js';

export const CONSULTAR_PARQUEADEROS: string = convert.js2xml({
  _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
  'soapenv:Envelope': {
    _attributes: {
      'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:gs': 'http://pdyp.com/soap_service'
    },
    'soapenv:Header': {},
    'soapenv:Body': {
      'gs:getAllParqueaderosRequest': {}
    }
  }
}, {compact: true});
