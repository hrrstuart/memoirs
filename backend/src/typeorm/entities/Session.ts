import { ISession } from "connect-typeorm/out";
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({ name: 'session' })
export class SessionEntity implements ISession {

    @PrimaryColumn('varchar', { length: 255 })
    id = '';

    @Index()
    @Column("bigint")
    expiredAt = Date.now();

    @DeleteDateColumn()
    destroyedAt?: Date;

    @Column('text')
    json = '';

}