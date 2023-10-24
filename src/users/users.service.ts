import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { Photo } from './entities/photo.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}


    // async create(createUserDto: CreateUserDto) {
    //   const profile = this.profileRepository.create(createUserDto.profile);

    //   const user = this.userRepository.create({
    //     ...createUserDto,
    //     profile: profile,
    //   });
    
    //   const newUser = await this.userRepository.save(user);
    
    //   return newUser;
    // }

    async create(createUserDto: CreateUserDto) {
      console.log(createUserDto.photo);
      const user = this.userRepository.create(createUserDto);
      const newUser = await this.userRepository.save(user);

      const photo = this.photoRepository.create({
        ...createUserDto.photo,

        user: user,
      });
    
       await this.photoRepository.save(photo);
    
      return newUser;
    }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id})

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const entity = await this.userRepository.findOneBy({id})
    this.userRepository.merge(entity,updateUserDto)
    const updateduser = await this.userRepository.save(entity)
    return updateduser;
  }

  async remove(id: number) {
    const entity = await this.userRepository.findOneBy({id})
    const updateduser = await this.userRepository.remove(entity)
    return "remove Successfully";
  }
}
