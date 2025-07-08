import {EtatCommandeDto} from '../commun/EtatCommande.model';
import {CommandeItemDto} from './CommandeItem.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class CommandeDto extends BaseDto{

    public code: string;

    public total: null | number;

    public totalPayer: null | number;

   public dateCommande: Date;

    public etatComande: EtatCommandeDto ;
     public commandeItems: Array<CommandeItemDto>;


    constructor() {
        super();

        this.code = '';
        this.total = null;
        this.totalPayer = null;
        this.dateCommande = null;
        this.etatComande = new EtatCommandeDto() ;
        this.commandeItems = new Array<CommandeItemDto>();

        }

}
