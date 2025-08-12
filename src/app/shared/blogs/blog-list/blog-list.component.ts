import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from '../../models/blog';
import { MatIconModule } from '@angular/material/icon';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  imports: [MatIconModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  @Output() onChangeBlogs: EventEmitter<Blog[]> = new EventEmitter<Blog[]>();
  @Input({ required: true }) blogs: Blog[] = [];

  constructor(private blogsService: BlogService) {}

  toggleLiked(blogId: number) {
    const blogs = [...this.blogs];
    const blogIndex = blogs.findIndex(blog => blog.id === blogId);

    if (blogIndex === -1) return;

    const blog = blogs[blogIndex];
    const isLiked = blog.liked;
    const blog$ = isLiked ? this.blogsService.unlikeBlog(blogId) : this.blogsService.likeBlog(blogId);

    blog.liked = !isLiked;

    blog$.subscribe({
      next: () => {
        blog.likes_count! += isLiked ? -1 : 1;
        this.onChangeBlogs.emit(blogs);
      },
      error: (error: any) => {
        console.error('Error toggling like status:', error);
        blog.liked = isLiked;
      }
    })
  }
}
