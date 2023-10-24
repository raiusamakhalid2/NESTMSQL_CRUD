export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly profile: {
    readonly gender: string;
    readonly picture: string;
  };
  readonly photo :{
    readonly url :string;
  };
}
