import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ValueTransformer,
  JoinColumn
} from "typeorm"

import type {Relation} from "typeorm";

import { UserEntity } from './users'

const transformer: Record<"date" | "bigint", ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
}

@Entity({ name: "resellers" })
export class ResellerEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar", nullable: false, unique: true })
  userId!: string | null

  // @OneToOne(() => UserEntity)
  // @JoinColumn()
  // userId: UserEntity
}