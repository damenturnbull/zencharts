// -----------------------------------
// PieChartBuilder
// -----------------------------------
describe("PieChartBuilder", function() {

  describe("#parseZendeskDate", function() {

    it("returns the a new date object from the string", function() {
      var date_string = "2015-04-22T11:11:56Z";
      var dateObj1    = new Date("2015-04-22");
      var dateObj2    = PieChartBuilder.parseZendeskDate(date_string);
      expect(dateObj2).toEqual(dateObj1);
    });
  });

  describe("#setCutOffDate", function() {

    it("returns the a new date object from the string", function() {
      var days_before = 15;
      var date        = new Date(); // Today
      var date        = date.setDate( date.getDate() - days_before );      
      expect(PieChartBuilder.setCutOffDate(15)).toEqual(date);
    });
  });
});



// -----------------------------------
// BarChartBuilder
// -----------------------------------
describe("BarChartBuilder", function() {

  describe("#init", function() {

    it("disallows a String to be supplied as an argument", function() {
      var json = "string";
      expect(BarGraphBuilder.init(json)).toEqual(false);
    });
  });

  describe("#getTotalSolvedByAssignees", function() {

    beforeEach(function() {

    });

    it("returns false if JSON count undefined", function() {
      var json = {
         "tickets":[]
        };
      expect(BarGraphBuilder.getTotalSolvedByAssignees(json)).toEqual(false);
    });

    it("returns false if JSON tickets undefined", function() {
      var json = { "count": 9 };
      expect(BarGraphBuilder.getTotalSolvedByAssignees(json)).toEqual(false);
    });

    it("when supplied with correct JSON, builds the assignees object correctly", function() {
      var json = {
         "tickets":[
            {
               "status":"solved",
               "assignee_id":880649968,
            },
            {
               "status":"solved",
               "assignee_id":880649968,
            },
            {
               "status":"solved",
               "assignee_id":888902307,
            },
            {
               "status":"solved",
               "assignee_id":888902307,
            },
            {
               "status":"solved",
               "assignee_id":888902307,
            },
            {
               "status":"solved",
               "assignee_id":895355398,
            },
            {
               "status":"solved",
               "assignee_id":895355398,
            },
            {
               "status":"solved",
               "assignee_id":895355398,
            },
            {
               "status":"solved",
               "assignee_id":895359518,
            }
         ],
         "count":9
      };
      var assignees = { '880649968': 2, '888902307': 3, '895355398': 3, '895359518': 1 };
      BarGraphBuilder.getTotalSolvedByAssignees(json);
      expect(BarGraphBuilder.assignees).toEqual(assignees);
    });

  });
});