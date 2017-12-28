import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

    @Input() primaryColor: string = '#dc3545';
    @Input() altColor: string = '#000'; 
    @Input() size: string = '128px';
    @Input() padding: string = '100px'; 

  constructor() { }

  ngOnInit() {
  }

}
