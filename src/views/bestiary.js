import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

var monsterTypes, challengeRatings;

class Bestiary extends Component {
  constructor(props) {
    super(props);

    this.handleNameFilterChange = this.handleNameFilterChange.bind(this);

    // Initialize filters as empty.  Empty filters count as no filter,
    // so all results are shown.  When filters are added, they are pushed
    // into the array, and then only items matching what is in the arrays
    // are shown.

    let localStorageTypeFilter = localStorage.getItem('bestiary-type-filter');
    let localStorageCrFilter = localStorage.getItem('bestiary-cr-filter');
    let localStorageNameFilter = localStorage.getItem('bestiary-name-filter');

    this.state = {
      typeFilter: localStorageTypeFilter ? JSON.parse(localStorageTypeFilter) : [],
      crFilter: localStorageCrFilter ? JSON.parse(localStorageCrFilter) : [],
      nameFilter: localStorageNameFilter ? localStorageNameFilter : ''
    }
  }
  componentWillMount() {
    this.buildInitialData();
  }

  buildInitialData() {
    monsterTypes = Array.from(new Set(this.props.monsters.map(mon => mon.type))).sort();
    challengeRatings = Array.from(new Set(this.props.monsters.map(mon => mon.challenge_rating))).sort(function(a,b){return a-b});
  }

  toggleTypeFilter(type) {
    let filter = this.state.typeFilter;
    if(filter.indexOf(type) === -1) {
      filter.push(type);
    } else {
      let index = filter.indexOf(type);
      filter.splice(index, 1);
    }
    this.setState({
      typeFilter: filter
    });

    localStorage.setItem('bestiary-type-filter', JSON.stringify(filter));
  }

  resetTypeFilter() {
    this.setState({
      typeFilter: []
    });

    localStorage.setItem('bestiary-type-filter', JSON.stringify([]));
  }

  toggleChallengeFilter(cr) {
    // cr = cr.toString();

    let filter = this.state.crFilter;
    if(filter.indexOf(cr) === -1) {
      filter.push(cr);
    } else {
      let index = filter.indexOf(cr);
      filter.splice(index, 1);
    }

    console.log("Toggling " + cr);
    this.setState({
      crFilter: filter
    });

    localStorage.setItem('bestiary-cr-filter', JSON.stringify(filter));
  }

  resetCrFilter() {
    this.setState({
      crFilter: []
    });

    localStorage.setItem('bestiary-cr-filter', JSON.stringify([]));
  }

  handleNameFilterChange(data) {
    let name = data.target.value.toLowerCase();

    this.setState({
      nameFilter: name
    });

    console.log(require('util').inspect(name))

    localStorage.setItem('bestiary-name-filter', name);
  }

  isTypeFilterActive(type) {
    if(this.state && this.state.typeFilter && this.state.typeFilter.length > 0) {
      if(this.state.typeFilter.indexOf(type) > -1) {
        return true;
      }
    }
    return false;
  }

  isCrFilterActive(cr) {
    if(this.state && this.state.crFilter && this.state.crFilter.length > 0) {
      if(this.state.crFilter.indexOf(cr) > -1) {
        return true;
      }
    }
    return false;
  }

  isNameFilterActive(name) {
    if(this.state && this.state.nameFilter && this.state.nameFilter.length > 0) {
      return true;
    }
    return false;
  }

  render() {
    return (<div>
      <div className="bestiary-header">D&D 5e Bestiary</div>
      <div className="monster-types-container">
        <a onClick={() => this.resetTypeFilter()} className="filter-button"><div className={"monster-type" + (this.state.typeFilter.length === 0 ? " active-filter" : " inactive-filter")}>all</div></a>
        {monsterTypes.map(type => {
          let activeClass = " inactive-filter";
          if(this.isTypeFilterActive(type)) {
            activeClass = " active-filter";
          }
          return <a onClick={() => this.toggleTypeFilter(type)} className="filter-button"><div className={"monster-type" + activeClass}>{type}</div></a>
        })}
      </div>
      <div className="challenge-ratings-container">
      <a onClick={() => this.resetCrFilter()} className="filter-button"><div className={"challenge-rating" + (this.state.crFilter.length === 0 ? " active-filter" : " inactive-filter")}>all</div></a>
        {challengeRatings.map(cr => {
          let activeClass = " inactive-filter";
          if(this.isCrFilterActive(cr)) {
            activeClass = " active-filter";
          }
          return <a onClick={() => this.toggleChallengeFilter(cr)} className="filter-button"><div className={"challenge-rating" + activeClass}>{cr}</div></a>
        })}
      </div>
      <div className="">
        <input type="text" value={this.state.nameFilter} onChange={this.handleNameFilterChange} />
      </div>
      <div className="monsters-container">
        {this.props.monsters.map(monster => {
          if(this.state && this.state.typeFilter && this.state.typeFilter.length > 0) {
            if(this.state.typeFilter.indexOf(monster.type) == -1) {
              return null;
            }
          }
          if(this.state && this.state.crFilter && this.state.crFilter.length > 0) {
            if(this.state.crFilter.indexOf(monster.challenge_rating) == -1) {
              return null;
            }
          }
          if(this.state && this.state.nameFilter && this.state.nameFilter.length > 0) {
            if(monster.name.toLowerCase().indexOf(this.state.nameFilter) == -1) {
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