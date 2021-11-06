import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../header/header.service';

@Component({
  selector: 'valor-launchpad-message-dropdown',
  templateUrl: './message-dropdown.component.html',
  styleUrls: ['./message-dropdown.component.scss'],
})
export class MessageDropdownComponent implements OnInit {
  messages = [];
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
