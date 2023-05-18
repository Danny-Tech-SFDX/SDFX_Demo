import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/ListControllerLwc.getAccounts';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
//import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_REVENUE from '@salesforce/schema/Account.AnnualRevenue';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';

// const COLUMNS = [
//     { label: 'Account Name', fieldName: 'Name', type: 'text', editable: true, sortable: 'true' },
//     { label: 'Industry', fieldName: 'Industry', type: 'text' , editable: true, sortable: 'true'  },
//     { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' , editable: true, sortable: 'true' },
//     { label: 'Phone', fieldName: 'Phone', type: 'phone' , editable: true, sortable: 'true' },
//     { label: 'Website', fieldName: 'Website', type: 'url' , editable: true, sortable: 'true' }
// ];

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: ACCOUNT_NAME_FIELD.fieldApiName,
        type: 'text',
        editable: 'true',
        editable: true, 
        sortable: 'true'
    },
    { 
        label: 'Industry', 
        fieldName: ACCOUNT_INDUSTRY, 
        type: 'text' , 
        editable: true, 
        sortable: 'true'  
    },
    {
        label: 'Phone',
        fieldName: ACCOUNT_PHONE_FIELD.fieldApiName,
        type: 'phone',
        editable: 'true',
        editable: true, 
        sortable: 'true'
    },    
    { 
        label: 'Website', 
        fieldName: ACCOUNT_WEBSITE.fieldApiName,
        type: 'url' , 
        editable: true, 
        sortable: 'true' 
    },
    { 
        label: 'Annual Revenue', 
        fieldName: ACCOUNT_REVENUE.fieldApiName,
         type: 'currency' ,
        editable: true, 
        sortable: 'true' 
    },
  

];

export default class CustomSearch extends LightningElement {
    key;
    @track accounts = [];

    columns = COLUMNS;


    @wire(getAccounts)
    accounts;

  
   
}
