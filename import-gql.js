const { loadSchema, loadDocuments, loadTypedefs } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const { JsonFileLoader } = require('@graphql-tools/json-file-loader');
const { GraphQLFileLoader, } = require('@graphql-tools/graphql-file-loader');
const { CodeFileLoader } = require('@graphql-tools/code-file-loader');

// const schema1 = await loadSchema('type A { foo: String }');   // load from string w/ no loaders
(async()=>{

    try{

        // const schema2 = await loadSchema('https://xnrwdvfnbzf4rb253c44b3hfbe.appsync-api.us-east-2.amazonaws.com/graphql', {   // load from endpoint
        //     loaders: [
        //         new UrlLoader()
        //     ],
        //     headers: {
        //         "Content-Type":"application/graphql",
        //         "x-api-key":'da2-4vkfvvjocrg5vdlcslzk6q74ce	'
        //     }
        // });


        // console.log(schema2)


        const document4 = await loadTypedefs('./graphql/queries.ts', {  // load from code file
            loaders: [
                new CodeFileLoader()
            ]
        });

        console.log(document4[0].rawSDL)
        // const schema3 = await loadSchema('./schema.json', {   // load from local json file
        //     loaders: [
        //         new JsonFileLoader()
        //     ]
        // });

        // const schema4 = await loadSchema('schema.graphql', {  // load from a single schema file
        //     loaders: [
        //         new GraphQLFileLoader()
        //     ]
        // });

        // const schema5 = await loadSchema('./src/**/*.graphql', { // load from multiple files using glob
        //     loaders: [
        //         new GraphQLFileLoader()
        //     ]
        // });
    }    
    catch(err){
        console.log(err)
    }
})()