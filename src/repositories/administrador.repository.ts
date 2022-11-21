import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Inmueble, Facturacion, Propietario} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {FacturacionRepository} from './facturacion.repository';
import {PropietarioRepository} from './propietario.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Administrador.prototype.id>;

  public readonly facturacions: HasManyRepositoryFactory<Facturacion, typeof Administrador.prototype.id>;

  public readonly propietarios: HasManyRepositoryFactory<Propietario, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('FacturacionRepository') protected facturacionRepositoryGetter: Getter<FacturacionRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Administrador, dataSource);
    this.propietarios = this.createHasManyRepositoryFactoryFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
    this.facturacions = this.createHasManyRepositoryFactoryFor('facturacions', facturacionRepositoryGetter,);
    this.registerInclusionResolver('facturacions', this.facturacions.inclusionResolver);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
