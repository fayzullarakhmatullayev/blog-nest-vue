import { Post } from 'src/api/post/entities/post.entity'
import { User } from 'src/api/user/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @ManyToOne(() => User, (user) => user.comments)
  author: User

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post
}
