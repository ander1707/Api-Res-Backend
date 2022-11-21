import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Propietario,
  Administrador,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioAdministradorController {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Propietario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Propietario.prototype.id,
  ): Promise<Administrador> {
    return this.propietarioRepository.administrador(id);
  }
}
