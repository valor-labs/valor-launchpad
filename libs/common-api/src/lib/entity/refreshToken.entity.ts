import {BaseEntity} from './base.entity';

export class RefreshToken extends BaseEntity {
    id: string;
    hash: string;
    username: string;
    expire: string;
}
