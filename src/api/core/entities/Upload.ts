import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * @class Upload
 */
@Entity({ name: 'uploads' })
class Upload {
  public constructor() {}

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  version: number;

  @Column()
  public_id: string;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  secure_url: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  bytes: number;

  @Column()
  resource_type: string;

  @Column({ length: 32 })
  type: string;

  @Column({ length: 32 })
  format: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Upload };
