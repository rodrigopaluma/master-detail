import { Component, OnInit, Input } from '@angular/core';

interface BreadCrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array<any> = [];

  constructor() { }

  ngOnInit() {
    //this.isTheLastItem(this.items[0]);
  }

  isTheLastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item);
    return index + 1 === this.items.length;
  }

}
