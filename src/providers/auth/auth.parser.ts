import { Injectable } from '@angular/core';
import { LoginServiceModel } from './auth.model';

@Injectable()
export class AuthServiceParser {

  constructor() { }


  public parserAdmin(formAuth: LoginServiceModel) {
    const bodyAdminParser: LoginServiceModel  = {
      email: formAuth.email,
      password: formAuth.password
    };

    return bodyAdminParser;
  }

  // parseRegisterFormToBody(form: any, cert: boolean): RegisterServiceModel {
  //   const result = <RegisterServiceModel>{};

  //   result.cif = form.cif.toUpperCase();
  //   result.businessName = form.businessName;
  //   result.cert = cert;
  //   // result.type_id = form.docType;
  //   result.nif = form.document.toUpperCase();
  //   // result.email = form.email;
  //   result.personal_email = form.personalEmail;
  //   result.name = form.name;
  //   result.surname1 = form.surname1;
  //   result.surname2 = form.surname2;
  //   result.phone1 = form.phone;

  //   return result;
  // }


  // parseRegisterVerificationBody(code: string, register: RegisterServiceModel): RegisterVerificationServiceModel {
  //   const result = <RegisterVerificationServiceModel>{};

  //   result.nif = register.nif.toUpperCase();
  //   result.cif = register.cif.toUpperCase();
  //   result.code = code;
  //   result.phone1 = register.phone1;

  //   return result;
  // }


  // parseOnetrustRegisterPurposesBody(onetrustData: any, id: string, metadata: any, isAuthorized?: boolean): OnetrustRegisterPurposeServiceModel {
  //   const body = <OnetrustRegisterPurposeServiceModel>{};

  //   body['dsDataElements'] = isAuthorized ? this.parseOnetrustMetadataFromService(metadata) : this.parseOnetrustMetadataFromForm(metadata);
  //   body.env = URLS.env;
  //   body.identifier = id;
  //   body.purposes = onetrustData.purposes.filter(p => p.status === true);
  //   body.test = onetrustData.test;
  //   body.requestInformation = onetrustData.requestInformation;

  //   return body;
  // }



  // private parseOnetrustMetadataFromForm(value: any) {
  //   const obj: any = {};

  //   obj['NOMBRE'] = value.name;
  //   obj['PRIMER APELLIDO'] = value.surname1;
  //   obj['SEGUNDO APELLIDO'] = value.surname2 ? value.surname2 : '';
  //   obj['NIF'] = value.nif;
  //   obj['CIF'] = value.cif;
  //   obj['CORREO ELECTRONICO EMPRESA'] = value.enterpriseEmail;
  //   obj['CORREO ELECTRONICO REPRESENTANTE'] = value.personalEmail;
  //   obj['TELEFONO MOVIL'] = value.mobile;
  //   obj['RAZON SOCIAL'] = value.reason;

  //   return obj;
  // }


  // private parseOnetrustMetadataFromService(value: any) {
  //   const obj: any = {};

  //   obj['NOMBRE'] = value.name;
  //   obj['PRIMER APELLIDO'] = value.surname1;
  //   obj['SEGUNDO APELLIDO'] = value.surname2 ? value.surname2 : '';
  //   obj['NIF'] = value.nif;
  //   obj['CIF'] = value.cif;
  //   obj['CORREO ELECTRONICO EMPRESA'] = value.enterpriseEmail;
  //   obj['CORREO ELECTRONICO REPRESENTANTE'] = value.personalEmail;
  //   obj['TELEFONO MOVIL'] = value.mobile;
  //   obj['RAZON SOCIAL'] = value.reason;

  //   return obj;
  // }

}
