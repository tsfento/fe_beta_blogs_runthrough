import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { NotificationService } from './core/services/notification.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'fe_beta_blogs_runthrough';

  constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification) => {
      this.snackBar.open(notification, 'Dismiss', {
        duration: 3000
      })
    })
  }
}
