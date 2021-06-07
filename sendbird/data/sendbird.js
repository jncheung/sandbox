const organisation =  [{
      "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
      "sortKey": "INFO",
      "itemType": "INFO"
  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "sortKey": "DEPT#33039fc5-a58a-44c6-8463-e324975e9025",
    "deptID": "33039fc5-a58a-44c6-8463-e324975e9025",
    "itemType": "DEPT"
  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "sortKey": "DEPT#03153d80-799a-4981-a46a-2cf351ca37a4",
    "deptID": "03153d80-799a-4981-a46a-2cf351ca37a4",
    "itemType": "DEPT"

  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "sortKey": "LOC#f88ca07c-1b28-41be-9edc-22d930c7dd2b",
    "locationID": "f88ca07c-1b28-41be-9edc-22d930c7dd2b",
    "itemType": "LOCATION"
  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "sortKey": "CHANNEL#acc6449d-7028-4bf0-8b1d-e291ecca118b",
    "channelID": "acc6449d-7028-4bf0-8b1d-e291ecca118b",
    "locationID": "33039fc5-a58a-44c6-8463-e324975e9025",
    "itemType": "LOCATION"

  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "sortKey": "CHANNEL#c3d0af0b-8269-41f2-8107-a0ec2ef869fc",
    "channelID": "c3d0af0b-8269-41f2-8107-a0ec2ef869fc",
    "deptID": "03153d80-799a-4981-a46a-2cf351ca37a4",
    "itemType": "DEPARTMENT"
  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "sortKey": "CHANNEL#843a80bc-1a75-43b3-9fb4-1e8a0f71ed1e",
    "channelID": "843a80bc-1a75-43b3-9fb4-1e8a0f71ed1e",
    "locationID": "f88ca07c-1b28-41be-9edc-22d930c7dd2b",
    "itemType": "CHANNEL"

  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "memberID": "9cd13a211dc147ca9c86b011973f8c20",
    "sortKey": "MEMBER#9cd13a211dc147ca9c86b011973f8c20",
    "assignedRoles": [`SYSTEMROLE#MEMBER`, `MANAGER`],
    "assignedLocations": [`f88ca07c-1b28-41be-9edc-22d930c7dd2b`],
    "itemType": "MEMBER"

  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "memberID": "8ed9fc6e85894478810715796e29bab5",
    "sortKey": "MEMBER#8ed9fc6e85894478810715796e29bab5",
    "assignedRoles": [`SYSTEMROLE#MEMBER`, `MANAGER`],
    "assignedLocations": [`f88ca07c-1b28-41be-9edc-22d930c7dd2b`],
    "itemType": "MEMBER"


  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "memberID": "471356cfcdb140dbbabe7989df05fbe6",
    "sortKey": "MEMBER#471356cfcdb140dbbabe7989df05fbe6",
    "assignedRoles": [`SYSTEMROLE#OWNER`],

    "assignedDepts": [`03153d80-799a-4981-a46a-2cf351ca37a4`],
    "itemType": "MEMBER"

  },
  {
    "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
    "memberID": "954d2da4dc6d4b779655c8dceea15c25",
    "sortKey" :"MEMBER#954d2da4dc6d4b779655c8dceea15c25",
    "assignedRoles": [`SYSTEMROLE#ADMIN`],
    "itemType": "MEMBER"

  }
]


const member = [
    {
      "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
      "memberID": "9cd13a211dc147ca9c86b011973f8c20",
      "phoneNumber": "(324) 315-0751",
      "nickname": "Rippin" 
    },
    {
      "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
      "memberID": "471356cfcdb140dbbabe7989df05fbe6",
      "phoneNumber": "319-282-9046",
      "nickname": "Anne"
    },
    {
      "orgID": "7322d1fd-07fb-40fc-910d-368857ba3551",
      "memberID": "954d2da4dc6d4b779655c8dceea15c25",
      "phoneNumber": "1-949-419-2859",
      "nickname": "Hassie",
    }
  ]



module.exports = {organisation, member}