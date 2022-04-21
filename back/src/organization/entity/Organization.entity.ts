import { ApplicationEntity } from 'src/application/entity/ApplicationEntity';
import { User } from 'src/user/entity/User.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Organization extends ApplicationEntity {
  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn()
  accountManager: User;
}
