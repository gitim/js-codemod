/* eslint-disable one-var, prefer-const */
var foo = true;

// A comment
var bar = false;

var self = this;
var any = 'dsss';
var some = 12;
var smth;
const baz = 1;
const fiz = '2';
let that = this;
let buzz = 3.3;
let biz = {};
var ohai = function ohai() {};
var hello;
var hi;
var Neil;
var deGrasse;
var Tyson;
for (var i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}

var state = this.state;
var props = this.props;
var activeTab = props.activeTab;
var activePeriod = this._getActivePeriod(props);
var experience = this.props.expValue;
var leader = this.props.user.leader;
var user = this.props.user.current;
var isLeader = Boolean(leader && leader.id === user.id);
var showLeader = Boolean(activeTab === 'tab1' && leader);
var showExperience = Boolean(!isLeader || (activeTab !== 'tab1'));
var daysToNextLevelEstimate = this.props.daysToNextLevel;
var showNextLevelEsimate = !isNaN(daysToNextLevelEstimate) && daysToNextLevelEstimate <= 60;
var percentile = this.props.user.currentUserPercentile;
var showPercentile = !isNaN(percentile) && percentile >= 20;
