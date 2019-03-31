import React, { Component } from 'react';
import './App.css';
import abilityScores from './data/5e-SRD-Ability-Scores';
import classes from './data/5e-SRD-Classes';
import conditions from './data/5e-SRD-Conditions';
import damageTypes from './data/5e-SRD-Damage-Types';
import equipmentCategories from './data/5e-SRD-Equipment-Categories';
import equipment from './data/5e-SRD-Equipment';
import classFeatures from './data/5e-SRD-Features';
import languages from './data/5e-SRD-Languages';
import levels from './data/5e-SRD-Levels';
import magicSchools from './data/5e-SRD-Magic-Schools';
import monsters from './data/5e-SRD-Monsters';
import proficiencies from './data/5e-SRD-Proficiencies';
import races from './data/5e-SRD-Races';
import skills from './data/5e-SRD-Skills';
import spellcasting from './data/5e-SRD-Spellcasting';
import spells from './data/5e-SRD-Spells';
import startingEquipment from './data/5e-SRD-StartingEquipment';
import subclasses from './data/5e-SRD-Subclasses';
import subraces from './data/5e-SRD-Subraces';
import traits from './data/5e-SRD-Traits';
import weaponProperties from './data/5e-SRD-Weapon-Properties';
import Bestiary from './views/bestiary';
import Monster from './views/bestiary/monster';
import Spellbook from './views/spellbook';
import Spell from './views/spellbook/spell';
import { BrowserRouter, Route, Link } from 'react-router-dom';

var monsterTypes, challengeRatings;

class App extends Component {
  render() {
    return (<div className="main-container">
        <BrowserRouter basename="/arcanum">
          <Route exact path="/" component={Home} />
          <Route exact path="/bestiary" render={() => <Bestiary monsters={monsters} />} />
          <Route exact path="/bestiary/:monsterId" render={(props) => <Monster {...props} monsters={monsters} />} />
          <Route exact path="/spellbook" render={() => <Spellbook spells={spells} />} />
          <Route exact path="/spellbook/:spellId" render={(props) => <Spell {...props} spells={spells} />} />
        </BrowserRouter>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (<div className="route-container">
      <Link className="route-button" to="/bestiary">
        <div className="route-label">
          <img src={require("./images/monster_icon.png")}/>
          Bestiary
        </div>
      </Link>
      <Link className="route-button" to="/spellbook">
        <div className="route-label">
          <img src={require("./images/spellbook_icon.png")}/>
          Spellbook
        </div>
      </Link>
    </div>);
  }
}

export default App;
