import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { User } from '../_models/user';
import { Answer } from '../_models/answer';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  private userValue: any;
  @Input()
  get user(): User {
    return this.userValue;
  }
  @Output() userChange = new EventEmitter<User>();
  set user(val: User) {
    this.userValue = val;
    this.userChange.emit(this.userValue);
  }

  private answersValue: Answer[];
  @Input()
  get answers(): Answer[] {
    return this.answersValue;
  }
  @Output() answersChange = new EventEmitter<Answer[]>();
  set answers(val: Answer[]) {
    if (this.answersValue === undefined) {
      this.answersValue = val;
    } else {
      Object.keys(val).forEach((prop) => {
        this.answersValue[prop] = val[prop];
      });
    }
    this.answersChange.emit(this.answersValue);
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabelsProp: Label[] = [
    'exatas', 
    'biologicas', 
    // 'engenhariatecnologia', 
    'saude', 
    // 'agrarias', 
    // 'sociais', 
    'humanas', 
    // 'linguistica', 
    // 'letras', 
    'artes',
    'comunicacao'
  ];
  barChartLabels: Label[] = [
    'Ciências Exatas', 
    'Ciências Biologicas', 
    // 'ENGENHARIA / TECNOLOGIA', 
    'Saúde', 
    // 'CIÊNCIAS AGRÁRIAS', 
    // 'CIÊNCIAS SOCIAIS', 
    'Ciências Humanas', 
    // 'LINGUISTICA', 
    // 'LETRAS', 
    'Artes',
    'Comunicação e Expressão'
   ];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0/*, 0, 0, 0, 0*/] }
  ];

  get maxValue(): string {
    const max = Math.max(...(this.barChartData[0].data as number[]));
    const result = [];
    (this.barChartData[0].data as number[]).map((v, i) => {
      if (v === max) {
        result.push(i);
      }
    });
    let labels = '';
    result.forEach((v) => {
      if (labels !== '') {
        labels += ' e '
      }
      labels += this.barChartLabels[v];
    })
    return labels;
  }

  constructor() { }

  ngOnInit() {
    this.answersValue.forEach((answer) => {
      this.barChartLabelsProp.forEach((v: string, i: number) => {
        this.barChartData[0].data[i] += answer[v];
      });
    });
  }

}
