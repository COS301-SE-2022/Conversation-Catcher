import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class DatabaseManagerResolver {
  @Query(() => String, {name: 'test'})
  pingStudentProfiles() {
    
    const data = JSON.stringify({
      "collection": "<COLLECTION_NAME>",
      "database": "<DATABASE_NAME>",
      "dataSource": "Cluster0",
      "projection": {
          "_id": 1
      }
  });

  const config = {
      method: 'post',
      url: 'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/beta/action/findOne',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': '<API_KEY>'
      },
      data : data
  };

  axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log(error);
      });
    return 'on';
  }
}
