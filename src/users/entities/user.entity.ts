import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Photo } from "./photo.entity";

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToOne(() => Profile, {cascade : true, eager: true})
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Photo, (photo) => photo.user,
    {cascade: true, eager: true})
    photos: Photo

}


