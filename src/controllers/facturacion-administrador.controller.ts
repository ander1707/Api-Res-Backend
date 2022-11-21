import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Facturacion,
  Administrador,
} from '../models';
import {FacturacionRepository} from '../repositories';

export class FacturacionAdministradorController {
  constructor(
    @repository(FacturacionRepository)
    public facturacionRepository: FacturacionRepository,
  ) { }

  @get('/facturacions/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Facturacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Facturacion.prototype.id,
  ): Promise<Administrador> {
    return this.facturacionRepository.administrador(id);
  }
}
