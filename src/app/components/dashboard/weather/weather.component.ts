import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  template: `
    <div class="weather" *ngIf="weather">
      <h3>WEATHER & SITE CONDITIONS</h3>
      <div class="current-weather">
        <div class="weather-icon">
          <span class="material-icons">wb_cloudy</span>
        </div>
        <div class="weather-info">
          <h2>{{weather.temperature}}°C</h2>
          <p>{{weather.condition}}</p>
          <p class="humidity">Humidity: {{weather.humidity}}%</p>
        </div>
      </div>
      <div class="forecast">
        <div class="forecast-day" *ngFor="let day of weather.forecast">
          <span class="day">{{day.day}}</span>
          <span class="material-icons" [class]="getForecastIcon(day.condition)">
            {{getForecastIcon(day.condition)}}
          </span>
          <span class="temp">{{day.temp}}°C</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .weather {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .current-weather {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        .weather-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #FFB300, #FFA000);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          .material-icons {
            font-size: 3rem;
            color: white;
          }
        }
        .weather-info {
          h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #333;
            margin: 0;
          }
          p {
            font-size: 1rem;
            color: #666;
            margin: 0.25rem 0 0 0;
            &.humidity {
              font-size: 0.85rem;
            }
          }
        }
      }
      .forecast {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
        .forecast-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: #F8F9FA;
          border-radius: 8px;
          .day {
            font-size: 0.85rem;
            font-weight: 600;
            color: #666;
          }
          .material-icons {
            font-size: 1.5rem;
            color: #FFB300;
          }
          .temp {
            font-size: 0.9rem;
            font-weight: 600;
            color: #333;
          }
        }
      }
    }
  `]
})
export class WeatherComponent {
  @Input() weather: Weather | null = null;

  getForecastIcon(condition: string): string {
    const icons: { [key: string]: string } = {
      'Sunny': 'wb_sunny',
      'Cloudy': 'wb_cloudy',
      'Rainy': 'umbrella',
      'Partly Cloudy': 'wb_cloudy'
    };
    return icons[condition] || 'wb_sunny';
  }
}
