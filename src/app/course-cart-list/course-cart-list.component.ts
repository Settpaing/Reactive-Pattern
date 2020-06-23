import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import {LoadingService} from "../loading/loading.service";

@Component({
  selector: 'app-course-cart-list',
  templateUrl: './course-cart-list.component.html',
  styleUrls: ['./course-cart-list.component.css']
})
export class CourseCartListComponent implements OnInit {

  @Input()
  courses$: Observable<Course[]>;

  courseForm: FormGroup;

  @Output()
  courseOut:EventEmitter<Course> = new EventEmitter<Course>();

  constructor(private fb: FormBuilder,private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group(
      {
        url:[''],
        category:[''],
        longDescription:['']
      }
    )
  }

  edit(course: Course){
   // console.log(course.url);
   this.id = course.id;
   this.courseForm = this.fb.group(
     {
       url:[course.url],
       category:[course.category],
       longDescription:[course.longDescription]
     }
   );
  }

  id:number;

  saveAllChanges(){
    const course:Course = this.courseForm.value;
    course.id = this.id;
    this.courseOut.emit(course);

  }

}
