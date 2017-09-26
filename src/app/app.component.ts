import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myAwesomeAnimation', [

      state('small', style({
        transform: 'scale(1)'
      })),
      state('large', style({
        transform: 'scale(1.5)'
      })),

      transition('small <=> large', animate('100ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(35%)', offset: .5}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1})
      ])))
    ])
  ]
})


export class AppComponent {
  constructor(private http: HttpClient, private dataService: DataService, public sanitizer: DomSanitizer, private modalService: NgbModal) {}

  title = 'Getting JSON Data from a Restful API';
  contacts = [];

  // Sorting column
  sortColumn = 'users';
  reverseSort = false;
  message = '';
  closeResult: string;
  state: string;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.reloadContacts();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  reloadContacts() {
    this.http.get('https://obscure-ravine-82253.herokuapp.com/api/listContacts').subscribe(data => {
      for (const key in data) {
        if (key) {
          this.contacts.push(data[key]);
        }
      }
    });
  }

  clearMessage() {
    this.message = '';
  }

  sortData(column) {
    this.reverseSort = (this.sortColumn === column) ? !this.reverseSort : false;
    this.sortColumn = column;

    console.log('[sort-column]: ' + this.sortColumn);
  }

  // Arrow Up and Down for sortColumn
  getSortClass(column) {
    if (this.sortColumn === column) {
        return this.reverseSort ? 'glyphicon glyphicon-arrow-down' : 'glyphicon glyphicon-arrow-up';
    }
    return '';
  }

  displayUserDetails(username) {
    console.log('[username]: ' + username);
  }

  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
    console.log('[state]: ' + this.state);
  }
}
