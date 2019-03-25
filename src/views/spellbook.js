import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

var spellClasses, spellSchools, spellCastingTimes, spellLevels;

class Spellbook extends Component {
  componentWillMount() {
    this.buildInitialData();
  }

  buildInitialData() {
    // spellClasses = Array.from(new Set(this.props.spells.map(spell => spell.classes.map(s => s.name)))).sort();
    spellSchools = Array.from(new Set(this.props.spells.map(spell => spell.school.name))).sort();
    spellCastingTimes = Array.from(new Set(this.props.spells.map(spell => spell.casting_time))).sort();
    spellLevels = Array.from(new Set(this.props.spells.map(spell => spell.level))).sort(function(a,b){return a-b});
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
      <div className="spellbook-header">D&D 5e Spellbook</div>
      <div className="spells-container">
        {this.props.spells.map(spell => {
          // if(this.state && this.state.typeFilter) {
          //   if(monster.type !== this.state.typeFilter) {
          //     return null;
          //   }
          // }
          // if(this.state && this.state.crFilter) {
          //   if(monster.challenge_rating !== this.state.crFilter) {
          //     return null;
          //   }
          // }
          return <SpellEntry name={spell.name} id={spell.index} />
        })}
      </div>
    </div>);
  }
}

class SpellEntry extends Component {
  render() {
    return (
      <div className="spell">
        <Link to={"/spellbook/"+this.props.id}>
          {this.props.name}
        </Link>
      </div>
    )
  }
}

export default Spellbook;