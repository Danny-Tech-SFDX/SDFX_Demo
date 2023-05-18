import { LightningElement, track } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getJoke from '@salesforce/apex/AppJokes.getJoke';

export default class JokeData extends LightningElement {
    ampm = false;
    @track boolVisible = false;
    setupData; punchlineData;

    connectedCallback(){
        
            getJoke({}).then((response)=>{
                var jokeData = JSON.parse(response);
                this.setupData = jokeData.setup;
                this.punchlineData = jokeData.punchline;
                // if (jokeData == '') {
                //     this.boolVisible = true;
                // } else {
                //     this.boolVisible = false;
                //     this.setupData = jokeData[0].setup;
                //     this.punchlineData = jokeData[0].punchline;
                // }
    
            })

        

    

    }
   


}