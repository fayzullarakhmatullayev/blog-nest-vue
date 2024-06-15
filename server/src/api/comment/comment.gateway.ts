import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Injectable } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { User } from '../user/entities/user.entity'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
@WebSocketGateway()
export class CommentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  constructor(private readonly commentService: CommentService) {}

  async handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`)
  }

  async handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`)
  }

  @SubscribeMessage('newComment')
  async handleNewComment(client: Socket, payload: any) {
    const newComment = await this.commentService.create(payload)

    this.server.emit('newComment', newComment)
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(client: Socket, commentId: number, @CurrentUser() user: User) {
    const deletedComment = await this.commentService.delete(commentId, user.id)
    if (deletedComment.deleted) {
      this.server.emit('deleteComment', commentId)
    }
  }

  @SubscribeMessage('updateComment')
  async handleUpdateComment(client: Socket, payload: { commentId: number; updateCommentDto: UpdateCommentDto }, @CurrentUser() user: User) {
    const updatedComment = await this.commentService.update(payload.commentId, payload.updateCommentDto, user.id)

    // Emit the updated comment to all connected clients
    this.server.emit('updateComment', updatedComment)
  }
}
