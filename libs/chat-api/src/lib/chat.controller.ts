import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { User } from '@valor-launchpad/users-api';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatMessageVo, ChatThreadVo } from '@valor-launchpad/api-interfaces';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('search')
  getThreadOrUsers(@User() actingUser, @Query('keyword') keyword: string) {
    return this.chatService.searchThreadOrUsers(keyword, actingUser);
  }

  @Get('threads')
  getThreads(@User() actingUser): Promise<ChatThreadVo[]> {
    return this.chatService.findRecentThreads(actingUser);
  }

  @Post('threads')
  createThread(@Body() createThreadDto: CreateThreadDto, @User() actingUser) {
    if (createThreadDto.isGroup) {
      return this.chatService.createGroup(createThreadDto, actingUser);
    } else {
      return this.chatService.createSingleThread(createThreadDto, actingUser);
    }
  }

  @Patch('threads/:threadId')
  updateThread(
    @Param('threadId') threadId: string,
    @Body() updateThreadDto: UpdateThreadDto,
    @User() actingUser
  ) {
    return this.chatService.updateGroup(threadId, updateThreadDto, actingUser);
  }

  @Get('unreadMessages')
  getUnreadMessages(@User() actingUser) {
    return this.chatService.findUnreadMessages(actingUser);
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
