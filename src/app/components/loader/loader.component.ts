/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() loading: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
