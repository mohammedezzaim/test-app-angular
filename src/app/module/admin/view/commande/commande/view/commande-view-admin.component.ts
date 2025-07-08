import {Component, OnInit} from '@angular/core';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';
import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';


import {CommandeAdminService} from 'src/app/shared/service/admin/commande/CommandeAdmin.service';
import {CommandeDto} from 'src/app/shared/model/commande/Commande.model';
import {CommandeCriteria} from 'src/app/shared/criteria/commande/CommandeCriteria.model';

import {EtatCommandeDto} from 'src/app/shared/model/commun/EtatCommande.model';
import {EtatCommandeAdminService} from 'src/app/shared/service/admin/commun/EtatCommandeAdmin.service';
import {CommandeItemDto} from 'src/app/shared/model/commande/CommandeItem.model';
import {CommandeItemAdminService} from 'src/app/shared/service/admin/commande/CommandeItemAdmin.service';
@Component({
  selector: 'app-commande-view-admin',
  standalone: false,
  templateUrl: './commande-view-admin.component.html'
})
export class CommandeViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    commandeItems = new CommandeItemDto();
    commandeItemss: Array<CommandeItemDto> = [];

    constructor(private service: CommandeAdminService, private etatCommandeService: EtatCommandeAdminService, private commandeItemService: CommandeItemAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get etatComande(): EtatCommandeDto {
        return this.etatCommandeService.item;
    }
    set etatComande(value: EtatCommandeDto) {
        this.etatCommandeService.item = value;
    }
    get etatComandes(): Array<EtatCommandeDto> {
        return this.etatCommandeService.items;
    }
    set etatComandes(value: Array<EtatCommandeDto>) {
        this.etatCommandeService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<CommandeDto> {
        return this.service.items;
    }

    set items(value: Array<CommandeDto>) {
        this.service.items = value;
    }

    get item(): CommandeDto {
        return this.service.item;
    }

    set item(value: CommandeDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): CommandeCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
