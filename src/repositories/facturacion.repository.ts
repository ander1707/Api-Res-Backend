import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Facturacion, FacturacionRelations, Inmueble, Habitante, Administrador} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {HabitanteRepository} from './habitante.repository';
import {AdministradorRepository} from './administrador.repository';

export class FacturacionRepository extends DefaultCrudRepository<
  Facturacion,
  typeof Facturacion.prototype.id,
  FacturacionRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Facturacion.prototype.id>;

  public readonly habitante: BelongsToAccessor<Habitante, typeof Facturacion.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Facturacion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('HabitanteRepository') protected habitanteRepositoryGetter: Getter<HabitanteRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Facturacion, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.habitante = this.createBelongsToAccessorFor('habitante', habitanteRepositoryGetter,);
    this.registerInclusionResolver('habitante', this.habitante.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
