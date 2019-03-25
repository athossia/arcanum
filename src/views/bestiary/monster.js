import React, { Component } from 'react';

var monster;

const savingThrowVariables = [
  "strength_save",
  "dexterity_save",
  "constitution_save",
  "wisdom_save",
  "intelligence_save",
  "charisma_save"
];

const savingThrowLabels = {
  strength_save: "Str",
  dexterity_save: "Dex",
  constitution_save: "Con",
  wisdom_save: "Wis",
  intelligence_save: "Int",
  charisma_save: "Cha"
}

class Monster extends Component {
  componentWillMount() {
    monster = this.props.monsters.filter(monster => monster.index == this.props.match.params.monsterId)[0];
  }

  calculateStatBonus(stat) {
    return Math.floor(stat / 5);
  }

  render() {
    let savingThrows = savingThrowVariables
      .map(v => [v, monster[v]])
      .filter(item => item[1] !== undefined)
      .map(item => `${savingThrowLabels[item[0]]} +${item[1]}`).join(', ');
    
    return (<div className="monster-container">
      <div className="data-section monster">
        <div className="monster-name">{monster.name}</div>
        <div className="monster-details">{monster.size} {monster.type}{monster.subtype && ` (${monster.subtype})`}, {monster.alignment}</div>
      </div>
      <div className="data-section-divider" />
      <div className="monster-data">
        <div className="data-section monster">
          <MonsterStat class="monster-armor-class" label="Armor Class" value={monster.armor_class} />
          <MonsterStat class="monster-hit-points" label="Hit Points" value={`${monster.hit_points} (${monster.hit_dice})`} />
          <MonsterStat class="monster-speed" label="Speed" value={monster.speed} />
        </div>
        <div className="data-section-divider" />
        <div className="data-section monster">
          <div className="monster-stat-block">
            <div className="monster-stat"><div className="monster-stat-header">STR</div><div className="monster-stat-value">{monster.strength} (+{this.calculateStatBonus(monster.strength)})</div></div>
            <div className="monster-stat"><div className="monster-stat-header">DEX</div><div className="monster-stat-value">{monster.dexterity} (+{this.calculateStatBonus(monster.dexterity)})</div></div>
            <div className="monster-stat"><div className="monster-stat-header">CON</div><div className="monster-stat-value">{monster.constitution} (+{this.calculateStatBonus(monster.constitution)})</div></div>
            <div className="monster-stat"><div className="monster-stat-header">WIS</div><div className="monster-stat-value">{monster.wisdom} (+{this.calculateStatBonus(monster.wisdom)})</div></div>
            <div className="monster-stat"><div className="monster-stat-header">INT</div><div className="monster-stat-value">{monster.intelligence} (+{this.calculateStatBonus(monster.intelligence)})</div></div>
            <div className="monster-stat"><div className="monster-stat-header">CHA</div><div className="monster-stat-value">{monster.charisma} (+{this.calculateStatBonus(monster.charisma)})</div></div>
          </div>
        </div>
        <div className="data-section-divider" />
        <div className="data-section monster">
          <MonsterStat class="monster-saving-throws" label="Saving Throws" value={savingThrows} />
          <MonsterStat class="monster-damage-vulnerabilities" label="Damage Vulnerabilities" value={monster.damage_vulnerabilities} />
          <MonsterStat class="monster-damage-resistances" label="Damage Resistances" value={monster.damage_resistances} />        
          <MonsterStat class="monster-damage-immunities" label="Damage Immunities" value={monster.damage_immunities} />        
          <MonsterStat class="monster-condition-immunities" label="Condition Immunities" value={monster.condition_immunities} />        
          <MonsterStat class="monster-senses" label="Senses" value={monster.senses} />
          <MonsterStat class="monster-languages" label="Languages" value={monster.languages} />
          <MonsterStat class="monster-challenge-rating" label="Challenge" value={monster.challenge_rating} />
        </div>
        <div className="data-section-divider" />
        {monster.special_abilities && <div className="monster-special-abilities">
          {monster.special_abilities.map(ability => {
            return <MonsterAbility name={ability.name} desc={ability.desc} />
          })}
        </div>}
        {monster.actions && <div className="monster-actions">
          <div className="monster-actions-title">Actions</div>
          {monster.actions.map(action => {
             return <MonsterAbility name={action.name} desc={action.desc} />
          })}
        </div>}
        {monster.legendary_actions && <div className="monster-legendary-actions">
          <div className="monster-legendary-actions-title">Legendary Actions</div>
          <div className="monster-legendary-actions-description">The {monster.name.toLowerCase()} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time, and only at the end of another creature’s turn. The {monster.name.toLowerCase()} regains spent legendary actions at the start of its turn.</div>
          {monster.legendary_actions.map(action => {
             return <MonsterAbility name={action.name} desc={action.desc} />
          })}
        </div>}
      </div>
    </div>)
  }
}

class MonsterStat extends Component {
  render() {
    if(!this.props.label || !this.props.class) {
      console.log("The MonsterStat component requires both a label and class!");
    }
    
    if(!this.props.value) {
      return null;
    }

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

export default Monster;