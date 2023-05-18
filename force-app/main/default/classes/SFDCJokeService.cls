public with sharing class SFDCJokeService {
    public  static HttpResponse getSFDCJokeService() {
        //Joke_API endpoint metadata
        HTTPCalloutService service = new HTTPCalloutService('Joke_API');
        HttpResponse blogsAPIResponse = service.sendRequest();
        return blogsAPIResponse;

    }
    // test Api with no class created with //Joke_API endpoint metadata
    // HTTPCalloutService service = new HTTPCalloutService('Joke_API');
    //  System.debug(service.getRequest());
    //  System.debug(service.getRequest().getBody());

    // Developer console
    // System.debug(SFDCJokeService.getSFDCJokeService().getBody());
    
}