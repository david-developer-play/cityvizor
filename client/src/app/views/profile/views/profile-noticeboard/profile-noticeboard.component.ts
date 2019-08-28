import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DataService } from 'app/services/data.service';
import { ToastService } 		from 'app/services/toast.service';

import { AppConfig } from "config/config";

@Component({
	selector: 'profile-noticeboard',
	templateUrl: 'profile-noticeboard.component.html',
	styleUrls: ['profile-noticeboard.component.scss']
})
export class ProfileNoticeboardComponent {
	
	config:any = AppConfig;

	@Input()
	set profile(profile) {
		if(profile && this.profileId !== profile.id){
			
			this.profileId = profile.id;
			
			this.mapURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://mapasamospravy.cz/embed?q[lau_id_eq]=" + profile.mapasamospravy + "#14/" + profile.gps[1] + "/" + profile.gps[0]);

			this.dataService.getProfileNoticeBoard(profile.id)
				.then(noticeBoard => this.noticeBoard = noticeBoard)
				.catch(err => this.toastService.toast("Nepodařilo se stáhnout dokumenty z úředních desek.","error"));
		}
	}
	
	profileId:any;
	
	noticeBoard:any;

	infoWindowClosed: boolean;

	mapURL: SafeResourceUrl;

	constructor(private dataService:DataService, private sanitizer:DomSanitizer, private toastService:ToastService) {
	}

}