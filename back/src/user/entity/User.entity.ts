import { ApplicationEntity } from 'src/application/entity/ApplicationEntity';
import { Organization } from 'src/organization/entity/Organization.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class User extends ApplicationEntity {
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @ManyToOne(() => Organization)
  @JoinTable()
  organization: Organization;
}
