import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  Highcharts:typeof Highcharts=Highcharts
  chartOptions={}
  constructor(){
this.chartOptions={
  chart: {
      type: 'pie'
  },
  title: {
      text: 'Employee Chart'
  },
  tooltip: {
      valueSuffix: '%'
  },
  
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  series: [
      {
          name: 'Percentage',
          colorByPoint: true,
          data: [
              {
                  name: 'Sales',
                  y: 55.02
              },
              {
                  name: 'Finance',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'IT',
                  y: 1.09
              },
              {
                  name: 'Supervisors',
                  y: 15.5
              },
              {
                  name: 'Manager',
                  y: 1.68
              }
          ]
      }
  ]
}
  }
   

}
