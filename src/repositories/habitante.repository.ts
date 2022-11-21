import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Habitante, HabitanteRelations, Inmueble, Facturacion} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {FacturacionRepository} from './facturacion.repository';

export class HabitanteRepository extends DefaultCrudRepository<
  Habitante,
  typeof Habitante.prototype.id,
  HabitanteRelations
> {

  public readonly inmueble: HasOneRepositoryFactory<Inmueble, typeof Habitante.prototype.id>;

  public readonly facturacions: HasManyRepositoryFactory<Facturacion, typeof Habitante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('FacturacionRepository') protected facturacionRepositoryGetter: Getter<FacturacionRepository>,
  ) {
    super(Habitante, dataSource);
    this.facturacions = this.createHasManyRepositoryFactoryFor('facturacions', facturacionRepositoryGetter,);
    this.registerInclusionResolver('facturacions', this.facturacions.inclusionResolver);
    this.inmueble = this.createHasOneRepositoryFactoryFor('inmueble', inmuebleRepositoryGetter);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
