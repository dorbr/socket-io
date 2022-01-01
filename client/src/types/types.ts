export interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
    displayPrivateMessage: (sender: any, msg: any) => any
    privateMessage: (reciver: any, sender: any, msg:any) => any
    chatMessage: (data: any) => any
  }
  
export interface ClientToServerEvents {
    // hello: () => void;
    displayPrivateMessage: (sender: any, msg: any) => any
    privateMessage: (reciver: any, sender: any, msg:any) => any
    chatMessage: (data: any) => any
}