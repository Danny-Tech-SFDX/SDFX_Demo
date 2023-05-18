public class AccountUtility {
    
    
    public static void viewAnnualRevenue(){
        List<Account> accountsList = new List<Account>();
        
        accountsList = [SELECT Id, Name, AnnualRevenue FROM Account];
        
        for(Account acc : accountsList){
            String acctRev = acc.Name + ' : ' +  acc.AnnualRevenue;
            System.debug(acctRev);
            
        }
    }

}