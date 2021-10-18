import {BaseEntity} from '@valor-launchpad/common-api';

export class RefreshToken extends BaseEntity {
    id: string;
    hash: string;
    username: string;
    expire: string;
}