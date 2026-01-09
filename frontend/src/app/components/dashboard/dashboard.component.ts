import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BugService } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>{{ currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1) }} Dashboard</h1>
        <div class="header-actions">
          <button mat-raised-button color="primary" (click)="createBug()">
            <mat-icon>add</mat-icon>
            Create Bug
          </button>
          <button mat-raised-button color="accent" (click)="refreshData()">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
          <button mat-raised-button (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Total Bugs</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ stats.total }}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card open">
          <mat-card-header>
            <mat-card-title>Open</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ stats.open }}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card in-progress">
          <mat-card-header>
            <mat-card-title>In Progress</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ stats.inProgress }}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card fixed">
          <mat-card-header>
            <mat-card-title>Fixed</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ stats.fixed }}</div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="bugs-table-card">
        <mat-card-header>
          <mat-card-title>Recent Bugs</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="bugs" class="bugs-table">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Title</th>
                <td mat-cell *matCellDef="let bug">{{ bug.title }}</td>
              </ng-container>

              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let bug">
                  <span [class]="'priority-' + bug.priority">{{ bug.priority }}</span>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let bug">
                  <span [class]="'status-' + bug.status.replace('_', '-')">{{ bug.status.replace('_', ' ') }}</span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let bug">
                  <div class="action-buttons">
                    <button mat-raised-button 
                            color="primary" 
                            (click)="editBug(bug._id)" 
                            class="action-button edit-button"
                            [disabled]="bug.status === 'closed'">
                      <mat-icon>edit</mat-icon>
                      Edit
                    </button>
                    <button mat-raised-button 
                            color="warn" 
                            (click)="deleteBug(bug._id)" 
                            class="action-button delete-button">
                      <mat-icon>delete</mat-icon>
                      Delete
                    </button>
                    <button mat-raised-button 
                            color="accent" 
                            (click)="closeBug(bug._id)" 
                            class="action-button close-button"
                            [disabled]="bug.status === 'closed'">
                      <mat-icon>check_circle</mat-icon>
                      Close
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
      border-radius: 20px;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .dashboard-header h1 {
      color: #2c3e50;
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header-actions {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .header-actions button {
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .header-actions button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }

    .header-actions button[color="primary"] {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border: none;
    }

    .header-actions button[color="primary"]:hover {
      background: linear-gradient(45deg, #5a6fd8, #6a4190);
    }

    .header-actions button[color="accent"] {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      color: white;
      border: none;
    }

    .header-actions button[color="accent"]:hover {
      background: linear-gradient(45deg, #ff5252, #3db8af);
    }

    .header-actions button:not([color]) {
      background: linear-gradient(45deg, #e74c3c, #c0392b);
      color: white;
      border: none;
    }

    .header-actions button:not([color]):hover {
      background: linear-gradient(45deg, #c0392b, #a93226);
    }

    .header-actions mat-icon {
      margin-right: 8px;
      font-size: 1.2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      text-align: center;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #1976d2;
      text-shadow: 0 2px 10px rgba(25, 118, 210, 0.3);
    }

    .stat-card.open .stat-number {
      color: #2196f3;
      text-shadow: 0 2px 10px rgba(33, 150, 243, 0.3);
    }

    .stat-card.in-progress .stat-number {
      color: #ff9800;
      text-shadow: 0 2px 10px rgba(255, 152, 0, 0.3);
    }

    .stat-card.fixed .stat-number {
      color: #4caf50;
      text-shadow: 0 2px 10px rgba(76, 175, 80, 0.3);
    }

    .bugs-table-card {
      margin-top: 20px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .table-container {
      overflow-x: auto;
      border-radius: 12px;
    }

    .bugs-table {
      width: 100%;
      min-width: 600px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
    }

    .bugs-table th {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      font-weight: 600;
      padding: 16px;
      text-align: left;
    }

    .bugs-table td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .bugs-table tr:hover {
      background: rgba(102, 126, 234, 0.05);
    }

    .action-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .action-button {
      padding: 8px 16px;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
      animation: buttonAppear 0.5s ease-out;
    }

    @keyframes buttonAppear {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .action-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }

    .action-button:hover::before {
      left: 100%;
    }

    .action-button mat-icon {
      margin-right: 6px;
      font-size: 1rem;
      transition: transform 0.3s ease;
    }

    .action-button:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .action-button:hover mat-icon {
      transform: rotate(10deg) scale(1.1);
    }

    .edit-button {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border: none;
      animation-delay: 0.1s;
    }

    .edit-button:hover {
      background: linear-gradient(45deg, #5a6fd8, #6a4190);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .edit-button:disabled {
      background: #ccc;
      transform: none;
      box-shadow: none;
    }

    .edit-button:disabled:hover {
      transform: none;
      box-shadow: none;
    }

    .edit-button:disabled mat-icon {
      transform: none;
    }

    .delete-button {
      background: linear-gradient(45deg, #e74c3c, #c0392b);
      color: white;
      border: none;
      animation-delay: 0.2s;
    }

    .delete-button:hover {
      background: linear-gradient(45deg, #c0392b, #a93226);
      box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
    }

    .delete-button:hover mat-icon {
      transform: rotate(-10deg) scale(1.1);
    }

    .close-button {
      background: linear-gradient(45deg, #4caf50, #45a049);
      color: white;
      border: none;
      animation-delay: 0.3s;
    }

    .close-button:hover {
      background: linear-gradient(45deg, #45a049, #3d8b40);
      box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
    }

    .close-button:hover mat-icon {
      transform: rotate(15deg) scale(1.1);
    }

    .close-button:disabled {
      background: #ccc;
      transform: none;
      box-shadow: none;
    }

    .close-button:disabled:hover {
      transform: none;
      box-shadow: none;
    }

    .close-button:disabled mat-icon {
      transform: none;
    }

    .priority-low {
      color: #4caf50;
      font-weight: 500;
    }

    .priority-medium {
      color: #ff9800;
      font-weight: 500;
    }

    .priority-high {
      color: #f44336;
      font-weight: 500;
    }

    .priority-critical {
      color: #d32f2f;
      font-weight: bold;
    }

    .status-open {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .status-in-progress {
      background-color: #fff3e0;
      color: #f57c00;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .status-fixed {
      background-color: #e8f5e8;
      color: #388e3c;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .status-closed {
      background-color: #f5f5f5;
      color: #757575;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .header-actions {
        width: 100%;
        justify-content: flex-start;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  bugs: any[] = [];
  stats = {
    total: 0,
    open: 0,
    inProgress: 0,
    fixed: 0
  };
  displayedColumns = ['title', 'priority', 'status', 'actions'];
  currentUser: any;

  constructor(
    private bugService: BugService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loadBugs();
  }

  loadBugs() {
    this.bugService.getBugs().subscribe({
      next: (bugs: any[]) => {
        this.bugs = bugs;
        this.calculateStats();
      },
      error: (error: any) => {
        this.snackBar.open('Failed to load bugs', 'Close', { duration: 3000 });
      }
    });
  }

  calculateStats() {
    this.stats.total = this.bugs.length;
    this.stats.open = this.bugs.filter(b => b.status === 'open').length;
    this.stats.inProgress = this.bugs.filter(b => b.status === 'in_progress').length;
    this.stats.fixed = this.bugs.filter(b => b.status === 'fixed').length;
  }

  createBug() {
    this.router.navigate(['/create-bug']);
  }

  refreshData() {
    this.loadBugs();
  }

  editBug(bugId: string) {
    this.router.navigate(['/edit-bug', bugId]);
  }

  deleteBug(bugId: string) {
    if (confirm('Are you sure you want to delete this bug?')) {
      console.log('Attempting to delete bug:', bugId);
      this.bugService.deleteBug(bugId).subscribe({
        next: (response) => {
          console.log('Delete response:', response);
          this.snackBar.open('Bug deleted successfully', 'Close', { duration: 3000 });
          this.loadBugs();
        },
        error: (error) => {
          console.error('Delete error:', error);
          let errorMessage = 'Failed to delete bug';
          if (error.status === 403) {
            errorMessage = 'You do not have permission to delete bugs';
          } else if (error.status === 404) {
            errorMessage = 'Bug not found';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        }
      });
    }
  }

  closeBug(bugId: string) {
    console.log('Attempting to close bug:', bugId);
    this.bugService.updateBug(bugId, { status: 'closed' }).subscribe({
      next: (response) => {
        console.log('Close response:', response);
        this.snackBar.open('Bug closed successfully', 'Close', { duration: 3000 });
        this.loadBugs();
      },
      error: (error) => {
        console.error('Close error:', error);
        let errorMessage = 'Failed to close bug';
        if (error.status === 403) {
          errorMessage = 'You do not have permission to close bugs';
        } else if (error.status === 404) {
          errorMessage = 'Bug not found';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
