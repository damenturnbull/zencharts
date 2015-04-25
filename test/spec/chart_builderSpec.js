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