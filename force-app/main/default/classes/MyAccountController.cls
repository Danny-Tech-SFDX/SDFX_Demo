public class MyAccountController {
    
    public List<Account> accountList {get;set;}
    
    
   // //Getter setter method
    //public List<Account> accountList;
   // public List<Account> getAccountList(){
    //    return accountList;
  //  }
  //  public void setAccountList(List<Account> accList){
  //      this.accountList= accList;
   // }
    
    public MyAccountController(){
       accountList = [Select Id, Name from Account Limit 20];
    }

}