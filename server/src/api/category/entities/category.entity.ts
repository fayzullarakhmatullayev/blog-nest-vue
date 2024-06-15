import { Post } from 'src/api/post/entities/post.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[]
}
