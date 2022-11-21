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
  Habitante,
  Facturacion,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitanteFacturacionController {
  constructor(
    @repository(HabitanteRepository) protected habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Array of Habitante has many Facturacion',
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
    return this.habitanteRepository.facturacions(id).find(filter);
  }

  @post('/habitantes/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Habitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Facturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Habitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {
            title: 'NewFacturacionInHabitante',
            exclude: ['id'],
            optional: ['habitanteId']
          }),
        },
      },
    }) facturacion: Omit<Facturacion, 'id'>,
  ): Promise<Facturacion> {
    return this.habitanteRepository.facturacions(id).create(facturacion);
  }

  @patch('/habitantes/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Habitante.Facturacion PATCH success count',
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
    return this.habitanteRepository.facturacions(id).patch(facturacion, where);
  }

  @del('/habitantes/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Habitante.Facturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.habitanteRepository.facturacions(id).delete(where);
  }
}
