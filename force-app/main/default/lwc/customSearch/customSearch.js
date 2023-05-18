import { LightningElement, api, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/ListControllerLwc.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
// //import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
// import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
// import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
// import ACCOUNT_REVENUE from '@salesforce/schema/Account.AnnualRevenue';
// import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name', type: 'text', editable: true, sortable: 'true' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' , editable: true, sortable: 'true'  },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' , editable: true, sortable: 'true' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' , editable: true, sortable: 'true' },
    { label: 'Website', fieldName: 'Website', type: 'url' , editable: true, sortable: 'true' }
];



export default class CustomSearch extends LightningElement {
   

    @track data;
    @track columns = COLUMNS;
    // @wire(getAccounts)
    // accounts;

    key;
   // @track accounts;
      //function that handle the search keywords
      updateKey(event){
       this.key = event.target.value;
    }

     //Function to handle search button click
   handleSearch() {
       getAccounts({searchkey: this.key})
       .then(result =>{
           this.data = result;
       })
       .catch(error=>{
           this.data = null;
       });
   }








    @wire(getAccounts)
    accouns(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    @track data;
    @track sortBy;
    @track sortDirection;

    updateKey(event){
        this.key = event.target.value;
     }
    

    
    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }

    ///modal to create account
    @track showModal = false;
    @api refreshTable;

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    handleSuccess() {
        this.closeModal();
        // Perform any necessary actions after successful account creation
        // const accountId = event.detail.id;
        // this.refreshTable(accountId); // Call the parent component's method to refresh the datatable
        // this.showToast('Success', 'Account Created', 'success');
    }
    
    // //handle error
    // handleError(error) {
    //     this.closeModal();

    //     let errorMessage = 'Unknown error';
    //     if (error && error.body && error.body.message) {
    //         errorMessage = error.body.message;
    //     }

    //     this.showToast('Error', errorMessage, 'error');
    // }

    // showToast(title, message, variant) {
    //     const event = new ShowToastEvent({
    //         title: title,
    //         message: message,
    //         variant: variant
    //     });
    //     this.dispatchEvent(event);
    // }

    // createAccount(recordInput) {
    //     return createAccount({ account: recordInput })
    //         .then(result => {
    //             this.handleSuccess(result);
    //         })
    //         .catch(error => {
    //             this.handleError(error);
    //         });
    // }
   
}
