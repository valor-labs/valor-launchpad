import {BaseEntity} from '@valor-launchpad/common-api';
/*
 @hash: Хэш bcrypt-а, составленный из acces+refresh токенов
 @username: payload для jwt токена  
*/
export class RefreshToken extends BaseEntity {
    id: string;
    hash: string;
    username: string;
    expire: string;
}