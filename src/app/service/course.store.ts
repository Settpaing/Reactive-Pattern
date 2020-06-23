import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Course} from "../model/course.model";
import {catchError, delay, map, shareReplay, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessagesService} from "../messages/messages.service";
import {LoadingService} from "../loading/loading.service";

@Injectable({
  providedIn:'root'
})
export class CourseStore {

  private subject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  course$: Observable<Course[]> = this.subject.asObservable();

  constructor(private http:HttpClient,private messageService: MessagesService,private loadingService: LoadingService){
    this.reloadAllCourses();
  }

  private reloadAllCourses() {
    const laodingCourse$ = this.http.get<Course[]>('http://localhost:8080/api/courses')
      .pipe(
        shareReplay(),
        delay(1500),
        catchError( err => {
          const messages = 'Could not load all courses';
          this.messageService.showErrorMessages(messages);
          return throwError(err);
        }),
        tap( courses => this.subject.next(courses))
      );

    this.loadingService.showLoaderUntilCompleted(laodingCourse$).subscribe();
  }

  filterByCategory(category: string): Observable<Course[]>{
      return this.course$.pipe(
        tap(()=> this.loadingService.loadingOn()),
        delay(1500),
        map(courses => courses.filter(course => course.category == category)),
        tap(()=>this.loadingService.loadingOff())
      )
  }

  // Optimistic Data Modificaion Pattern
  saveCourse(courseId: number, changes: Partial<Course>):Observable<Course>{
    const courses = this.subject.getValue();
    const index = courses.findIndex(courses=> courses.id == courseId); // find index to update the course
    const newCourse: Course = {
      ...courses[index],
      ...changes
    } // update data to course

    const newCourses:Course[] = courses.slice(0);
    newCourses[index] = newCourse;
    this.subject.next(newCourses);

    // API Update
    const header = new HttpHeaders().set('Content-type','application/json');
    return this.http.patch<Course>(`http://localhost:8080/api/courses/${courseId}`,changes,{headers:header})
      .pipe(
        shareReplay(),
        catchError( err=> {
          const message = 'Could not update course';
          this.messageService.showErrorMessages(message);
          return throwError(err)
        })
      );
  }
}
