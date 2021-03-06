var agents = {  
   "users":[  
      {  
         "id":880649968,
         "url":"https://fando.zendesk.com/api/v2/users/880649968.json",
         "name":"Joe",
         "email":"damenturnbull+joe@gmail.com",
         "created_at":"2015-04-15T22:02:44Z",
         "updated_at":"2015-04-23T12:02:20Z",
         "time_zone":"Brisbane",
         "phone":null,
         "photo":null,
         "locale_id":1,
         "locale":"en-US",
         "organization_id":null,
         "role":"agent",
         "verified":false,
         "external_id":null,
         "tags":[  

         ],
         "alias":"",
         "active":true,
         "shared":false,
         "shared_agent":false,
         "last_login_at":null,
         "signature":"",
         "details":"",
         "notes":"",
         "custom_role_id":null,
         "moderator":false,
         "ticket_restriction":null,
         "only_private_comments":false,
         "restricted_agent":false,
         "suspended":false,
         "chat_only":false,
         "user_fields":{  

         }
      },
      {  
         "id":888901827,
         "url":"https://fando.zendesk.com/api/v2/users/888901827.json",
         "name":"Steve",
         "email":"damenturnbull+steve@gmail.com",
         "created_at":"2015-04-23T11:58:49Z",
         "updated_at":"2015-04-23T11:58:50Z",
         "time_zone":"Brisbane",
         "phone":null,
         "photo":null,
         "locale_id":1,
         "locale":"en-US",
         "organization_id":null,
         "role":"agent",
         "verified":false,
         "external_id":null,
         "tags":[  

         ],
         "alias":"",
         "active":true,
         "shared":false,
         "shared_agent":false,
         "last_login_at":null,
         "signature":"",
         "details":"",
         "notes":"",
         "custom_role_id":null,
         "moderator":false,
         "ticket_restriction":null,
         "only_private_comments":false,
         "restricted_agent":false,
         "suspended":false,
         "chat_only":false,
         "user_fields":{  

         }
      },
      {  
         "id":888902307,
         "url":"https://fando.zendesk.com/api/v2/users/888902307.json",
         "name":"Maria",
         "email":"damenturnbull+maria@gmail.com",
         "created_at":"2015-04-23T11:59:05Z",
         "updated_at":"2015-04-23T11:59:05Z",
         "time_zone":"Brisbane",
         "phone":null,
         "photo":null,
         "locale_id":1,
         "locale":"en-US",
         "organization_id":null,
         "role":"agent",
         "verified":false,
         "external_id":null,
         "tags":[  

         ],
         "alias":"",
         "active":true,
         "shared":false,
         "shared_agent":false,
         "last_login_at":null,
         "signature":"",
         "details":"",
         "notes":"",
         "custom_role_id":null,
         "moderator":false,
         "ticket_restriction":null,
         "only_private_comments":false,
         "restricted_agent":false,
         "suspended":false,
         "chat_only":false,
         "user_fields":{  

         }
      },
      {  
         "id":895355398,
         "url":"https://fando.zendesk.com/api/v2/users/895355398.json",
         "name":"Max",
         "email":"damenturnbull+max@gmail.com",
         "created_at":"2015-04-23T11:58:28Z",
         "updated_at":"2015-04-25T03:33:46Z",
         "time_zone":"Brisbane",
         "phone":null,
         "photo":null,
         "locale_id":1,
         "locale":"en-US",
         "organization_id":null,
         "role":"agent",
         "verified":true,
         "external_id":null,
         "tags":[  

         ],
         "alias":"",
         "active":true,
         "shared":false,
         "shared_agent":false,
         "last_login_at":"2015-04-25T03:33:39Z",
         "signature":"",
         "details":"",
         "notes":"",
         "custom_role_id":null,
         "moderator":false,
         "ticket_restriction":null,
         "only_private_comments":false,
         "restricted_agent":false,
         "suspended":false,
         "chat_only":false,
         "user_fields":{  

         }
      },
      {  
         "id":895359518,
         "url":"https://fando.zendesk.com/api/v2/users/895359518.json",
         "name":"Sally",
         "email":"damenturnbull+sally@gmail.com",
         "created_at":"2015-04-23T12:01:06Z",
         "updated_at":"2015-04-23T12:01:06Z",
         "time_zone":"Brisbane",
         "phone":null,
         "photo":null,
         "locale_id":1,
         "locale":"en-US",
         "organization_id":null,
         "role":"agent",
         "verified":false,
         "external_id":null,
         "tags":[  

         ],
         "alias":"",
         "active":true,
         "shared":false,
         "shared_agent":false,
         "last_login_at":null,
         "signature":"",
         "details":"",
         "notes":"",
         "custom_role_id":null,
         "moderator":false,
         "ticket_restriction":null,
         "only_private_comments":false,
         "restricted_agent":false,
         "suspended":false,
         "chat_only":false,
         "user_fields":{  

         }
      }
   ],
   "next_page":null,
   "previous_page":null,
   "count":5
}

var users = { '880649968': 2, '888902307': 3, '895355398': 3, '895359518': 1 };

var categories = [];
var series     = [];

for(var i = 0; i < agents.count; i++) {
   var agent_id = agents.users[i].id;
   if( (agent_id in users) ) {
      // var tempUser = { 'name': agents.users[i].name, 'count' :  users[agent_id]}
      // tempUsers.push(tempUser);
      categories.push(agents.users[i].name);
      series.push(users[agent_id]);
      // console.log(agents.users[i].name);
    // users[agent_id] = 1;
  }
}

// users = tempUsers;
console.log(categories);
console.log(series);