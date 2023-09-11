export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dayOfBirth: string;
}

export  interface FriendRequest {
  user: User,
  isResponse: boolean,
  responseMessage: string
}

export interface LoginResponse {
  user: User,
  apiKey: string
}

export interface Channel{
  id: string,
  type: "DIRECT" | "GROUP"
  name: string,
  latestMess: Message | null,
  users: User[]
}

export interface Message{
  id: string
  channelId: string
  userSendId: string
  type: string
  content: string
  timeSent: string
}

export interface ChannelCustom {
  channel: Channel,
  showOption: boolean
}
