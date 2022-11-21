/* eslint-disable @typescript-eslint/naming-convention */
import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Administrador} from '../models/administrador.model';
import {AdministradorRepository} from '../repositories/administrador.repository';
const generador=require("password-generator");
const cryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository (AdministradorRepository)
    public administrarRepository: AdministradorRepository
  ) {}


  GenerarClave() {
    const clave=generador(8,false);
    return clave;
  }

  CifrarClave(clave:string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();

    return claveCifrada;
  }
  IdentificarPersona(usuario:string, clave:string){
  try{
  const a= this.administrarRepository.findOne({where:{Email:usuario,clave:clave}});
    if (a){
      return a;
    } return false;
  } catch{
      return false;
  }

  }
  GenerarToken(administrador:Administrador){
    const token=jwt.sign({
      data:{
        id:administrador.id,
        correo:administrador.Email,
        nombre:administrador.nombre + " "+ administrador.apellido
      }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarToken(token:string){
    try{
      const datos = jwt.verify(token,Llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
