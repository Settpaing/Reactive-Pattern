import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import {Observable, throwError} from 'rxjs';
import { Course } from '../model/course.model';
import {catchError, filter, finalize, map} from 'rxjs/operators';
import {LoadingService} from "../loading/loading.service";
import {MessagesService} from "../messages/messages.service";
import {CourseStore} from "../service/course.store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private courseService: CourseService,private loadingService: LoadingService,private messageService: MessagesService,
              private courseStore: CourseStore) { }

  ngOnInit(): void {
    this.reloadAllCourses();
  }

  private reloadAllCourses() {
    this.courses$ = this.courseStore.course$;
    // this.loadingService.loadingOn();
    // this.courses$ = this.courseService.loadAllCourses().pipe(
    //   catchError( err => {
    //     const messages = 'Could not load courses';
    //     this.messageService.showErrorMessages(messages);
    //     return throwError(err);
    //   })
    // );
    // this.courses$ = this.loadingService.showLoaderUntilCompleted(this.courses$);
    //   .pipe(
    //   finalize(()=>this.loadingService.loadingOff())
    // );
  }

  beginnerCourse(){

    this.courses$ = this.courseStore.filterByCategory('Beginner');

   // this.loadingService.loadingOn();
   //  const courses$ = this.courseService.loadAllCourses();
   //  const loading$ = this.loadingService.showLoaderUntilCompleted(courses$);
   //  this.courses$ = loading$.pipe(
   //    map(courses => courses.filter(course => course.category == 'Beginner'))
   //   finalize(()=>this.loadingService.loadingOff())
   //  );
  }

  advancedCourse(){

    this.courses$ = this.courseStore.filterByCategory('Advanced');
 //   this.loadingService.loadingOn();
 //    const courses$ = this.courseService.loadAllCourses();
 //    const loading$ = this.loadingService.showLoaderUntilCompleted(courses$);
 //    this.courses$ = loading$.pipe(
 //      map(courses => courses.filter(course => course.category == 'Advanced'))
   //   finalize(()=>this.loadingService.loadingOff())
   //  );
  }

  saveAllChanges(course:Course){

    this.courseStore.saveCourse(course.id,course).subscribe();
    // this.courseService.updateCourse(course.id,course)
    // .subscribe(
    //   data => console.log('From home :' , data),
    //   error => console.log(error),
    //   () => this.reloadAllCourses()
    // );
  }

}
