import { LightningElement, track } from 'lwc';

//export default class GoodJokes extends LightningElement {}

export default class GoodJokes extends LightningElement {
  @track joke;

  getJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => response.json())
      .then(data => {
        this.joke = data;
      })
      .catch(error => {
        this.joke = error;
      });
  }
}