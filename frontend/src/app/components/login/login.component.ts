import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule
  ],
  template: `
    <div class="login-background">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <div class="logo">
              <h2>🐛 BugTracer</h2>
              <p>Bug Tracking System</p>
            </div>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>📧 Email Address</mat-label>
                <input matInput type="email" formControlName="email" required>
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>🔒 Password</mat-label>
                <input matInput type="password" formControlName="password" required>
                <mat-icon matSuffix>lock</mat-icon>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
              </mat-form-field>
            </div>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="loginForm.invalid || isLoading" 
                    class="login-button">
              <span *ngIf="!isLoading">🚀 Sign In</span>
              <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
            </button>
          </form>

          <div class="login-footer">
            <p>Don't have an account? 
              <a routerLink="/register" class="register-link">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-background {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .login-container {
      width: 100%;
      max-width: 450px;
      padding: 20px;
    }

    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .login-header {
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

    .login-form {
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

    .login-button {
      height: 50px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      border: none;
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .login-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .login-button:disabled {
      background: #ccc;
      transform: none;
      box-shadow: none;
    }

    .login-footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .login-footer p {
      color: #666;
      margin: 0;
      font-size: 0.9rem;
    }

    .register-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .register-link:hover {
      color: #764ba2;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .login-container {
        padding: 10px;
      }
      
      .login-card {
        padding: 30px 20px;
      }
      
      .logo h2 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      console.log('Login form submitted:', { email, password });
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          let errorMessage = 'Login failed';
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
