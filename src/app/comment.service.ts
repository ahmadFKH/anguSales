import { Injectable } from '@angular/core';
import Comment  from './models/comment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/';
import { Observable } from 'rxjs/';

@Injectable()
export class CommentService {

  public commentsUpdate: Observable<Comment[]>;
  public commentsSubject: Subject<Comment[]>;

  constructor(private http: HttpClient) {
    this.commentsSubject = new Subject<Comment[]>();
    this.commentsUpdate = this.commentsSubject.asObservable();
   }

  getComments(email: string) {
    const observble = this.http.get<Comment[]>('http://localhost:3000/comments/' + email);
    observble.subscribe((res) => {
      this.commentsSubject.next(res);
  })
  }
  
  addComment(newComment: Comment) {
    return this.http.post<Comment>('http://localhost:3000/comments/add-comment', { comment: newComment })    
  }

}
