import { MySqlClient  } from './my-sql';
// import { InMemory } from './in-memory';

const createRepo = () => {
    // if (process.env.NODE_ENV !== 'test') {
    //     return new DynamoClient();
    // }
    return new MySqlClient();
};

export const repository = createRepo();