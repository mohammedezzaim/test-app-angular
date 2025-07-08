import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {CommandeAdminService} from 'src/app/shared/service/admin/commande/CommandeAdmin.service';
import {CommandeDto} from 'src/app/shared/model/commande/Commande.model';
import {CommandeCriteria} from 'src/app/shared/criteria/commande/CommandeCriteria.model';
import {EtatCommandeDto} from 'src/app/shared/model/commun/EtatCommande.model';
import {EtatCommandeAdminService} from 'src/app/shared/service/admin/commun/EtatCommandeAdmin.service';
import {CommandeItemDto} from 'src/app/shared/model/commande/CommandeItem.model';
import {CommandeItemAdminService} from 'src/app/shared/service/admin/commande/CommandeItemAdmin.service';
@Component({
  selector: 'app-commande-create-admin',
  standalone: false,
  templateUrl: './commande-create-admin.component.html'
})
export class CommandeCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    protected commandeItemsIndex = -1;

    private _commandeItemsElement = new CommandeItemDto();


   private _validCommandeCode = true;
    private _validEtatComandeLibelle = true;
    private _validEtatComandeCode = true;

	constructor(private service: CommandeAdminService , private etatCommandeService: EtatCommandeAdminService, private commandeItemService: CommandeItemAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.etatCommandeService.findAll().subscribe((data) => this.etatComandes = data);
    }



    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new CommandeDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }

        }, error => {
            console.log(error);
        });
    }


    public hideCreateDialog() {
        this.createDialog = false;
        this.setValidation(true);
    }



    validateCommandeItems(){
        this.errorMessages = new Array();
    }


    public  setValidation(value: boolean){
        this.validCommandeCode = value;
    }

    public addCommandeItems() {
        if( this.item.commandeItems == null )
            this.item.commandeItems = new Array<CommandeItemDto>();

       this.validateCommandeItems();

       if (this.errorMessages.length === 0) {
            if (this.commandeItemsIndex == -1){
                this.item.commandeItems.push({... this.commandeItemsElement});
            }else {
                this.item.commandeItems[this.commandeItemsIndex] =this.commandeItemsElement;
            }
              this.commandeItemsElement = new CommandeItemDto();
              this.commandeItemsIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteCommandeItems(p: CommandeItemDto, index: number) {
        this.item.commandeItems.splice(index, 1);
    }

    public editCommandeItems(p: CommandeItemDto, index: number) {
        this.commandeItemsElement = {... p};
        this.commandeItemsIndex = index;
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateCommandeCode();
    }

    public validateCommandeCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validCommandeCode = false;
        } else {
            this.validCommandeCode = true;
        }
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
    get createEtatComandeDialog(): boolean {
        return this.etatCommandeService.createDialog;
    }
    set createEtatComandeDialog(value: boolean) {
        this.etatCommandeService.createDialog= value;
    }



    get validCommandeCode(): boolean {
        return this._validCommandeCode;
    }

    set validCommandeCode(value: boolean) {
         this._validCommandeCode = value;
    }

    get validEtatComandeLibelle(): boolean {
        return this._validEtatComandeLibelle;
    }
    set validEtatComandeLibelle(value: boolean) {
        this._validEtatComandeLibelle = value;
    }
    get validEtatComandeCode(): boolean {
        return this._validEtatComandeCode;
    }
    set validEtatComandeCode(value: boolean) {
        this._validEtatComandeCode = value;
    }

    get commandeItemsElement(): CommandeItemDto {
        if( this._commandeItemsElement == null )
            this._commandeItemsElement = new CommandeItemDto();
        return this._commandeItemsElement;
    }

    set commandeItemsElement(value: CommandeItemDto) {
        this._commandeItemsElement = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): CommandeCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        if (this._errorMessages == null) {
            this._errorMessages = new Array<string>();
        }
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validate(): boolean {
        return this.service.validate;
    }

    set validate(value: boolean) {
        this.service.validate = value;
    }


    get activeTab(): number {
        return this._activeTab;
    }

    set activeTab(value: number) {
        this._activeTab = value;
    }

}
