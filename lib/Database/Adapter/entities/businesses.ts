import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ValueTransformer,
} from "typeorm"

const transformer: Record<"date" | "bigint", ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
};

@Entity({ name: "businesses" })
export class BusinessEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar", nullable: true })
  name!: string | null

  @Column({ type: "varchar", nullable: true })
  vatNumber!: string | null

  @Column({ type: "varchar", nullable: true })
  ChamberOfCommerce!: string | null

  @Column({ type: "varchar", nullable: true })
  address!: string | null

  @Column({ type: "varchar", nullable: true })
  address2!: string | null

  @Column({ type: "varchar", nullable: true })
  region!: string | null

  @Column({ type: "varchar", nullable: true })
  postalCode!: string | null

  @Column({ type: "varchar", nullable: true })
  city!: string | null

  @Column({ type: "varchar", nullable: true })
  country!: string | null
}