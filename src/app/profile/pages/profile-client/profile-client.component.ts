import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../model/client';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  client: Client = new Client();
  
  constructor(private route: ActivatedRoute, private newProfileEService: ProfileService, public router: Router) { }

  ngOnInit(): void {
    this.getProfiles()
  }

  getProfiles() {
    this.newProfileEService.getClient(this.route.snapshot.paramMap.get('id')).subscribe( (response: any) => {
      this.client = response;
    })
  }
}
