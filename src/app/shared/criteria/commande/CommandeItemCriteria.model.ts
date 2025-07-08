import {CommandeCriteria} from './CommandeCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class CommandeItemCriteria extends BaseCriteria {

    public id: number;
     public prix: number;
     public prixMin: number;
     public prixMax: number;
     public quantite: number;
     public quantiteMin: number;
     public quantiteMax: number;
  public commande: CommandeCriteria ;
  public commandes: Array<CommandeCriteria> ;

}
