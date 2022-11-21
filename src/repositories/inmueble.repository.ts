import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Propietario, Administrador, Facturacion, Torre} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {AdministradorRepository} from './administrador.repository';
import {FacturacionRepository} from './facturacion.repository';
import {TorreRepository} from './torre.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Inmueble.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Inmueble.prototype.id>;

  public readonly facturacions: HasManyRepositoryFactory<Facturacion, typeof Inmueble.prototype.id>;

  public readonly torre: BelongsToAccessor<Torre, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('FacturacionRepository') protected facturacionRepositoryGetter: Getter<FacturacionRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>,
  ) {
    super(Inmueble, dataSource);
    this.torre = this.createBelongsToAccessorFor('torre', torreRepositoryGetter,);
    this.registerInclusionResolver('torre', this.torre.inclusionResolver);
    this.facturacions = this.createHasManyRepositoryFactoryFor('facturacions', facturacionRepositoryGetter,);
    this.registerInclusionResolver('facturacions', this.facturacions.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
