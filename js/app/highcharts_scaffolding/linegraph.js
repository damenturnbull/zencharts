var LineGraphScaffold = 
{  
  title:{  
    text:"Customer Contact - Last 15 Days <strong>(MOCK ONLY)</strong>",
  },
  subtitle: {
    text: "Customers that have contacted Support."
  },

  chart: {
    type: "area"
  },  
  legend: {
    enabled: false
  },
  xAxis:{  
    categories:[ 
    "4/12/15",
    "5/12/15",
    "6/12/15",
    "7/12/15",
    "8/12/15",
    "9/12/15",
    "10/12/15",
    "11/12/15",
    "12/12/15",
    "13/12/15",
    "14/12/15",
    "15/12/15",
    "16/12/15",
    "17/12/15",
    "18/12/15",
    ]
  },
  yAxis:{  
    title:{  
      text:"No. of Contacts"
    },
    plotLines:[  
    {  
      value: 0,
      width: 1,
      color: "#808080"
    }
    ]
  },
  series:[  
  {  
    name: "No. of Contacts",
    color: "#1aa5e1",
    fillColor: "#f7fcfe",
    data:[  
    4,
    6,
    7,
    8,
    3,
    5,
    3,
    7,
    8,
    9,
    10,
    15,
    3,
    5,
    6
    ]
  }
  ],
  credits: {
    enabled: false
  }
};