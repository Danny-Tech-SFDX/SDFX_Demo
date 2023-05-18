import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createAccount from '@salesforce/apex/AccountController.createAccount'


export default class AccountList extends LightningElement {
    @track data;
    @track sortBy;
    @track sortDirection;
    @track columns;
     key;

       // Page Properties 
    pageSizeOptions = [3, 5, 7]; //Page size options
    records = []; //All records available in the data table
    columns = []; //columns information available in the data table
    totalRecords = 0; //Total no.of records
    pageSize; //No.of records to be displayed per page
    totalPages; //Total no.of pages
    pageNumber = 1; //Page number    


      // to display all accccounts and search base on single keys
    @wire(getAccounts, {searchkey: '$key'})
    accouns(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
   
       //function that handle the search keywords to @track accounts;
       updateKey(event){
        this.key = event.target.value;
     }

     //to handle pagination
     get bDisableFirst() {
        return this.pageNumber == 1;
    }

    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }


     // connectedCallback method called when the element is inserted into a document
     connectedCallback() {
        // set datatable columns info
        this.columns = [
            { label: 'Account Name', fieldName: 'Name', type: 'text', editable: true, sortable: 'true' },
            { label: 'Industry', fieldName: 'Industry', type: 'text' , editable: true, sortable: 'true'  },
            { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' , editable: true, sortable: 'true' },
            { label: 'Phone', fieldName: 'Phone', type: 'phone' , editable: true, sortable: 'true' },
            { label: 'Website', fieldName: 'Website', type: 'url' , editable: true, sortable: 'true' }
        ];
    }


      //Function to handle search button click
    handleSearch() {
        getAccounts({searchkey: this.key})
        .then(result =>{
            this.data = result;
            console.log('RESULT--> ' + JSON.stringify(result));
                    this.records = result;
                    this.totalRecords = result.length; // update total records count                 
                    this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
                    this.paginationHelper(); // call helper menthod to update pagination logic 
        })
        .catch(error=>{
            this.data = null;
            console.log('error while fetch contacts--> ' + JSON.stringify(error));
        });
    }

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }

    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }

    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }

    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }

    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }


    // function to handel pagination logic 
    paginationHelper() {
        this.data = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }

        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.data.push(this.records[i]);
        }
    }


  


    ///sorting table
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


    ///Account creation with modal 
    @track showModal = false;

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    handleSuccess() {
        this.closeModal();
        this.showToast('Success', 'Account created successfully.', 'success');
    }

    handleError(error) {
       this.showToast('Error', error.body.message, 'error');
    }

    handleSave(event) {
        const fields = event.detail.fields;
        createAccount({ account: fields })
            .then(() => {
                this.handleSuccess();
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
}


