// import { LightningElement, track, wire } from 'lwc';
// import getFilteredAccounts from '@salesforce/apex/AccountController.getFilteredAccounts'
// const PAGE_SIZE = 10;

// export default class AccountList extends LightningElement {
//   @track accounts = [];
//   @track columns = [
//     { label: 'Account Name', fieldName: 'Name', type: 'text' },
//     { label: 'Industry', fieldName: 'Industry', type: 'text' },
//     { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
//     { label: 'Phone', fieldName: 'Phone', type: 'phone' },
//     { label: 'Website', fieldName: 'Website', type: 'url' }
//   ];
//   @track searchKeyword = '';
//   @track pageNumber = 1;
//   @track sortBy = 'Name';
//   @track sortDirection = 'asc';
//   @track selectedRows = [];
//   @track showModal = false;
//   @track loadMoreStatus = '';

//   @wire(getFilteredAccounts, { searchKeyword: '$searchKeyword', pageNumber: '$pageNumber', pageSize: PAGE_SIZE, sortBy: '$sortBy', sortDirection: '$sortDirection' })
//   wiredAccounts({ error, data }) {
//     if (data) {
//       this.accounts = data;
//       this.loadMoreStatus = data.length === PAGE_SIZE ? 'loadMore' : 'done';
//     } else if (error) {
//       // Handle error and display appropriate message
//     }
//   }

//   handleSearch(event) {
//     this.searchKeyword = event.target.value;
//     this.pageNumber = 1;
//   }

//   handleSort(event) {
//     this.sortBy = event.detail.fieldName;
//     this.sortDirection = event.detail.sortDirection;
//     this.pageNumber = 1;
//   }

//   handleRowAction(event) {
//     // Handle row action, e.g., edit or delete
//   }

//   handleRowSelection(event) {
//     this.selectedRows = event.detail.selectedRows;
//   }

//   handleLoadMore() {
//     this.pageNumber += 1;
//   }

//   handleCreateAccount() {
//     this.showModal = true;
//   }

//   handleModalClose() {
//     this.showModal = false;
//   }
// }




import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import getllAccountsSorting from '@salesforce/apex/AccountController.getllAccountsSorting'
// const COLS = [
//     { label: 'Account Name', fieldName: 'Name', type: 'text', editable: true, sortable: 'true' },
//     { label: 'Industry', fieldName: 'Industry', type: 'text' , editable: true, sortable: 'true'  },
//     { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' , editable: true, sortable: 'true' },
//     { label: 'Phone', fieldName: 'Phone', type: 'phone' , editable: true, sortable: 'true' },
//     { label: 'Website', fieldName: 'Website', type: 'url' , editable: true, sortable: 'true' }
// ];


export default class AccountList extends LightningElement {
    //display accounts
     key;
     @track accounts;
       //function that handle the search keywords
       updateKey(event){
        this.key = event.target.value;
     }

      //Function to handle search button click
    handleSearch() {
        getAccounts({searchkey: this.key})
        .then(result =>{
            this.accounts = result;
        })
        .catch(error=>{
            this.accounts = null;
        });
    }



     cols = [
        { label: 'Account Name', fieldName: 'Name', type: 'text' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency'  },
        { label: 'Phone', fieldName: 'Phone', type: 'phone'  },
        { label: 'Website', fieldName: 'Website', type: 'url'  }
    ];

     


    
  
   
 

    // @wire(getAccounts, {searchkey: '$key'}) accounts;





}





 
 
