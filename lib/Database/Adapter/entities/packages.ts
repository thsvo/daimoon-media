import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ValueTransformer
} from "typeorm"

import type {Relation} from "typeorm";

import { UserEntity } from './users'
import { ResellerEntity } from './resellers'

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

@Entity({ name: "packages" })
export class PackageEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  // @ManyToOne(() => UserEntity, (user) => user.id)
  // userId!: Relation<UserEntity>

  // @ManyToOne(() => ResellerEntity, (reseller) => reseller.id)
  // resellerId!: Relation<ResellerEntity>

  @Column({ type: "varchar", nullable: true })
  resellerId!: string | null

  @Column({ type: "varchar", nullable: true })
  name!: string | null

  @Column({ type: "integer", nullable: true })
  costInEuro!: string | null

  @Column({ type: "integer", nullable: true })
  streams!: string | null

  @Column({ type: "integer", nullable: true })
  followers!: string | null

  @Column({ type: "boolean", nullable: true, default: 0 })
  custom!: string | null
}