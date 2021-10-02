import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VerifyUserService} from './verify-user.service';

@Component({
  selector: 'valor-launchpad-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  message = "Verifying user...";
  token;

  constructor(private route: ActivatedRoute, private verifyUserService: VerifyUserService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.verifyUser();
    })
  }

  verifyUser() {
    this.verifyUserService.verify(this.token).subscribe((data: any) => {
      const message = data.success ? data.message : data?.data?.message;

      this.message = message;
    })
  }

}
