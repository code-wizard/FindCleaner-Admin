import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(private genServ: GeneralService) { }

  ngOnInit() {
  }

  handleUpdate() {
    this.genServ.sweetAlertUpdates('Users');
  }

  handleDelete() {
    this.genServ.sweetAlertDeletions('User');
  }



}
