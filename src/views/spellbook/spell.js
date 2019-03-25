import React, { Component } from 'react';

var spell;


class Spell extends Component {
  componentWillMount() {
    spell = this.props.spells.filter(spell => spell.index == this.props.match.params.spellId)[0];
    console.log(this.props.match.params);
  }

  ordinalMap(number) {
    if(number == 1) return 'st';
    if(number == 2) return 'nd';
    if(number == 3) return 'rd';
    return 'th';
  }

  spellLevelFormatter(level, school) {
    if(level == 0) {
      return `${school} cantrip`;
    }

    return `${level}${this.ordinalMap(level)}-level ${school.toLowerCase()}`;
  }

  render() {
    return (<div className="spell-container">
      <div className="spell-name">{spell.name}</div>
      <div className="spell-details">{this.spellLevelFormatter(spell.level, spell.school.name)}</div>
      <div className="spell-casting-time"><div className="inline-header">Casting Time:</div> {spell.casting_time}</div>
      <div className="spell-range"><div className="inline-header">Range:</div> {spell.range}</div>
      <div className="spell-components"><div className="inline-header">Components:</div> {spell.components}</div>
      <div className="spell-duration"><div className="inline-header">Duration:</div> {spell.duration}</div>
      <div className="spell-description">
        {spell.desc.map(entry => {
          return <div className="spell-description-line">{entry}</div>
        })}
      </div>
    </div>)
  }
}

class SpellStat extends Component {
  render() {
    return (
      <div className={this.props.class}>
        <div className="inline-header">{this.props.label}</div> {this.props.value}
      </div>
    );
  }
}

class MonsterAbility extends Component {
  render() {
    if(!this.props.name || !this.props.desc) {
      console.log("The MonsterStat component requires both a label and value!");
    }

    return (
      <div className="monster-special-ability">
        <div className="monster-special-ability-title">{this.props.name}.</div> {this.props.desc}
      </div>
    );
  }
}

export default Spell;