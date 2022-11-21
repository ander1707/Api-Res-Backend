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
  Administrador,
  Facturacion,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorFacturacionController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Facturacion',
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
    return this.administradorRepository.facturacions(id).find(filter);
  }

  @post('/administradors/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Facturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {
            title: 'NewFacturacionInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) facturacion: Omit<Facturacion, 'id'>,
  ): Promise<Facturacion> {
    return this.administradorRepository.facturacions(id).create(facturacion);
  }

  @patch('/administradors/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Administrador.Facturacion PATCH success count',
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
    return this.administradorRepository.facturacions(id).patch(facturacion, where);
  }

  @del('/administradors/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Administrador.Facturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.administradorRepository.facturacions(id).delete(where);
  }
}
