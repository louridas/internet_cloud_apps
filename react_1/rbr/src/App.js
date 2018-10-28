import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'Infinite Jest',
    url: 'https://en.wikipedia.org/wiki/Infinite_Jest',
    author: 'David Foster Wallace',
    year_published: 1996,
    id: 0
  },
  {
    title: 'Ulysses',
    url: 'https://en.wikipedia.org/wiki/Ulysses_(novel)',
    author: 'James Joyce',
    year_published: 1922,
    id: 1
  },
  {
    title: 'City on Fire',
    url: 'https://en.wikipedia.org/wiki/City_on_Fire_(Hallberg_novel)',
    author: 'Garth Risk Hallbert',
    year_published: 2015,
    id: 3
  },
  {
    title: 'The Narrow Way to the Deep North',
    url: 'https://en.wikipedia.org/wiki/The_Narrow_Road_to_the_Deep_North_(novel)',
    author: 'Richard Flanagan',
    year_published: 2013,
    id: 4
  },
  {
    title: 'The Dispossessed',
    url: 'https://en.wikipedia.org/wiki/The_Dispossessed',
    author: 'Ursula Le Guin',
    year_published: 1974,
    id: 5
  },
  {
    title: 'A Death in the Family: My Struggle Book 1',
    url: 'https://en.wikipedia.org/wiki/My_Struggle_(Knausg%C3%A5rd_novels)',
    author: 'Karl Ove Knausgård',
    year_published: 2009,
    id: 6
  },
  {
    title: 'Conversations with Friends',
    url: 'https://en.wikipedia.org/wiki/Conversations_with_Friends',
    author: 'Sally Rooney',
    year_published: 2017,
    id: 7
  },      
  {
    title: 'La Septième Fonction du Langage',
    url: 'https://fr.wikipedia.org/wiki/La_Septi%C3%A8me_Fonction_du_langage',
    author: 'Laurent Binet',
    year_published: '2015',
    id: 8,
  },
  {
    title: 'La Vérité sur l\' Affaire Harry Quebert',
    url: 'https://fr.wikipedia.org/wiki/La_V%C3%A9rit%C3%A9_sur_l%27affaire_Harry_Quebert',
    author: 'Joël Dicker',
    year_published: 2012,
    id: 9
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
	{list.map(item =>
	    <div key={item.id}>
	      <span>
		<a href={item.url}>{item.title}</a>:
	      </span>
	      &nbsp;
	      <span>{item.author}</span>
	      &nbsp;Year Published:
	      <span>{item.year_published}</span>
	    </div>
	)}
      </div>
    );
  }
}

export default App;
