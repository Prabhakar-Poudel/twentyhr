import { ApplicationEntity } from 'src/application/entity/ApplicationEntity';
import { Organization } from 'src/organization/entity/Organization.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class User extends ApplicationEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => Organization)
  @JoinTable()
  organization: Organization;
}
