import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

var monsterTypes, challengeRatings;

class Bestiary extends Component {
  componentWillMount() {
    this.buildInitialData();
  }

  buildInitialData() {
    monsterTypes = Array.from(new Set(this.props.monsters.map(mon => mon.type))).sort();
    challengeRatings = Array.from(new Set(this.props.monsters.map(mon => mon.challenge_rating))).sort(function(a,b){return a-b});
  }

  setTypeFilter(type) {
    this.setState({
      typeFilter: type
    });
  }

  setChallengeFilter(cr) {
    this.setState({
      crFilter: cr
    });
  }

  render() {
    return (<div>
      <div className="bestiary-header">D&D 5e Bestiary</div>
      <div className="monster-types-container">
        {monsterTypes.map(type => {
          return <a onClick={() => this.setTypeFilter(type)}><div className="monster-type">{type}</div></a>
        })}
      </div>
      <div className="challenge-ratings-container">
        {challengeRatings.map(cr => {
          return <a onClick={() => this.setChallengeFilter(cr)}><div className="challenge-rating">{cr}</div></a>
        })}
      </div>
      <div className="monsters-container">
        {this.props.monsters.map(monster => {
          if(this.state && this.state.typeFilter) {
            if(monster.type !== this.state.typeFilter) {
              return null;
            }
          }
          if(this.state && this.state.crFilter) {
            if(monster.challenge_rating !== this.state.crFilter) {
              return null;
            }
          }
          return <MonsterEntry name={monster.name} id={monster.index} type={monster.type} cr={monster.challenge_rating} />
        })}
      </div>
    </div>);
  }
}

class MonsterEntry extends Component {
  render() {
    return (
      <div className="monster">
        <Link to={"/bestiary/"+this.props.id}>
          {this.props.name} [{this.props.type}, CR {this.props.cr}]
        </Link>
      </div>
    )
  }
}

export default Bestiary;