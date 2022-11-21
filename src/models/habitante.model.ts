import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Facturacion} from './facturacion.model';

@model()
export class Habitante extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @hasOne(() => Inmueble)
  inmueble: Inmueble;

  @hasMany(() => Facturacion)
  facturacions: Facturacion[];

  constructor(data?: Partial<Habitante>) {
    super(data);
  }
}

export interface HabitanteRelations {
  // describe navigational properties here
}

export type HabitanteWithRelations = Habitante & HabitanteRelations;
