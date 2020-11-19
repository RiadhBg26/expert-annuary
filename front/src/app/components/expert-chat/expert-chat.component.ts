import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { ExpertService } from 'src/app/services/expert.service';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';
import { CompanyModelServer } from 'src/models/companyModel';
import { ExpertModelServer } from 'src/models/expertModel';
import { ChatModelServer, ChatResponse } from 'src/models/chatModel';
import * as io from 'socket.io-client'
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-expert-chat',
  templateUrl: './expert-chat.component.html',
  styleUrls: ['./expert-chat.component.css']
})
export class ExpertChatComponent implements OnInit {
  @ViewChild('namebutton') namebutton: ElementRef;

  id: any;
  id2: any;
  expert: ExpertModelServer;
  company: CompanyModelServer
  year
  age;
  name;
  chatBox: ChatModelServer[] = [];
  chat: ChatModelServer
  count: number
  sender;
  reciepent
  messages: string[] = []
  recievedMessages: string[] = []
  message: string
  chatId;
  data;
  socket;
  private SERVER_URL = environment.SERVER_URL
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    //get single expert
    this.route.paramMap.subscribe(params => {

      this.id = params.get('id');
      this.id2 = params.get('id2');
      // console.log('Expert ID is: ', this.id);
      this.expertService.getSingleExpert(this.id).subscribe(data => {
        // this.expert = Array.of(data)
        this.expert = data
        console.log(this.expert);
        this.chatBox = this.expert.chatBox
        for (let i = 0; i < this.chatBox.length; i++) {
          this.messages = this.chatBox[i].sender.message.value
          console.log(this.messages);

        }
        this.year = new Date().getFullYear();
        this.age = this.year - new Date(this.expert.bday).getFullYear()
      });
    });
    this.companyService.getSingleCompany(this.id2).subscribe((data: CompanyModelServer) => {
      this.company = data
      this.name = this.company.name
      this.chatBox = this.company.chatBox
      for (let i = 0; i < this.chatBox.length; i++) {
        this.recievedMessages = this.chatBox[i].reciepent.message.value
      }
    });

    // this.setupSocketConnection()
    this.getChats()
  };

  sendMessage(event) {
    const input = event.input;
    // this.message = event.value;
    // Add our fruit
    if ((this.message || '').trim()) {
      this.messages.push(this.message.trim());
    }

    this.data = {
      sender: { name: this.id, message: { value: this.messages, time: new Date() } },
      reciepent: { name: this.id2, message: { value: this.recievedMessages, time: new Date() } }
    }

    if (this.chatBox.length !== 0) {
      for (let i = 0; i < this.chatBox.length; i++) {
        this.chatId = this.chatBox[i]._id
        this.sender = this.chatBox[i].sender.name
        this.reciepent = this.chatBox[i].reciepent.name
      }
      if (this.sender._id !== this.data.sender.name && this.reciepent._id !== this.data.reciepent.name) {
        this.postChat()

      } else {
        this.editChat()
      }
    } else {
      this.postChat()
    }
  }
  editChat() {
    this.chatService.editChat(this.chatId, this.data).subscribe((chat: ChatModelServer) => {
      console.log(chat);
    })
  }

  postChat() {
    this.chatService.postChat(this.data).subscribe((data: ChatModelServer) => {
      console.log(data);
    })
  }

  getChats() {
    this.chatService.getChats().subscribe(data => {
      console.log(this.chatBox);
      this.chatBox = data.chats
      this.count = data.count
      console.log(this.count);

    })
  }



  //Socket.io
  setupSocketConnection() {
    const SOCKET_ENDPOINT = 'localhost:3000';
    this.socket = io(SOCKET_ENDPOINT); this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('sent-message');
        element.innerHTML = data;
        document.getElementById('box').appendChild(element);
      }
    });
  }
  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('sent-message');
    element.innerHTML = this.message;
    document.getElementById('box').appendChild(element);
    this.message = '';

  }

  addClass() {
    this.namebutton.nativeElement.classList.add('chat-slide')
    setTimeout(() => {
      this.namebutton.nativeElement.classList.remove('chat-slide')
    }, 5000);

  }
}
