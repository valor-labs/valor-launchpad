import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketConnService {
  // for debug usage
  get allConn() {
    return Array.from(this.userClients.entries()).reduce<
      Record<string, string[]>
    >((prev, [id, sockets]) => {
      return {
        ...prev,
        [id]: Array.from(sockets.values()).map((i) => i.id),
      };
    }, {});
  }

  private userClients = new Map<string, Set<Socket>>();

  add(userId: string, client: Socket) {
    // one user may have multiple clientId
    if (this.userClients.get(userId)) {
      this.userClients.get(userId).add(client);
    } else {
      this.userClients.set(userId, new Set([client]));
    }
  }

  delete(userId: string, client: Socket) {
    this.userClients.get(userId).delete(client);
  }

  isConnected(userId: string): boolean {
    const sockets = this.userClients.get(userId);
    return !!sockets && sockets.size > 0;
  }

  /**
   *
   * @param userId the user which is going to be notified
   * @param eventName
   * @param data
   * @param blockedSocketIds do not send to these sockets if necessary
   */
  notifyByUserId<T>(
    userId: string,
    eventName: string,
    data: T,
    blockedSocketIds: string[] = []
  ) {
    const sockets = this.userClients.get(userId);
    sockets?.forEach((s) => {
      if (!blockedSocketIds?.includes(s.id)) {
        s.emit(eventName, data);
      }
    });
  }
}
