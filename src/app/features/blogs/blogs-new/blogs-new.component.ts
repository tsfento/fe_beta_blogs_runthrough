import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { Router } from '@angular/router';
import { Blog } from '../../../shared/models/blog';

@Component({
  selector: 'app-blogs-new',
  imports: [ReactiveFormsModule],
  templateUrl: './blogs-new.component.html',
  styleUrl: './blogs-new.component.scss'
})
export class BlogsNewComponent {
  blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  selectedFile: File | null = null;

  constructor(private blogService: BlogService, private router: Router) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.blogForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.blogForm.get('title')!.value!);
      formData.append('content', this.blogForm.get('content')!.value!);
      formData.append('cover_image', this.selectedFile, this.selectedFile.name);

      this.blogService.createBlog(formData).subscribe({
        next: (blog: Blog) => {
          console.log('Blog created: ', blog);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error creating blog: ', error);
        }
      })
    }
  }
}
