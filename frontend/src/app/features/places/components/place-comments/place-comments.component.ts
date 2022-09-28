import { Component, Input, OnInit } from '@angular/core';
import { IComment } from "../../models/IComment";
import { CommentsService } from "../../services/comments.service";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-place-comments',
  templateUrl: './place-comments.component.html',
  styleUrls: ['./place-comments.component.css']
})
export class PlaceCommentsComponent implements OnInit {

  @Input() id!: number;
  @Input() username!: string;

  commentForm = new FormGroup({
    text: new FormControl(""),
    username: new FormControl(""),
    placeId: new FormControl(0)
  });

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
      this.commentForm.setValue({text: "", username: this.username, placeId: this.id});
    });
  }

  public add(): void {
    if(this.commentForm.valid) {
      this.commentsService.add(this.commentForm.value).subscribe(() => {
        this.readComments();
        this.toastr.success("Comment added successfully", "Success");
      });
    }
  }

  public delete(id: number): void {
    if (confirm("Are you sure you want to delete this Comment?")) {
      this.commentsService.delete(id).subscribe(() => {
        this.readComments();
        this.toastr.success("Comment deleted successfully", "Success");
      });
    }
  }
}
