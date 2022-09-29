import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // variables
  contactForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    mail: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
    message: new FormControl("", [Validators.required, Validators.minLength(4)])
  }, {updateOn: "submit"});

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  contact(): void {
    if (this.contactForm.valid) {
      this.contactForm.reset();
      this.toastr.success("Comment sent successfully", "Success");
    }
    else {
      this.toastr.error("Error sending comment", "Error");
    }
  }
}
