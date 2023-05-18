// This test class uses a mock callout to simulate a call to the API 
// and returns a predefined response. The test method testGetJoke() 
// calls the getJoke() method in the JokeController class and verifies 
// that the status code is 200, the Joke is not null, and the setup and
//  punchline fields are correct.

@isTest
private class JokeControllerTest {
    @isTest
    static void testGetJoke() {
        // Create a mock response for the callout
        HttpResponse res = new HttpResponse();
        res.setStatusCode(200);
        res.setBody('{"setup": "Why did the tomato turn red?", "punchline": "Because it saw the salad dressing!"}');
        res.setHeader('Content-Type', 'application/json');
        
        // Create a mock for the callout
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://official-joke-api.appspot.com/random_joke');
        req.setMethod('GET');
        
        // Stub the callout
        Test.setMock(HttpCalloutMock.class, new JokeMock(req, res));
        
        // Call the method to be tested
        JokeController.Joke joke = JokeController.getJoke();
        
        // Verify the response
        System.assertEquals(200, res.getStatusCode(), 'Invalid status code');
        System.assertNotEquals(null, joke, 'Joke is null');
        System.assertEquals('Why did the tomato turn red?', joke.setup, 'Invalid setup');
        System.assertEquals('Because it saw the salad dressing!', joke.punchline, 'Invalid punchline');
    }
    
    // Inner class for creating the mock callout
    private class JokeMock implements HttpCalloutMock {
        HttpRequest req;
        HttpResponse res;
        
        public JokeMock(HttpRequest req, HttpResponse res) {
            this.req = req;
            this.res = res;
        }
        
        public HttpResponse respond(HttpRequest req) {
            return res;
        }
    }
}