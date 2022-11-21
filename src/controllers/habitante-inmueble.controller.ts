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
  Inmueble,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitanteInmuebleController {
  constructor(
    @repository(HabitanteRepository) protected habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Habitante has one Inmueble',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inmueble),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble> {
    return this.habitanteRepository.inmueble(id).get(filter);
  }

  @post('/habitantes/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Habitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Habitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInHabitante',
            exclude: ['id'],
            optional: ['habitanteId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.habitanteRepository.inmueble(id).create(inmueble);
  }

  @patch('/habitantes/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Habitante.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.habitanteRepository.inmueble(id).patch(inmueble, where);
  }

  @del('/habitantes/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Habitante.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.habitanteRepository.inmueble(id).delete(where);
  }
}
