import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'lib-d3-line-chart',
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class D3LineChartComponent implements OnInit {
  constructor(private readonly elementRef: ElementRef) {}
  ngOnInit(): void {
    // Initialize D3.js chart within the component's native element
    const svg = d3.select(this.elementRef.nativeElement).select('.chart')
      .append('svg')
      .attr('width', 400)
      .attr('height', 200)
      .append('circle')
      .attr('cx', 200)
      .attr('cy', 100)
      .attr('r', 50)
      .style('fill', 'red');
  }
}
