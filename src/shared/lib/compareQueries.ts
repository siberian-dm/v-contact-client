import { QueryParams } from '~shared/types';

type CompareQueriesparams = {
  query: QueryParams;
  prevQuery?: QueryParams;
};

export function compareQueries({ query, prevQuery }: CompareQueriesparams) {
  const queryKeys = Object.keys(query);
  for (let i = 0; i < queryKeys.length; i++) {
    if (!prevQuery || query[queryKeys[i]] !== prevQuery[queryKeys[i]]) {
      return true;
    }
  }

  return false;
}
