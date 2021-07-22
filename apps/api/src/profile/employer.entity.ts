import {BaseEntity} from '@valor-launchpad/common-api';
import {ProfileEmployerEntity} from './profileEmployer.entity';

export class EmployerEntity extends BaseEntity {
  name: string;
  url: string;
  avatar: string;
  profiles?: ProfileEmployerEntity[]
}
