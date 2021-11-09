import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { User } from '@valor-launchpad/users-api';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatMessageVo, ChatThreadVo } from '@valor-launchpad/api-interfaces';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('threads')
  getThreads(@User() actingUser): Promise<ChatThreadVo[]> {
    return this.chatService.findRecentThreads(actingUser);
  }

  @Get('threads/:threadId/messages')
  getMessages(
    @Param('threadId') threadId: string,
    @User() actingUser
  ): Promise<ChatMessageVo[]> {
    return this.chatService.findThreadMessages(threadId, actingUser);
  }

  @Post('threads/:threadId/messages')
  createMessage(
    @Param('threadId') threadId: string,
    @Body() { message, socketId }: CreateMessageDto,
    @User() actingUser
  ): Promise<ChatMessageVo> {
    return this.chatService.createMessage(
      threadId,
      message,
      actingUser,
      socketId
    );
  }

  @Post('threads/:threadId/markAsRead')
  markThreadAdRead(@Param('threadId') threadId: string, @User() actingUser) {
    return this.chatService.markAsRead(actingUser.id, threadId);
  }
}
