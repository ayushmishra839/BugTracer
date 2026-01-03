import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BugService } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-bug',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
    CommonModule
  ],
  template: `
    <div class="create-bug-background">
      <div class="animated-particles">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
      </div>
      
      <div class="create-bug-container">
        <div class="create-bug-card">
          <div class="create-bug-header">
            <div class="header-image">
              <div class="bug-icon-large">🐛</div>
            </div>
            <div class="header-text">
              <h2>Create New Bug</h2>
              <p>Report and track issues efficiently</p>
            </div>
          </div>
          
          <form [formGroup]="bugForm" (ngSubmit)="onSubmit()" class="create-bug-form">
            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Title</mat-label>
                <input matInput formControlName="title" required placeholder="Enter bug title">
                <mat-icon matSuffix>bug_report</mat-icon>
                <mat-error *ngIf="bugForm.get('title')?.hasError('required')">
                  Title is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" required rows="4" placeholder="Describe the bug in detail"></textarea>
                <mat-icon matSuffix>description</mat-icon>
                <mat-error *ngIf="bugForm.get('description')?.hasError('required')">
                  Description is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <div class="form-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Priority</mat-label>
                  <mat-select formControlName="priority" class="custom-select">
                    <mat-option value="low">Low</mat-option>
                    <mat-option value="medium">Medium</mat-option>
                    <mat-option value="high">High</mat-option>
                    <mat-option value="critical">Critical</mat-option>
                  </mat-select>
                  <mat-icon matSuffix>priority_high</mat-icon>
                </mat-form-field>
              </div>

              <div class="form-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Status</mat-label>
                  <mat-select formControlName="status" class="custom-select">
                    <mat-option value="open">Open</mat-option>
                    <mat-option value="in_progress">In Progress</mat-option>
                    <mat-option value="fixed">Fixed</mat-option>
                    <mat-option value="closed">Closed</mat-option>
                  </mat-select>
                  <mat-icon matSuffix>info</mat-icon>
                </mat-form-field>
              </div>
            </div>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="bugForm.invalid || isLoading" 
                      class="submit-button">
                <span *ngIf="!isLoading">🚀 Create Bug</span>
                <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
              </button>
              
              <button mat-raised-button color="accent" type="button" 
                      (click)="cancel()" 
                      class="cancel-button">
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .create-bug-background {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px 0;
      position: relative;
      overflow: hidden;
    }

    .animated-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: particleFloat 8s ease-in-out infinite;
    }

    .particle-1 { top: 10%; left: 10%; animation-delay: 0s; }
    .particle-2 { top: 20%; right: 15%; animation-delay: 1s; }
    .particle-3 { bottom: 30%; left: 20%; animation-delay: 2s; }
    .particle-4 { top: 50%; right: 10%; animation-delay: 3s; }
    .particle-5 { bottom: 20%; right: 30%; animation-delay: 4s; }

    @keyframes particleFloat {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
      50% { transform: translateY(-30px) scale(1.5); opacity: 0.8; }
    }

    .create-bug-container {
      width: 100%;
      max-width: 600px;
      padding: 20px;
      position: relative;
      z-index: 2;
    }

    .create-bug-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      position: relative;
      overflow: hidden;
    }

    .create-bug-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      animation: shimmer 3s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .create-bug-header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      position: relative;
      z-index: 1;
    }

    .header-image {
      margin-right: 20px;
    }

    .bug-icon-large {
      font-size: 3rem;
      animation: bounce 2s ease-in-out infinite;
      display: inline-block;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }

    .header-text h2 {
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header-text p {
      color: #7f8c8d;
      font-size: 1rem;
      margin: 0;
    }

    .create-bug-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-row {
      display: flex;
      gap: 20px;
    }

    .form-row .form-group {
      flex: 1;
    }

    .form-group {
      position: relative;
    }

    .full-width {
      width: 100%;
    }

    .mat-form-field-appearance-outline .mat-form-field-outline {
      border-radius: 10px;
    }

    .custom-select .mat-select-value {
      color: #333 !important;
    }

    .custom-select .mat-select-trigger {
      border-radius: 8px !important;
      background: rgba(255, 255, 255, 0.9) !important;
      transition: all 0.3s ease !important;
    }

    .custom-select:hover .mat-select-trigger {
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      transform: translateY(-1px) !important;
    }

    .custom-select.mat-focused .mat-select-trigger {
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
    }

    .mat-select-panel {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
      border-radius: 16px !important;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
      border: 2px solid rgba(102, 126, 234, 0.2) !important;
      margin-top: 8px !important;
      overflow: hidden !important;
    }

    .mat-option {
      color: #2c3e50 !important;
      font-weight: 500 !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      border-radius: 8px !important;
      margin: 4px 8px !important;
      position: relative !important;
      overflow: hidden !important;
    }

    .mat-option::before {
      content: '' !important;
      position: absolute !important;
      top: 0 !important;
      left: -100% !important;
      width: 100% !important;
      height: 100% !important;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent) !important;
      transition: left 0.5s ease !important;
    }

    .mat-option:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      transform: translateX(8px) scale(1.02) !important;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
    }

    .mat-option:hover::before {
      left: 100% !important;
    }

    .mat-option.mat-selected {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 700 !important;
      transform: translateX(4px) !important;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }

    .submit-button {
      flex: 1;
      height: 50px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      border: none;
      transition: all 0.3s ease;
    }

    .submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .submit-button:disabled {
      background: #ccc;
      transform: none;
      box-shadow: none;
    }

    .cancel-button {
      height: 50px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      background: #f44336;
      color: white;
      border: none;
      transition: all 0.3s ease;
    }

    .cancel-button:hover {
      background: #d32f2f;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(244, 67, 54, 0.3);
    }

    @media (max-width: 768px) {
      .create-bug-container {
        padding: 10px;
      }
      
      .create-bug-card {
        padding: 30px 20px;
      }
      
      .form-row {
        flex-direction: column;
        gap: 20px;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .logo h2 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class CreateBugComponent {
  bugForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private bugService: BugService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bugForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['medium', [Validators.required]],
      status: ['open', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.bugForm.valid) {
      this.isLoading = true;
      
      console.log('Creating bug with data:', this.bugForm.value);
      
      // Add current user as reporter (remove project for now)
      const bugData = {
        title: this.bugForm.value.title,
        description: this.bugForm.value.description,
        priority: this.bugForm.value.priority,
        status: this.bugForm.value.status
      };
      
      console.log('Sending bug data:', bugData);
      
      this.bugService.createBug(bugData).subscribe({
        next: (response) => {
          console.log('Bug created successfully:', response);
          this.snackBar.open('Bug created successfully!', 'Close', { duration: 3000 });
          // Navigate to dashboard and force refresh
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Bug creation error:', error);
          let errorMessage = 'Failed to create bug';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
