import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { ExpertService } from 'src/app/services/expert.service';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';
import { CompanyModelServer } from 'src/models/companyModel';
import { ExpertModelServer, ExpertResponse } from 'src/models/expertModel';
import { ChatModelServer, ChatResponse } from 'src/models/chatModel';
import * as io from 'socket.io-client'
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-company-chat',
  templateUrl: './company-chat.component.html',
  styleUrls: ['./company-chat.component.css']
})
export class CompanyChatComponent implements OnInit {

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
  messages: any[] = []
  message: string;
  sentMessages: string[] = [];
  chatId;
  socket;
  private SERVER_URL = environment.SERVER_URL
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      this.id = params.get('id');
      this.id2 = params.get('id2');
      console.log(this.id, this.id2);

      // console.log('this id =>', this.id, this.id2);
      this.companyService.getSingleCompany(this.id).subscribe(data => {
        this.company = data
        this.name = this.company.name
        this.chatBox = this.company.chatBox
        for (let i = 0; i < this.chatBox.length; i++) {
          this.messages = this.chatBox[i].reciepent.message.value
        }
      });
      this.expertService.getSingleExpert(this.id2).subscribe((data: ExpertModelServer) => {
        this.expert = data
        console.log(this.expert);
        this.chatBox = this.expert.chatBox
        for (let i = 0; i < this.chatBox.length; i++) {
          this.sentMessages = this.chatBox[i].sender.message.value
        }
        this.year = new Date().getFullYear();
        this.age = this.year - new Date(this.expert.bday).getFullYear()
      });
    })

    this.getChats()
  };

  sendMessage(event) {
    const input = event.input;
    // this.message = event.value;
    console.log(this.message);

    // Add our fruit
    if ((this.message || '').trim()) {
      this.messages.push(this.message.trim());
      console.log(this.messages);
    }
    let data = {
      sender: { name: this.id2, message: {value: this.sentMessages, time: new Date()} },
      reciepent: { name: this.id, message: {value: this.messages, time: new Date()} }
    }
    if (this.chatBox.length !== 0) {

      for (let i = 0; i < this.chatBox.length; i++) {
        this.chatId = this.chatBox[i]._id
        this.sender = this.chatBox[i].sender.name
        this.reciepent = this.chatBox[i].reciepent.name
      }
      if (this.sender._id !== data.sender.name && this.reciepent._id !== data.reciepent.name) {
        this.chatService.postChat(data).subscribe((data: ChatModelServer) => {
          console.log(data);
        })
      } else {
        this.chatService.editChat(this.chatId, data).subscribe((chat: ChatModelServer) => {
          console.log(chat);
        })
      }
    } else {
      this.chatService.postChat(data).subscribe((data: ChatModelServer) => {
        console.log(data);
      })
    }
  }

  getChats() {
    this.chatService.getChats().subscribe(data => {
      this.chatBox = data.chats
      this.count = data.count
      console.log(this.count, this.chatBox.length);

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
  // SendMessage() {
  // this.socket.emit('message', this.message);
  // const element = document.createElement('sent-message');
  // element.innerHTML = this.message;
  // document.getElementById('box').appendChild(element);
  // this.isSent = true
  // this.message = '';
  // // this.isSent = false

  // }

  addClass() {
    this.namebutton.nativeElement.classList.add('chat-slide')
    setTimeout(() => {
      this.namebutton.nativeElement.classList.remove('chat-slide')
    }, 5000);

  }
}

