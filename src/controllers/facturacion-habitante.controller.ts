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
  Habitante,
} from '../models';
import {FacturacionRepository} from '../repositories';

export class FacturacionHabitanteController {
  constructor(
    @repository(FacturacionRepository)
    public facturacionRepository: FacturacionRepository,
  ) { }

  @get('/facturacions/{id}/habitante', {
    responses: {
      '200': {
        description: 'Habitante belonging to Facturacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitante)},
          },
        },
      },
    },
  })
  async getHabitante(
    @param.path.string('id') id: typeof Facturacion.prototype.id,
  ): Promise<Habitante> {
    return this.facturacionRepository.habitante(id);
  }
}
