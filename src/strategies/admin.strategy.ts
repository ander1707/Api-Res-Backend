import { AuthenticationStrategy } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {HttpErrors,Request} from '@loopback/rest';
import { AutenticacionService } from '../services';
import { service } from '@loopback/core';


export class EstrategiaAdministrador implements AuthenticationStrategy{

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    name: string = 'admin';

constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
) {}

  async authenticate(request: Request): Promise<UserProfile | undefined>  {
    let token = parseBearerToken(request);
    if (token){
      let datos = this.servicioAutenticacion.ValidarToken(token);
        if (datos){
          let perfil:UserProfile = Object.assign({
            nombre: datos.data.nombre
          });
          return perfil;

    }else{
      throw new HttpErrors[401]("el Token incluido no es valido")
    }
    }else{
      throw new HttpErrors[401]("No se ha incluido un token en la solicitud")
    }
  }
}
