public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getContacts() {
        List<Contact> contactList = [
            SELECT
                Id,
                Name,
                AccountId,
                Account.Name,
                Title,
                Phone,
                Email,
                OwnerId,
                Owner.Name,
                Owner.Email
            FROM CONTACT
            WITH SECURITY_ENFORCED
        ];
        return contactList;
    }
}