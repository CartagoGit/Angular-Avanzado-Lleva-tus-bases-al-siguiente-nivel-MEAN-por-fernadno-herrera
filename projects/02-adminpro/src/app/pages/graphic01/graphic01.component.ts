import { Component } from '@angular/core';
import { GraphicProps } from '../../interfaces/graphic-props';

@Component({
  selector: 'app-graphic01',
  templateUrl: './graphic01.component.html',
  styles: [],
})
export class Graphic01Component {
  public examples: GraphicProps[] = [
    //EXAMPLE 1
    {
      title: 'Sales',
      type: 'doughnut',
      labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
      datasets: [
        {
          data: [350, 450, 100],
          label: 'El superior',
          backgroundColor: ['#9e120e', '#ff5800', '#ffb414'],
        },
        {
          data: [50, 150, 120],
          label: 'El intermedio',
          backgroundColor: ['#0f20d3', '#8800ff', '#14ffd0'],
        },
        { data: [250, 130, 70], label: 'El inferior' },
      ],
      options: { responsive: true },
    },
    // Example 2
    {
      title: 'Perritos Calientes',
      type: 'doughnut',
      labels: ['Veganos', 'Con Ketchup', 'Con Mostaza', 'Con Mahonesa'],
      datasets: [
        {
          data: [30, 50, 10, 50],
          label: '2023',
          backgroundColor: ['#00f853', '#04852f', '#b8ff14', '#14ffc8'],
        },

        {
          data: [210, 250, 130, 70],
          label: '2022',
          backgroundColor: ['#bdbdbd', '#5c5c5c', '#2b2b2b', , '#dddddd'],
        },
      ],
      options: { responsive: true },
    },
    // Example 3
    {
      title: 'Esta de Lineas',
      type: 'line',
      labels: ['Veganos', 'Con Ketchup', 'Con Mostaza', 'Con Mahonesa'],
      datasets: [
        {
          data: [30, 50, 10, 50],
          label: '2023',
        },

        {
          data: [210, 250, 130, 70],
          label: '2022',
        },
      ],
      options: { responsive: true },
    },
    // Example 4
    {
      title: 'Esta de radar',
      type: 'radar',
      labels: ['Veganos', 'Con Ketchup', 'Con Mostaza', 'Con Mahonesa'],
      datasets: [
        {
          data: [30, 50, 10, 50],
          label: '2023',
        },

        {
          data: [210, 250, 130, 70],
          label: '2022',
        },
      ],
      options: { responsive: true },
    },
    // Example 5
    {
      title: 'Esta de area polar',
      type: 'polarArea',
      labels: ['Veganos', 'Con Ketchup', 'Con Mostaza', 'Con Mahonesa'],
      datasets: [
        {
          data: [30, 50, 10, 50],
          label: '2023',
        },

        {
          data: [210, 250, 130, 70],
          label: '2022',
        },
      ],
      options: { responsive: true },
    },
    // Example 5
    {
      title: 'Esta de pie',
      type: 'pie',
      labels: ['Veganos', 'Con Ketchup', 'Con Mostaza', 'Con Mahonesa'],
      datasets: [
        {
          data: [30, 50, 10, 50],
          label: '2023',
        },

        {
          data: [210, 250, 130, 70],
          label: '2022',
        },
      ],
      options: { responsive: true },
    },
    // Example 6
    {
      title: 'Esta de barras',
      type: 'bar',
      labels: ['Veganos', 'Con Ketchup', 'Con Mostaza', 'Con Mahonesa'],
      datasets: [
        {
          data: [30, 50, 10, 50],
          label: '2023',
        },

        {
          data: [210, 250, 130, 70],
          label: '2022',
        },
      ],
      options: { responsive: true },
    },
  ];
}
