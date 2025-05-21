import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
  })
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  firstName: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  lastName: string;

  @Column({
    type: "int",
    unsigned: true,
  })
  age: number;

  @Column({ nullable: true, type: "varchar" })
  address: string;

  @Column({ nullable: true, type: "varchar" })
  job: string;

  @Column({ nullable: true, type: "varchar" })
  email: string;
}
