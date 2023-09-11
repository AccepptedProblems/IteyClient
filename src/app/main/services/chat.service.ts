import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  options: ChatListOption[] = [
    {
      id: 1,
      title: 'Lời mời kết bạn',
      ggIcon: 'person_add'
    },
    {
      id: 2,
      title: 'Tìm kiếm người dùng',
      ggIcon: 'search'
    },
    {
      id: 3,
      title: 'Danh sách chặn',
      ggIcon: 'block'
    }
  ]
}

export interface ChatListOption {
  id: number,
  title: string,
  ggIcon: string
}
