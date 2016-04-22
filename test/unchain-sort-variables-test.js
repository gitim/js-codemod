/* eslint-disable one-var, prefer-const */
var foo = true,
  // A comment
  bar = false;
var smth,
  any = 'dsss',
  some = 12, self = this;
const baz = 1,
  fiz = '2';
let buzz = 3.3,
  that = this,
  biz = {};
var hello, ohai = function ohai() {}, hi;
var Neil, deGrasse, Tyson;
for (var i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}

var state = this.state,
  props = this.props,
  activeTab = props.activeTab,
  activePeriod = this._getActivePeriod(props),
  experience = this.props.expValue,
  leader = this.props.user.leader,
  user = this.props.user.current,
  isLeader = Boolean(leader && leader.id === user.id),
  showLeader = Boolean(activeTab === 'tab1' && leader),
  showExperience = Boolean(!isLeader || (activeTab !== 'tab1')),
  daysToNextLevelEstimate = this.props.daysToNextLevel,
  showNextLevelEsimate = !isNaN(daysToNextLevelEstimate) && daysToNextLevelEstimate <= 60,

  percentile = this.props.user.currentUserPercentile,
  showPercentile = !isNaN(percentile) && percentile >= 20;
