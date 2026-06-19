import {
  WebSocketGateway, WebSocketServer,
  OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Injectable, Logger } from '@nestjs/common'

@WebSocketGateway({
  cors: { origin: '*' }  
})

@Injectable()
export class TasksGateway
  implements OnGatewayConnection, OnGatewayDisconnect {

  private readonly logger = new Logger('TasksGateway')

  @WebSocketServer()
  server!: Server

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  emitTaskUpdated(task: any) {
    this.logger.log(`Emitting task:updated for ${task.id}`)
    this.server.emit('task:updated', {
      id: task.id,
      status: task.status,
      timestamp: new Date().toISOString()
    })
  }
}