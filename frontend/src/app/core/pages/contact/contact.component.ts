import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // variables
  contactForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    mail: new FormControl("", [Validators.required, Validators.email]),
    message: new FormControl("", [Validators.required, Validators.minLength(4)])
  });
  private isClicked: boolean = false;
  private isSent: boolean = false;

  constructor() { }

  get IsClicked(): boolean {
    return this.isClicked;
  }

  get IsSent(): boolean {
    return this.isSent;
  }

  ngOnInit(): void {
  }

  contact(): void {
    if (this.contactForm.valid) {
      this.isClicked = false;
      this.isSent = true;
      this.contactForm.reset();
    }
    else {
      this.isClicked = true;
      this.isSent = false;
    }
  }

}
