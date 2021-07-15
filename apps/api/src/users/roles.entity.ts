import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class RolesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  role: string;
}
