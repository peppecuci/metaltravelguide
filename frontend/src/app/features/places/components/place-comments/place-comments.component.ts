import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IComment } from "../../models/IComment";
import { CommentsService } from "../../services/comments.service";
import { UsersService } from "../../../users/services/users.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-place-comments',
  templateUrl: './place-comments.component.html',
  styleUrls: ['./place-comments.component.css']
})
export class PlaceCommentsComponent implements OnInit {

  @Input() placeId!: number;
  @Input() userId!: number;
  @Input() isConnected!: boolean;

  commentForm = new FormGroup({
    text: new FormControl("", [Validators.required, Validators.minLength(1)]),
    userId: new FormControl(0),
    placeId: new FormControl(0)
  },  {updateOn: 'submit'});

  private comments: IComment[] = [];

  constructor(private usersService: UsersService, private commentsService: CommentsService, private toastr: ToastrService) { }

  get Comments(): IComment[] {
    return this.comments;
  }

  ngOnInit(): void {
    this.readComments();
  }

  private readComments(): void {
    this.commentForm.reset();
    this.commentForm.patchValue({userId: this.userId, placeId: this.placeId})
    this.commentForm.markAsUntouched();
    this.commentForm.markAsPristine();
    this.commentsService.readAllByPlace(this.placeId).subscribe((data: IComment[]) => {
      this.comments = data;
    });
  }

  public add(): void {
    if(this.commentForm.valid) {
      this.commentsService.add(this.commentForm.value).subscribe(() => {
        this.readComments();
        this.toastr.success("Comment adding successfully", "Success");
      }, error => {
        this.toastr.error("Error adding comment", "Error");
      });
    }
  }

  public delete(id: number): void {
    if (confirm("Are you sure you want to delete this Comment?")) {
      this.commentsService.delete(id).subscribe(() => {
        this.readComments();
        this.toastr.success("Comment deleted successfully", "Success");
      }, response => {
        this.toastr.error("Error deleting comment", "Error");
      });
    }
  }
}
