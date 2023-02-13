import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {encodeAddress} from "@polkadot/util-crypto";

const API_URL = 'https://squid.subsquid.io/soonsocial/graphql';

export const gqlClient = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
});

export const getFeedQuery = (accountId: string) => {
    const subId = encodeAddress(accountId, 28);
    return gql`
    query MyQuery {
        posts(
            where: {
                kind_eq: RegularPost, 
                createdByAccount: {
                    followers_some: {
                        id_contains: "${subId}"
                    }
                }
            },
            orderBy: createdAtTime_ASC
        ) {
            id
        }
    }`;
};
