import { LightningElement, track } from 'lwc';
import getContactList from '@salesforce/apex/AccountSearch.getContactList';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class AccountSearch extends LightningElement {



    
    @track contactsRecord;
    searchValue = '';
 
    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    // call apex method on button click 
    handleSearchKeyword() {
        
        if (this.searchValue !== '') {
            getContactList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.contactsRecord = result;
                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.contactsRecord = null;
                });
        } else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}