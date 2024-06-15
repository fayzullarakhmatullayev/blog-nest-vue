import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Comment } from 'src/api/comment/entities/comment.entity'
import { Post } from 'src/api/post/entities/post.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[]
}
