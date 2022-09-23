import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../../models/IComment";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-place-comments',
  templateUrl: './place-comments.component.html',
  styleUrls: ['./place-comments.component.css']
})
export class PlaceCommentsComponent implements OnInit {

  @Input() id!: number;
  private comments: IComment[] = [];

  constructor(private commentsService: CommentsService) { }

  get Comments(): IComment[] {
    return this.comments;
  }

  ngOnInit(): void {
    this.commentsService.readAllByPlace(this.id).subscribe((data: IComment[]) => {
      this.comments = data;
    });
  }

}
