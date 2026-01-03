import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
    <div class="landing-container">
      <!-- Animated Background with Images -->
      <div class="animated-bg">
        <div class="floating-elements">
          <div class="floating-icon icon-1">🐛</div>
          <div class="floating-icon icon-2">🔧</div>
          <div class="floating-icon icon-3">✅</div>
          <div class="floating-icon icon-4">🚀</div>
          <div class="floating-icon icon-5">💻</div>
          <div class="floating-icon icon-6">📊</div>
          <div class="floating-icon icon-7">🎯</div>
          <div class="floating-icon icon-8">⚡</div>
        </div>
        
        <!-- Animated Particles -->
        <div class="particles">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
          <div class="particle particle-5"></div>
          <div class="particle particle-6"></div>
          <div class="particle particle-7"></div>
          <div class="particle particle-8"></div>
          <div class="particle particle-9"></div>
          <div class="particle particle-10"></div>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-image">
            <div class="main-icon">🐛</div>
            <div class="orbit-ring ring-1"></div>
            <div class="orbit-ring ring-2"></div>
          </div>
          
          <div class="hero-text">
            <h1 class="main-title animate-title">
              BugTracer
            </h1>
            <div class="title-underline animate-underline"></div>
            <p class="hero-subtitle animate-subtitle">
              Professional Bug Tracking System for Modern Development Teams
            </p>
            
            <div class="hero-buttons animate-buttons">
              <button mat-raised-button class="cta-button primary" routerLink="/register">
                <mat-icon>rocket_launch</mat-icon>
                Get Started Free
              </button>
              <button mat-stroked-button class="cta-button secondary" routerLink="/login">
                <mat-icon>login</mat-icon>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <h2 class="section-title animate-fade-in">Powerful Features</h2>
        
        <div class="features-grid">
          <div class="feature-card animate-scale-in" *ngFor="let feature of features; let i = index" [style.animation-delay]="i * 0.1 + 's'">
            <div class="feature-icon-container">
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="icon-glow"></div>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <div class="feature-decoration"></div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-item animate-count-up" *ngFor="let stat of stats; let i = index" [style.animation-delay]="i * 0.2 + 's'">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-glow"></div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content animate-fade-in">
          <div class="cta-image">
            <div class="cta-icon">🎯</div>
          </div>
          <h2>Ready to Streamline Your Bug Tracking?</h2>
          <p>Join thousands of developers who trust BugTracer for their projects</p>
          <button mat-raised-button class="cta-button large" routerLink="/register">
            <mat-icon>star</mat-icon>
            Start Your Free Trial
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-logo">
            <span class="footer-icon">🐛</span>
            <span>BugTracer</span>
          </div>
          <p>&copy; 2024 BugTracer. Built with ❤️ for developers.</p>
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy</a>
            <a href="#" class="footer-link">Terms</a>
            <a href="#" class="footer-link">Support</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .landing-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
      position: relative;
    }

    /* Enhanced Animated Background */
    .animated-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .floating-icon {
      position: absolute;
      font-size: 2.5rem;
      opacity: 0.15;
      animation: float 8s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
    }

    .icon-1 { top: 5%; left: 5%; animation-delay: 0s; }
    .icon-2 { top: 15%; right: 10%; animation-delay: 1s; }
    .icon-3 { bottom: 25%; left: 15%; animation-delay: 2s; }
    .icon-4 { top: 45%; right: 5%; animation-delay: 3s; }
    .icon-5 { bottom: 15%; right: 25%; animation-delay: 4s; }
    .icon-6 { top: 25%; left: 30%; animation-delay: 5s; }
    .icon-7 { bottom: 35%; right: 35%; animation-delay: 6s; }
    .icon-8 { top: 65%; left: 10%; animation-delay: 7s; }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
      25% { transform: translateY(-15px) rotate(5deg) scale(1.1); }
      50% { transform: translateY(-25px) rotate(-5deg) scale(1.2); }
      75% { transform: translateY(-15px) rotate(3deg) scale(1.1); }
    }

    /* Particles */
    .particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
      border-radius: 50%;
      animation: particleFloat 12s ease-in-out infinite;
    }

    .particle-1 { top: 10%; left: 20%; animation-delay: 0s; }
    .particle-2 { top: 20%; right: 25%; animation-delay: 1.2s; }
    .particle-3 { bottom: 30%; left: 35%; animation-delay: 2.4s; }
    .particle-4 { top: 40%; right: 15%; animation-delay: 3.6s; }
    .particle-5 { bottom: 20%; right: 40%; animation-delay: 4.8s; }
    .particle-6 { top: 60%; left: 25%; animation-delay: 6s; }
    .particle-7 { bottom: 40%; right: 30%; animation-delay: 7.2s; }
    .particle-8 { top: 30%; left: 45%; animation-delay: 8.4s; }
    .particle-9 { bottom: 50%; right: 20%; animation-delay: 9.6s; }
    .particle-10 { top: 70%; left: 15%; animation-delay: 10.8s; }

    @keyframes particleFloat {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
      25% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
      50% { transform: translateY(-40px) scale(2); opacity: 0.8; }
      75% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
    }

    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      padding: 2rem;
    }

    .hero-content {
      display: flex;
      align-items: center;
      gap: 4rem;
      max-width: 1200px;
      text-align: center;
    }

    .hero-image {
      position: relative;
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main-icon {
      font-size: 5rem;
      z-index: 2;
      animation: mainIconPulse 3s ease-in-out infinite;
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.8));
    }

    @keyframes mainIconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .orbit-ring {
      position: absolute;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: orbit 10s linear infinite;
    }

    .ring-1 {
      width: 150px;
      height: 150px;
      animation-duration: 8s;
    }

    .ring-2 {
      width: 180px;
      height: 180px;
      animation-duration: 12s;
      animation-direction: reverse;
    }

    @keyframes orbit {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .hero-text {
      flex: 1;
    }

    .main-title {
      font-size: 4.5rem;
      font-weight: 800;
      color: white;
      margin: 0 0 1rem 0;
      background: linear-gradient(45deg, #fff, #f0f0f0, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .title-underline {
      width: 150px;
      height: 4px;
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
      margin: 1rem auto 2rem;
      border-radius: 2px;
      animation: expandWidth 2s ease-out;
    }

    @keyframes expandWidth {
      0% { width: 0; }
      100% { width: 150px; }
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 3rem;
      font-weight: 300;
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-button {
      padding: 1.2rem 2.5rem;
      font-size: 1.2rem;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      overflow: hidden;
    }

    .cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.6s ease;
    }

    .cta-button:hover::before {
      left: 100%;
    }

    .cta-button.primary {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      color: white;
      border: none;
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
    }

    .cta-button.primary:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 20px 40px rgba(255, 107, 107, 0.6);
    }

    .cta-button.secondary {
      background: transparent;
      color: white;
      border: 3px solid white;
    }

    .cta-button.secondary:hover {
      background: white;
      color: #667eea;
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 20px 40px rgba(255, 255, 255, 0.3);
    }

    .cta-button.large {
      padding: 1.8rem 3.5rem;
      font-size: 1.4rem;
    }

    /* Features Section */
    .features-section {
      padding: 5rem 2rem;
      position: relative;
      z-index: 2;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
    }

    .section-title {
      text-align: center;
      font-size: 3.5rem;
      color: white;
      margin-bottom: 4rem;
      font-weight: 700;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 25px;
      padding: 2.5rem;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      animation: shimmer 4s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .feature-card:hover {
      transform: translateY(-15px) scale(1.05);
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
    }

    .feature-icon-container {
      position: relative;
      margin-bottom: 1.5rem;
      display: inline-block;
    }

    .feature-icon {
      font-size: 4rem;
      animation: iconPulse 2s ease-in-out infinite;
      position: relative;
      z-index: 2;
    }

    @keyframes iconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .icon-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      animation: glowPulse 2s ease-in-out infinite;
    }

    @keyframes glowPulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.8; }
    }

    .feature-card h3 {
      color: white;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .feature-card p {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      font-size: 1.1rem;
    }

    .feature-decoration {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }

    .feature-card:hover .feature-decoration {
      transform: scaleX(1);
    }

    /* Animations */
    .animate-title {
      animation: titleSlideIn 1s ease-out;
    }

    @keyframes titleSlideIn {
      from { opacity: 0; transform: translateY(-50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-underline {
      animation: underlineSlideIn 1s ease-out 0.5s both;
    }

    @keyframes underlineSlideIn {
      from { opacity: 0; transform: scaleX(0); }
      to { opacity: 1; transform: scaleX(1); }
    }

    .animate-subtitle {
      animation: fadeInUp 1s ease-out 0.8s both;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-buttons {
      animation: fadeInUp 1s ease-out 1.2s both;
    }

    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }

    .animate-scale-in {
      animation: scaleIn 0.6s ease-out both;
    }

    .animate-count-up {
      animation: countUp 2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes countUp {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 1; transform: scale(1); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-content {
        flex-direction: column;
        gap: 2rem;
      }
      
      .main-title {
        font-size: 3rem;
      }
      
      .section-title {
        font-size: 2.5rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class LandingComponent {
  features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Track bugs in real-time with our ultra-responsive interface'
    },
    {
      icon: '🎯',
      title: 'Smart Prioritization',
      description: 'AI-powered bug prioritization to focus on what matters most'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with your entire development team'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Get detailed insights and reports on your bug tracking metrics'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security to keep your data safe and protected'
    },
    {
      icon: '⚡',
      title: 'Instant Notifications',
      description: 'Real-time alerts and updates for all bug activities'
    }
  ];

  stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Bugs Tracked' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];
}
