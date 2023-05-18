public with sharing class JokeController {
    @AuraEnabled
    public static Joke getJoke() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://official-joke-api.appspot.com/random_joke');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Joke joke = (Joke) JSON.deserialize(response.getBody(), Joke.class);
            return joke;
        }
        return null;
    }
    public class Joke {
        public String setup;
        public String punchline;
    }
}