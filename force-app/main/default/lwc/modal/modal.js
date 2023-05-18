import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const PAGE_SIZE = 10;

export default class Modal extends LightningElement {


    @track searchKey = '';
    @track currentPage = 1;
    @track columns = [
        { label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true },
        { label: 'Industry', fieldName: 'Industry', type: 'text', sortable: true },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', sortable: true },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Website', fieldName: 'Website', type: 'url' }
    ];
    
    @wire(getAccounts, { searchKey: '$searchKey' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.totalPages = Math.ceil(data.length / PAGE_SIZE);
            this.updateDisplayedAccounts();
        } else if (error) {
            this.showToast('Error', 'An error occurred while retrieving accounts', 'error');
        }
    }
    
    handleSearch(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.currentPage = 1;
        this.updateDisplayedAccounts();
    }
    
    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.sortAccounts();
        this.updateDisplayedAccounts();
    }
    
    sortAccounts() {
        let reverse = this.sortedDirection !== 'asc';
        this.accounts.sort((a, b) => {
            let valueA = a[this.sortedBy] || '';
            let valueB = b[this.sortedBy] || '';
            return reverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
        });
    }
    
    updateDisplayedAccounts() {
        let startIndex = (this.currentPage - 1) * PAGE_SIZE;
        let endIndex = startIndex + PAGE_SIZE;
        this.displayedAccounts = this.accounts.slice(startIndex, endIndex);
    }
    
    goToFirstPage() {
        this.currentPage = 1;
        this.updateDisplayedAccounts();
    }
    
    goToLastPage() {
        this.currentPage = this.totalPages;
        this.updateDisplayedAccounts();
    }
    
    goToNextPage() {
        this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
        this.updateDisplayedAccounts();
    }
    
    goToPreviousPage() {
        this.currentPage = Math.max(this.currentPage - 1, 1);
        this.updateDisplayedAccounts();
    }
    
    openModal() {
        this.showModal = true;
    }
    
    closeModal() {
        this.showModal = false;
    }
    
    handleSuccess() {
        this.closeModal();
        this.showToast('Success', 'Account created successfully', 'success');
        return refreshApex(this.accounts);
    }
    
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
    
}