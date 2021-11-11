import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private chatService: ChatService) {}
  @SubscribeMessage('typing')
  async handleTypingMessage(client: Socket, payload: { threadId: string }) {
    await this.chatService.syncTypingStatus(payload.threadId, client.data.user);
  }
}
