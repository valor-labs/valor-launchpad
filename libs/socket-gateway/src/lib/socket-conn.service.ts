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

  notifyByUserId<T>(userId: string, eventName: string, message: T) {
    const sockets = this.userClients.get(userId);
    sockets?.forEach((s) => s.emit(eventName, message));
  }
}
