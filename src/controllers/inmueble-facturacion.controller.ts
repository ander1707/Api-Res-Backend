import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Inmueble,
  Facturacion,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleFacturacionController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many Facturacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Facturacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Facturacion>,
  ): Promise<Facturacion[]> {
    return this.inmuebleRepository.facturacions(id).find(filter);
  }

  @post('/inmuebles/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Facturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {
            title: 'NewFacturacionInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) facturacion: Omit<Facturacion, 'id'>,
  ): Promise<Facturacion> {
    return this.inmuebleRepository.facturacions(id).create(facturacion);
  }

  @patch('/inmuebles/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Inmueble.Facturacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {partial: true}),
        },
      },
    })
    facturacion: Partial<Facturacion>,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.inmuebleRepository.facturacions(id).patch(facturacion, where);
  }

  @del('/inmuebles/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Inmueble.Facturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.inmuebleRepository.facturacions(id).delete(where);
  }
}
