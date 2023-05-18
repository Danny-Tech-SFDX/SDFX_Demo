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
     @track accounts = [];
     @track sortedBy= 'Name';
     @track sortedDirection ='ASC';


     cols = [
        { label: 'Account Name', fieldName: 'Name', type: 'text', editable: true, sortable: 'true' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' , editable: true, sortable: 'true'  },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' , editable: true, sortable: 'true' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' , editable: true, sortable: 'true' },
        { label: 'Website', fieldName: 'Website', type: 'url' , editable: true, sortable: 'true' }
    ];

     
     //function that handle the search keywords
     updateKey(event){
        this.key = event.target.value;
     }


     // Function to handle search button click
    handleSearch() {
        this.loadAccounts();
    }

    // Function to handle sorting
    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
        this.loadAccounts();
    }
   
     loadAccounts() {
        this.accounts = undefined; // Clear previous data
        this.error = undefined; // Clear previous error
    }
  // /getllAccountsSorting(String searchkey, String sortedBy, String sortedDirection)
   // @wire(getllAccountsSorting, {searchkey: '$key', sortedBy: '$sortedBy', sortedDirection: '$sortedDirection'})accounts;
     @wire(getAccounts, {searchkey: '$key'}) accounts;
    //  @wire(getAccounts, {searchkey: '$key', direction:'$sortedDirection'})
    //  wiredAccounts(result){
    //    if(result.data){
    //        this.accounts = result.data;
    //        this.error = undefined;
    //     }else if(result.error){
    //         this.error = result.error;
    //         this.data = undefined;
    //         console.log(' The error is: ' + JSON.stringify(this.error));

    //  }
    // }

    onSort(event){
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection
        // this.sortData(this.sortedBy, this.sortedDirection);
     }

     sortData(fieldName, direction){
        let parseData = JSON.parse(JSON>stringify(this.accounts));
        let keyValue = (a) =>{
            return a[fieldName];
        };
        let isReverse = direction === 'ASC' ? 1: -1;
        parseData.sort((x, y) =>{
            x = keyValue(x) ? keyValue(x): '';
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x>y) - (y>x));
        })
        this.accounts = parseData;
     }
}


   //@wire(getAccounts, {searchkey: '$key',sortedBy: '$sortedBy', sortedDirection: '$sortedDirection' }) accounts;
//    @wire(getAccounts, {searchkey: '$key'}) accounts;
    // handleSearch(){
    //     //call the Apex method
    //     getAccounts({searchkey: this.key, sortedBy: this.sortedBy, sortedDirection: this.sortedDirection})
    //     .then(result =>{
    //         this.accounts = result
    //         // this.sortedBy !== 'asc'
    //     })
    //     .catch(error=>{
    //         this.accounts = null;
    //     });
    // }
     
//   sortData(fieldName, sortDirection){
//     var data = this.accounts;
//     var keys = a => a[fieldName];
//     var reverse = sortDirection === 'asc' ? l: -l;
//     data.sort(a,b) => {
//         let valueA = keys(a) ? keys(a).toLowercase() : '';
//         let valueB = keys(b) ? keys(b).toLowercase() : '';
//         return reverse * ((valueA > valueB) -(valueB > valueA));
//     });
//     this.accounts = data
 // }



    // handleColumnSorting(event) {
    //     const { fieldName, sortDirection } = event.detail;
    //     this.sortedBy = fieldName;
    //     this.sortedDirection = sortDirection;
    // }



// const columns = [
//     { label: 'Account Name', fieldName: 'Name', type: 'text' },
//     { label: 'Industry', fieldName: 'Industry', type: 'text' },
//     { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
//     { label: 'Phone', fieldName: 'Phone', type: 'phone' },
//     { label: 'Website', fieldName: 'Website', type: 'url' }
// ];

   // accountName= '';
    // @track accountList = [];
    // columns = columns;

    // @wire(getAccounts, {actName:'$accountName'})
    // retrieveAccounts({error, data}){
    //     if(data){
    //         this.accountList = data;
    //     }
    //     else if(error){
    //         console.error('Error retrieving accounts:', error);

    //     }
    // }
    
    // handleKeyChange(event){
    //     this.accountName = event.target.value;
    // }




 //  function for the button thaat call the Apex
    // handleSearch(){
    //     //call the Apex method
    //     getAccounts({searchkey: this.key})
    //     .then(result =>{
    //         this.accounts = result
    //     })
    //     .catch(error=>{
    //         this.accounts = null;
    //     });
    // }


//   accounts = [];
//   columns = [
//     { label: 'Account Name', fieldName: 'Name', type: 'text' },
//     { label: 'Industry', fieldName: 'Industry', type: 'text' },
//     { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
//     { label: 'Phone', fieldName: 'Phone', type: 'phone' },
//     { label: 'Website', fieldName: 'Website', type: 'url' }
//   ];

//   @wire(getAccounts)
//   wiredAccounts({ error, data }) {
//     if (data) {
//       this.accounts = data;
//     } else if (error) {
//       // Handle error and display appropriate message
//       this.handleError(error)
//     }
//   }

//   handleSearch(event) {
//     const searchTerm = event.target.value.toLowerCase();
//     if (searchTerm) {
//       const filteredAccounts = this.accounts.filter(
//         (account) =>
//           account.Name.toLowerCase().includes(searchTerm) ||
//           account.Industry.toLowerCase().includes(searchTerm) ||
//           account.Phone.toLowerCase().includes(searchTerm) ||
//           account.Website.toLowerCase().includes(searchTerm)
//       );
//       this.accounts = filteredAccounts;
//     } else {
//       // Reset the account list if the search term is empty
//       this.accounts = [...this.accounts];
//     }
//   }

//   handleError(error) {
//     // Handle the error and display appropriate message
//     console.error('An error occurred while retrieving accounts:', error);
//     // Display an error toast or show an error message on the component
//   }

