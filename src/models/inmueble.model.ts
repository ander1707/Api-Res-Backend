import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Administrador} from './administrador.model';
import {Facturacion} from './facturacion.model';
import {Torre} from './torre.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoinmueble: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'number',
    required: true,
  })
  vralquiler: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @property({
    type: 'string',
  })
  habitanteId?: string;

  @hasMany(() => Facturacion)
  facturacions: Facturacion[];

  @belongsTo(() => Torre)
  torreId: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
