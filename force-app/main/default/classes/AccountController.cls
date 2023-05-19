public with sharing class AccountController {

    //final account list
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchkey) {
         String searchString = '%'+ searchkey +'%';
        return [SELECT id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name like:searchString];
        //return [SELECT id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name like: '%'+ searchkey +'%'];
    }



    @AuraEnabled
    public static void createAccount(Account account) {
        try {
            insert account;
            if (account.Id == null) {
                throw new AuraHandledException('Failed to create account.');
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


}


