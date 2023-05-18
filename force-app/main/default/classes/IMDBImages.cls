// public with sharing class IMDBImages {

//     @AuraEnabled(cacheable=true)
//     public static HttpResponse makeGetCallout() {
//         HttpRequest req = new HttpRequest();
//         req.setMethod('GET');
//         req.setEndpoint('https://imdb8.p.rapidapi.com');
//         req.setHeader('X-Rapidapi-Key', '18791e0eedmsh0b4d464191768d3p1a52a9jsn29ec0f1b599c');
//         req.setHeader('X-Rapidapi-Host', 'imdb8.p.rapidapi.com');
//         req.setHeader('Host', 'imdb8.p.rapidapi.com');
//         Http http = new Http();
//         HttpResponse res = http.send(req);
//         result = JSON.deserializeUntyped(res.getBody());
//         return result;
//     }
   
//     }



    ///////

    public with sharing class IMDBImages {
       
    
    
       @AuraEnabled  
      public static string makeGetCallout(String tconst, String limited) {
      
            try { 

                Http http = new Http();
                HttpRequest req = new HttpRequest();
                req.setEndpoint('https://imdb8.p.rapidapi.com/title/get-images?tconst=' + tconst + '&limit=' + limited);
                req.setHeader('X-RapidAPI-Key', '18791e0eedmsh0b4d464191768d3p1a52a9jsn29ec0f1b599c');
                req.setHeader('X-RapidAPI-Host', 'imdb8.p.rapidapi.com');
                req.setHeader('Host', 'imdb8.p.rapidapi.com');
               
                req.setMethod('GET');
                HttpResponse resp = http.send(req);
                //System.debug('the status code is =====>: ' + resp);
                System.debug(resp.getBody());
                return resp.getBody();
                
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }    
        }
    }