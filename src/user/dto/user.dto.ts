/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserBaseDto {
   @IsNotEmpty({
      message: '用户名不能为空'
   })
   @ApiProperty()
   username: string;
   @IsString()

   @IsNotEmpty({
      message: '密码不能为空'
   })
   @Length(6, 12)
   @ApiProperty()
   password: string;
}

/**
 * 更新用户信息
 */
export class UserUpdateDto {
   @IsNotEmpty({
      message: 'id不能为空'
   })
   @ApiProperty()
   password: string;
   @ApiProperty()
   username: string;
   @ApiProperty()
   id: number;
   @ApiProperty()
   nickname: string;
   @ApiProperty()
   avatar: string;
   @ApiProperty()
   signature: string;
   @ApiProperty()
   sex: number;
   @ApiProperty()
   address: string;
   @ApiProperty()
   ext1: string;
   @ApiProperty()
   ext2: string;
   @ApiProperty()
   ext3: string;
   @ApiProperty()
   birstday: string;
}
