import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  // WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io'; // Server,
import { CreateBookCommentDto } from './book-comments/interfaces/dto/create-book-comment';
import { BookCommentsService } from './book-comments/book-comments.service';

@WebSocketGateway()
export class AppGateway {
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }

  constructor(private readonly bookCommentsService: BookCommentsService) {}

  // @WebSocketServer() server: Server;

  @SubscribeMessage('addComment')
  addComment(@MessageBody() data: CreateBookCommentDto) {
    return this.bookCommentsService.create(data);
  }

  @SubscribeMessage('getAllComments')
  async getAllComments(
    @MessageBody() data: Partial<CreateBookCommentDto>,
    @ConnectedSocket() client: Socket,
  ) {
    const comments = await this.bookCommentsService.findAllBookComments(
      data.bookId,
    );

    client.emit('getAllComments', comments);
  }
}
