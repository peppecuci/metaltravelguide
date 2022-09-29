import { Component, Input, OnInit } from '@angular/core';
import { IComment } from "../../models/IComment";
import { CommentsService } from "../../services/comments.service";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-place-comments',
  templateUrl: './place-comments.component.html',
  styleUrls: ['./place-comments.component.css']
})
export class PlaceCommentsComponent implements OnInit {

  @Input() id!: number;
  @Input() username!: string;
  @Input() isConnected!: boolean;

  commentForm = new FormGroup({
    text: new FormControl("", [Validators.required, Validators.minLength(1)]),
    username: new FormControl(""),
    placeId: new FormControl(0)
  },  {updateOn: 'submit'});

  private comments: IComment[] = [];

  constructor(private commentsService: CommentsService, private toastr: ToastrService) { }

  get Comments(): IComment[] {
    return this.comments;
  }

  ngOnInit(): void {
    this.readComments();
  }

  private readComments(): void {
    this.commentsService.readAllByPlace(this.id).subscribe((data: IComment[]) => {
      this.comments = data;
      this.commentForm.reset();
      this.commentForm.patchValue({username: this.username, placeId: this.id})
      this.commentForm.markAsUntouched();
      this.commentForm.markAsPristine();
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
