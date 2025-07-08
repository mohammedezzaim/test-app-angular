import {EtatCommandeCriteria} from '../commun/EtatCommandeCriteria.model';
import {CommandeItemCriteria} from './CommandeItemCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class CommandeCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
     public total: number;
     public totalMin: number;
     public totalMax: number;
     public totalPayer: number;
     public totalPayerMin: number;
     public totalPayerMax: number;
    public dateCommande: Date;
    public dateCommandeFrom: Date;
    public dateCommandeTo: Date;
  public etatComande: EtatCommandeCriteria ;
  public etatComandes: Array<EtatCommandeCriteria> ;
      public commandeItems: Array<CommandeItemCriteria>;

}
