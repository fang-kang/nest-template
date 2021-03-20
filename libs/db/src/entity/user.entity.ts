/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-16 22:08:40
*/

import { Column, Entity } from "typeorm";
import { BaseEntity  } from "./base.entity";
@Entity()
export class User extends BaseEntity{
    @Column({
        type: "text",
        comment: '用户名',
        nullable: false
    })
    username: string

    @Column({
        type: "text",
        comment: '用户密码',
        select: false,
        nullable: false
    })
    password: string

    @Column({
        type: "text",
        comment: '用户昵称',
        nullable: true
    })
    nickname: string

    @Column({
        type: "text",
        comment: '用户头像',
        nullable: true,
    })
    avatar: string

    @Column({
        type: "text",
        comment: '用户签名',
        nullable: true
    })
    signature: string

    @Column({
        type: "text",
        comment: '地址',
        nullable: true
    })
    address: string

    @Column({
        type: "text",
        comment: '生日',
        nullable: true
    })
    birstday: string

    @Column({
        type: "text",
        comment: '备用1',
        nullable: true
    })
    ext1: string

    @Column({
        type: "text",
        comment: '备用2',
        nullable: true
    })
    ext2: string


    @Column({
        type: "text",
        comment: '备用3',
        nullable: true
    })
    ext3: string

    @Column({
        type: "int",
        comment: '用户性别 1男 2女 3未知',
        nullable: false,
        default:1
    })
    sex: number

    @Column({
        type: "bigint",
        comment: '用户创建时间',
        nullable: false,
        // default: new Date().getTime()
    })
    cdate: number
}