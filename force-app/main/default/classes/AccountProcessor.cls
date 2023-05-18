public without sharing class AccountProcessor {
    
    @future
    public static void countContacts(List<Id> danIDs){
        List<Account> exAccounts = [Select id, (Select id from Contacts) from Account where id IN :danIDs];
        //itteration to select the account to update the number of contacts
        for (Account acc: exAccounts){
            acc.Number_Of_Contacts__c = acc.Contacts.size();
        }
        update exAccounts;
        
    }

}