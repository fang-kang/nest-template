/* eslint-disable prettier/prettier */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    comment: '主键id'
  })
  id: number;

  @CreateDateColumn({
    comment:'创建时间'
  })
  created_time: Date;

  @UpdateDateColumn({
    comment:'修改时间'
  })
  updated_time: Date;
}
