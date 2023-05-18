// public with sharing class AccountController {
//     @AuraEnabled
//     public static List<Account> getFilteredAccounts(String searchKeyword, Integer pageNumber, Integer pageSize, String sortBy, String sortDirection) {
//         // Create a dynamic SOQL query based on the search keyword
//         String query = 'SELECT Id, Name, Industry, AnnualRevenue, Phone, Website FROM Account';
//         if (!String.isBlank(searchKeyword)) {
//             String sanitizedKeyword = '%' + searchKeyword.replace('\'', '\\\'').replace('%', '\\%').replace('_', '\\_') + '%';
//             query += ' WHERE Name LIKE \'' + sanitizedKeyword + '\'';
//         }
        
//         // Add sorting to the query
//         if (!String.isBlank(sortBy) && !String.isBlank(sortDirection)) {
//             query += ' ORDER BY ' + sortBy + ' ' + sortDirection + ' NULLS LAST';
//         }
        
//         // Calculate the starting row of the page
//         Integer startRow = (pageNumber - 1) * pageSize;
        
//         // Execute the query with pagination
//         return Database.query(query + ' LIMIT ' + pageSize + ' OFFSET ' + startRow);
//     }
// }
public with sharing class AccountController {

    //final account list
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchkey) {
        // String searchString = '%'+ searchkey +'%';
        // return [SELECT id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name like:searchString];
        return [SELECT id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name like: '%'+ searchkey +'%'];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getllAccountsSorting(String searchkey, String sortedBy, String sortedDirection) {
        String searchString = '%'+ searchkey +'%';
        String sortField = 'Name'; // Default sort field
        String sortOrder = 'ASC'; // Default sort order
        String query;
        // Check if sort parameters are provided and update sort field and order accordingly
        if (!String.isBlank(sortedBy) && !String.isBlank(sortedDirection)) {
            sortField = sortedBy;
            sortOrder = sortedDirection;
        }

        query = 'SELECT Id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name LIKE :searchString ';
        query += 'ORDER BY ' + sortedBy + '' + sortedDirection;
        return Database.query(query);
        
    }





    // public static List<Account> getAccounts(String searchkey, String sortedBy, String sortedDirection ) {
    //     String searchString = '%'+ searchkey +'%';
    //     String sortField = 'Name'; // Default sort field
    //     String sortOrder = 'ASC'; // Default sort order

    //     // Check if sort parameters are provided and update sort field and order accordingly
    //     if (!String.isBlank(sortedBy) && !String.isBlank(sortedDirection)) {
    //         sortField = sortedBy;
    //         sortOrder = sortedDirection;
    //     }
    //     //return [SELECT id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name like:searchString ];
    //     String query = 'SELECT Id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name LIKE :searchString ';
    //     query += 'ORDER BY ' + sortField + ' ' + sortOrder;

    //     return Database.query(query);
    // }
    // public static List<Account> getAccounts(String searchkey, String sortedBy, String sortedDirection) {
    //     String searchString = '%' + searchkey + '%';
    //     String sortField = 'Name'; // Default sort field
    //     String sortOrder = 'ASC'; // Default sort order

    //     // Check if sort parameters are provided and update sort field and order accordingly
    //     if (!String.isBlank(sortedBy) && !String.isBlank(sortedDirection)) {
    //         sortField = sortedBy;
    //         sortOrder = sortedDirection;
    //     }

    //     // Build the dynamic SOQL query with search and sorting parameters
    //     String query = 'SELECT Id, Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name LIKE :searchString ';
    //     query += 'ORDER BY ' + sortField + ' ' + sortOrder;

    //     return Database.query(query);
    // }
}
