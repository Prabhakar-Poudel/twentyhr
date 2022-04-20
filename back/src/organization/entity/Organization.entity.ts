import { ApplicationEntity } from 'src/application/entity/ApplicationEntity';
import { User } from 'src/user/entity/User.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Organization extends ApplicationEntity {
  @Column()
  name: string;

  @OneToOne(() => User)
  @JoinColumn()
  accountManager: User;
}
