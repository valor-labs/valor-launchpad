import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";

@Entity()
export class UserEntity {
  constructor(userEntity) {
    Object.assign(this, userEntity)
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
