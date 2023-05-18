@isTest
public with sharing class FDCJokeServiceTest {

    public static final integer RESPONSE_CODE = 200;
    public static final String RESPONSE_BODY = '{"type":"general","setup":"Do you know where you can get chicken broth in bulk?","punchline":"The stock market.","id":1}';
    
 

    public static void getSFDCJokeService() {
        Test.startTest();
        HTTPCalloutServiceMock serviceMock = new HTTPCalloutServiceMock(RESPONSE_CODE,RESPONSE_BODY );
        Test.setMock(HttpCalloutMock.class, serviceMock);
        HttpResponse blogResponse = SFDCJokeService.getSFDCJokeService();
        System.assertEquals(RESPONSE_CODE, blogResponse.getStatusCode(), 'Response code should be 200');
        System.assertEquals(RESPONSE_BODY, blogResponse.getBody(), 'My Response  body');
        Test.stopTest();



    }
}