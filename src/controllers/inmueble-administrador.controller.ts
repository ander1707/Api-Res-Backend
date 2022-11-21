import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Administrador,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleAdministradorController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Administrador> {
    return this.inmuebleRepository.administrador(id);
  }
}
