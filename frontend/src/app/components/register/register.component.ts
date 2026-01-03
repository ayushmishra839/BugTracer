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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
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
    <div class="register-background">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <div class="logo">
              <h2>🐛 BugTracer</h2>
              <p>Create Your Account</p>
            </div>
          </div>
          
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Username</mat-label>
                <input matInput formControlName="username" required placeholder="Enter username (3-20 characters)">
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
                  Username is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('username')?.hasError('minlength')">
                  Username must be at least 3 characters
                </mat-error>
                <mat-error *ngIf="registerForm.get('username')?.hasError('pattern')">
                  Username can only contain letters, numbers, and underscores
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" formControlName="email" required placeholder="Enter your email">
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('pattern')">
                  Please enter a valid email address
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Password</mat-label>
                <input matInput type="password" formControlName="password" required placeholder="Enter password (min 6 chars)">
                <mat-icon matSuffix>lock</mat-icon>
                <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                  Password must be at least 6 characters
                </mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('pattern')">
                  Password must contain uppercase, lowercase, and number
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Role</mat-label>
                <mat-select formControlName="role">
                  <mat-icon matSuffix>work</mat-icon>
                  <mat-option value="tester">Tester</mat-option>
                  <mat-option value="developer">Developer</mat-option>
                  <mat-option value="admin">Admin</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="registerForm.invalid || isLoading" 
                    class="register-button">
              <span *ngIf="!isLoading">🚀 Create Account</span>
              <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
            </button>
          </form>

          <div class="register-footer">
            <p>Already have an account? 
              <a routerLink="/login" class="login-link">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-background {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .register-container {
      width: 100%;
      max-width: 450px;
      padding: 20px;
    }

    .register-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .register-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo h2 {
      color: #333;
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 10px 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo p {
      color: #666;
      font-size: 1rem;
      margin: 0;
      font-weight: 400;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
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

    .register-button {
      height: 50px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      border: none;
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .register-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .register-button:disabled {
      background: #ccc;
      transform: none;
      box-shadow: none;
    }

    .register-footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .register-footer p {
      color: #666;
      margin: 0;
      font-size: 0.9rem;
    }

    .login-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .login-link:hover {
      color: #764ba2;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .register-container {
        padding: 10px;
      }
      
      .register-card {
        padding: 30px 20px;
      }
      
      .logo h2 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9_]{3,20}$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')]],
      role: ['tester', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      
      console.log('Register form submitted:', this.registerForm.value);
      
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.snackBar.open('Registration successful! Please login.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          let errorMessage = 'Registration failed';
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
}
