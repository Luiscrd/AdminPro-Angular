import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HospitalServiceService } from 'src/app/services/hospital-service.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { Medics } from '../../models/medics.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styleUrls: ['./searchs.component.css']
})
export class SearchsComponent implements OnInit {

  public hopitals: Hospital[] = [];

  public medics: Medics[] = [];

  public users: User[] = [];

  public total: number = 0;

  public to: number = 0;

  public loading: boolean = true;

  public searchActive: boolean = false;

  public term: string = '';

  public noResults: boolean = true;

  constructor(

    private activatedRoute: ActivatedRoute,

    private hospitalService: HospitalServiceService,

    private fileUploadService: FileUploadService,

    private searchService: SearchsService,

  ) { }

  ngOnInit(): void {



    this.activatedRoute.params.subscribe(({ termn }) => {

      this.term = termn;

      this.searchService.searchByTerm(termn).subscribe(resp => {

        if (resp.ok) {
          this.hopitals = resp.hospitals;
          this.medics = resp.medics;
          this.users = resp.users;
        }

        this.loading = false;

        if(
          this.hopitals.length === 0
          && this.medics.length === 0
          && this.users.length === 0
        ) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }

      })

    })
  }

}
