require('dotenv').config();

// import { MySqlClient  } from './my-sql';
import { InMemory } from './in-memory';

export const createRepo = () => {
    // if (process.env.NODE_ENV !== 'test') {
    //     return new DynamoClient();
    // }

    return new InMemory();

    // return new MySqlClient();
};

export const repository = createRepo();