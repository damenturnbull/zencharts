describe("Zencharts", function() {

  beforeAll(function() {
    ZenCharts.init();
  });  

  it("is defined", function() {
    expect(ZenCharts).toBeDefined();
  });

  describe("#getURLHashParameter", function() {

    it("returns the 'access_token' parameter in the URL", function() {
      location.hash     = "#access_token=eecca72efbda312&scope=read&token_type=bearer";
      var access_token  = "eecca72efbda312";
      var get_url       = ZenCharts.getURLHashParameter("access_token");
      expect(get_url).toEqual(access_token);
    });

    it("returns the 'error' parameter in the URL", function() {
      location.hash = "#error=unauthorized";
      var error     = "unauthorized";
      var get_url       = ZenCharts.getURLHashParameter("error");
      expect(get_url).toEqual(error);
    });

  });
});