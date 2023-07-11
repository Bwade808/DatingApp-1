import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => {
        const errors = error.error.errors;
        if(errors.Password)
          this.toastr.error(errors.Password[0]);
        else if(errors.Username)
          this.toastr.error(errors.Username[0])
        else
          this.toastr.error(error)
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
