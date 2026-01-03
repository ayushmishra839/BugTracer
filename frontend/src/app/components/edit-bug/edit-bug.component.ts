import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-edit-bug',
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
    <div class="edit-bug-background">
      <div class="animated-particles">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
      </div>
      
      <div class="edit-bug-container">
        <div class="edit-bug-card">
          <div class="edit-bug-header">
            <div class="header-image">
              <div class="bug-icon-large">🔧</div>
            </div>
            <div class="header-text">
              <h2>Edit Bug</h2>
              <p>Update bug details and status</p>
            </div>
          </div>
          
          <form [formGroup]="bugForm" (ngSubmit)="onSubmit()" class="edit-bug-form" *ngIf="!isLoading">
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
                      [disabled]="bugForm.invalid || isSubmitting" 
                      class="submit-button">
                <span *ngIf="!isSubmitting">💾 Update Bug</span>
                <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
              </button>
              
              <button mat-raised-button color="accent" type="button" 
                      (click)="closeBug()" 
                      class="close-button"
                      [disabled]="isSubmitting">
                🔒 Close Bug
              </button>
              
              <button mat-stroked-button type="button" 
                      (click)="cancel()" 
                      class="cancel-button">
                ❌ Cancel
              </button>
            </div>
          </form>

          <div class="loading-spinner" *ngIf="isLoading">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Loading bug details...</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .edit-bug-background {
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

    .edit-bug-container {
      width: 100%;
      max-width: 600px;
      padding: 20px;
      position: relative;
      z-index: 2;
    }

    .edit-bug-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      position: relative;
      overflow: hidden;
    }

    .edit-bug-card::before {
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

    .edit-bug-header {
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

    .edit-bug-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
      z-index: 1;
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

    .mat-option:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      transform: translateX(8px) scale(1.02) !important;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
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
      flex-wrap: wrap;
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
      color: white;
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

    .close-button {
      height: 50px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      background: linear-gradient(45deg, #4caf50, #45a049);
      color: white;
      border: none;
      transition: all 0.3s ease;
    }

    .close-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
    }

    .cancel-button {
      height: 50px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      background: transparent;
      color: #667eea;
      border: 2px solid #667eea;
      transition: all 0.3s ease;
    }

    .cancel-button:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }

    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
    }

    .loading-spinner p {
      margin-top: 20px;
      color: #667eea;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .edit-bug-container {
        padding: 10px;
      }
      
      .edit-bug-card {
        padding: 30px 20px;
      }
      
      .form-row {
        flex-direction: column;
        gap: 20px;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .header-text h2 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class EditBugComponent implements OnInit {
  bugForm: FormGroup;
  isLoading = true;
  isSubmitting = false;
  bugId: string = '';

  constructor(
    private fb: FormBuilder,
    private bugService: BugService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.bugForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['medium', [Validators.required]],
      status: ['open', [Validators.required]]
    });
  }

  ngOnInit() {
    this.bugId = this.route.snapshot.paramMap.get('id')!;
    this.loadBug();
  }

  loadBug() {
    this.bugService.getBug(this.bugId).subscribe({
      next: (bug) => {
        this.bugForm.patchValue({
          title: bug.title,
          description: bug.description,
          priority: bug.priority,
          status: bug.status
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to load bug', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit() {
    if (this.bugForm.valid) {
      this.isSubmitting = true;
      
      this.bugService.updateBug(this.bugId, this.bugForm.value).subscribe({
        next: () => {
          this.snackBar.open('Bug updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to update bug', 'Close', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    }
  }

  closeBug() {
    this.bugForm.patchValue({ status: 'closed' });
    this.onSubmit();
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
