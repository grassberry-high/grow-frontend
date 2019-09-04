export const options = {
  timepickerConfig: {
    hourStep: 1,
    minuteStep: 15,
    startAt: null
  },
  timeUnitOptions: [
    {
      name: 'hours',
      multiplierToMs: 60 * 60 * 1000
    },
    {
      name: 'minutes',
      multiplierToMs: 60 * 1000
    },
    {
      name: 'seconds',
      multiplierToMs: 1000
    },
    {
      name: 'milliseconds',
      multiplierToMs: 1
    }
  ],
  cronPatternOptions: [
    {
      pattern: '* */15 * * * *',
      name: 'Every 15 minutes'
    },
    {
      pattern: '* * */1 * * *',
      name: 'Every hour'
    },
    {
      pattern: '* * */3 * * *',
      name: 'Every 3 hours'
    },
    {
      pattern: '* * */12 * * *',
      name: 'Every 12 hours'
    }
  ],
  waterOptions: [
    {
      name: 'Dry',
      value: 2
    },
    {
      name: 'Moist',
      value: 1
    }
  ],
  blockedTillOptions: [
    {value: 1, label: '1 minute'},
    {value: 15, label: '15 minutes'},
    {value: 30, label: '30 minutes'},
    {value: 60, label: '1 hour'},
    {value: 60 * 24, label: '1 day'}
  ],
  unitOptions: {temperature: 'celsius', humidity: 'rfh', co2: 'ppm'},
  newRuleBtns: [
    {
      trigger: 'timeOnOff',
      btnText: 'Time On/Off',
      tooltip: 'Switches a relay on at a certain time and switch it off at another one.'
    },
    {
      trigger: 'interval',
      btnText: 'Interval',
      tooltip: 'Switches a relay on and off based on an interval.',
      beta: true
    },
    {
      trigger: 'thresholdOnOff',
      btnText: 'Threshold On/Off',
      tooltip: 'Switches a relay on if a sensor exceeds the \'on\' threshold and off when the value falls below the \'off\' threshold.'
    },
    {
      trigger: 'thresholdOff',
      btnText: 'Threshold Off',
      tooltip: 'Switches a relay off if a sensor exceeds the \'off\' threshold. Keeps the relay off until unblocked manually.',
      beta: true
    },
    {
      trigger: 'thresholdTimer',
      btnText: 'Threshold Timer',
      tooltip: 'Switches a relay on if a sensor exceeds the \'on\' threshold and off after a specified time.'
    },
    {
      trigger: 'alwaysOn',
      btnText: 'Always on',
      tooltip: 'Keep a relay always on.',
      beta: true
    }
  ]
};
