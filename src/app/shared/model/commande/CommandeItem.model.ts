import {CommandeDto} from './Commande.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class CommandeItemDto extends BaseDto{

    public prix: null | number;

    public quantite: null | number;

    public commande: CommandeDto ;


    constructor() {
        super();

        this.prix = null;
        this.quantite = null;
        this.commande = new CommandeDto() ;

        }

}
