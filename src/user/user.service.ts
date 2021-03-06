/* eslint-disable prettier/prettier */
import { UserInterface } from './interface/user.interface';
import { UserBaseDto, UserUpdateDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm' ;;
import { Repository } from 'typeorm';
import { User } from 'libs/db/entity/user.entity';
import { CustomException } from 'libs/common/common/http.decoration';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const md5 = require('md5');
@Injectable()
export class UserService extends TypeOrmCrudService<User>{
  userRepository: Repository<User>;
  constructor ( @InjectRepository (User) userRepository: Repository<User> ){
    super (userRepository);
    this.userRepository = userRepository;
  }


  /*
   *@Description: 用户注册
   *@MethodAuthor: fk
   *@Date: 2021-02-06 00:02:53
   */
  async userRegister({ username, password }: UserBaseDto): Promise<any> {
    const pwd = md5(password);

    const oldUser = await this.userRepository.findOne({
      username,
    });
    if (oldUser) {
      throw new CustomException('用户已存在');
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.nickname = '新用户' + new Date().getTime();
      newUser.password = pwd;
      newUser.cdate = new Date().getTime()
      return await this.userRepository
        .save(newUser)
        .then(() => {
          return newUser;
        })
        .catch((err) => {
          console.log('err', err)
          throw new CustomException('添加失败');
        });
    }
  }

  /*
   *@Description: 更新用户信息
   *@MethodAuthor: fk
   *@Date: 2021-02-06 00:03:14
   */
  async userInfoUpdate(params: UserUpdateDto): Promise<any> {
    const oldUser = await this.userRepository.findOne(params.id);
    if (!oldUser) {
      throw new CustomException('暂无用户');
    }
    if(params.password){
      params.password = md5(params.password);
    }
    return await this.userRepository
      .update(params.id, params)
      .then(() => {
        return params;
      })
      .catch(() => {
        throw new CustomException('操作失败');
      });
  }

  /**
   *
   * 获取用户信息
   * @param {*} { id }
   * @return {*}  {Promise<UserInterface>}
   * @memberof UserService
   */
  async getUserInfo({ id }: any): Promise<any> {
    const data = await this.userRepository.findOne({ id });
    if (!data) {
      console.log(data);
      throw new CustomException('查询错误');
    } else {
      return data;
    }
  }
  async validateUser({ username, password }: UserBaseDto): Promise<any> {
    const pwd = md5(password);

    const oldUser = await this.userRepository.findOne({
      username,
    });
    if (oldUser) {
      throw new CustomException('用户已存在');
    }
  }
  /*
   *@Description: 删除用户
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 15:43:02
  */
  async delUser(id: number): Promise<any> {
    const data = await this.userRepository.findOne({ id });
    if (!data) {
      throw new CustomException('查询错误');
    }
    return this.userRepository.remove(data).then(() => {
      return '删除成功'
    }).catch(() => {
      throw new CustomException('操作失败');
    })
  }
  /*
   *@Description: 查询用户列表
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 15:47:38
  */
  async getUserList(): Promise<UserInterface[]> {
    return await this.userRepository.find()
  }
}
