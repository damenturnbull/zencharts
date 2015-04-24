# zencharts - Beautifully Simple Report

Zencharts combines the power of the High Charts library with the Zendesk Developer API. The application connects to with JavaScript over the OAuth protocol. 

![Alt text](/images/zencharts-screenshot.png?raw=true "zencharts")

## Run

The repo includes a small nodejs server for use locally. The server uses the 'connect' and 'serve-static' node modules. 

Reference: http://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server

#### 
    $ node server.js

Browser access via http://127.0.0.1:8080/

## Highcharts

#### Mock Reports

Mock reports are loading by default. These reports use mock data based on Highcharts templates.

#### Live Reports

Live reports replace the default graph data with data from a Zendesk endpoint. 

**In order to run Live reports the user must have access to a zendesk subdomain eg. https://{subdomain}.zendesk.com**

To run Live Reports:

1. Clicking on "Live Reports" will redirect you to the a Zendesk subdomain login page.
2. Login using credentials for your particular domain.
3. You will be redirected back to the zencharts and the Mock data will be replaced with the Live data.

For example, when 'Live Reports' is successful, the 'Customer Access' pie charts will be updated with data for Zendesk "end users".

GET /api/v2/users/search.json?role=end-user

https://developer.zendesk.com/rest_api/docs/core/search#content

## OAuth and Zendesk

Due to Same Origin Policy it is not possible to send requests to Zendesk API endpoints with Ajax alone. Instead, this application uses Cross Origin Resouce Sharing (CORS) with the OAuth protocol.

The OAuth protocol authenticates all requests to the Zendesk API and allows ansychronous requests to API endpoints.

Reference:
https://developer.zendesk.com/blog/2013/08/02/using-oauth-to-authenticate-with-zendesk-api-v2/
http://oauth.net/


## Original Specification

#### _Beautifully Simple Report_

_Pretend you run an eCommerce website and use Zendesk for your customer service.
You have customers who log-in to your store and then purchase clothes. 
As a business owner you’d like to know more about your customers and the way they interact with your business._

_Use a publicly available charting library to show:_

_- What percentage of customers have logged in recently._
_- How many customers have contacted support over the past 15 days._
_- Who the best support agents are in your company (based off how many tickets they solved)_

_Your priority is code clarity and maintainability._

_Bonus points:_

_- Hook the reporting up to the Zendesk API (https://developer.zendesk.com/rest_api/docs/core/introduction)._