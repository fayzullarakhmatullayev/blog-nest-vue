import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { Category } from 'src/api/category/entities/category.entity'
import { Comment } from 'src/api/comment/entities/comment.entity'
import { User } from 'src/api/user/entities/user.entity'
import { Max } from 'class-validator'

@Entity()
export class Post {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number

  @Column()
  title: string

  @Column({
    nullable: true,
  })
  shortContent: string

  @Column()
  content: string

  @Column({
    nullable: true,
  })
  thumbnail: string

  @Column({
    default: new Date(),
  })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.posts)
  author: User

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[]

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]
}
