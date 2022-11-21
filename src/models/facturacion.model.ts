import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Habitante} from './habitante.model';
import {Administrador} from './administrador.model';

@model()
export class Facturacion extends Entity {
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
  nfactura: string;

  @property({
    type: 'number',
    required: true,
  })
  totalapagar: number;

  @property({
    type: 'number',
    required: true,
  })
  saldopendiente: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Inmueble)
  inmuebleId: string;

  @belongsTo(() => Habitante)
  habitanteId: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<Facturacion>) {
    super(data);
  }
}

export interface FacturacionRelations {
  // describe navigational properties here
}

export type FacturacionWithRelations = Facturacion & FacturacionRelations;
