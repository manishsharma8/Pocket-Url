import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createShorterUrl: Url;
  signup: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateShorterUrlArgs = {
  longUrl: Scalars['String'];
};


export type MutationSignupArgs = {
  options: UserFieldInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  Urls?: Maybe<Array<Url>>;
  getUrl?: Maybe<Url>;
  me?: Maybe<User>;
};


export type QueryGetUrlArgs = {
  shortUrl: Scalars['String'];
};

export type Url = {
  __typename?: 'Url';
  id: Scalars['Float'];
  longUrl: Scalars['String'];
  shortUrl: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserFieldInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateShorterUrlMutationVariables = Exact<{
  longUrl: Scalars['String'];
}>;


export type CreateShorterUrlMutation = (
  { __typename?: 'Mutation' }
  & { createShorterUrl: (
    { __typename?: 'Url' }
    & Pick<Url, 'id' | 'longUrl' | 'shortUrl' | 'createdAt' | 'updatedAt'>
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SignupMutationVariables = Exact<{
  options: UserFieldInput;
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type GetUrlQueryVariables = Exact<{
  shortUrl: Scalars['String'];
}>;


export type GetUrlQuery = (
  { __typename?: 'Query' }
  & { getUrl?: Maybe<(
    { __typename?: 'Url' }
    & Pick<Url, 'id' | 'longUrl'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);

export type UrlsQueryVariables = Exact<{ [key: string]: never; }>;


export type UrlsQuery = (
  { __typename?: 'Query' }
  & { Urls?: Maybe<Array<(
    { __typename?: 'Url' }
    & Pick<Url, 'id' | 'longUrl' | 'shortUrl'>
  )>> }
);


export const CreateShorterUrlDocument = gql`
    mutation createShorterUrl($longUrl: String!) {
  createShorterUrl(longUrl: $longUrl) {
    id
    longUrl
    shortUrl
    createdAt
    updatedAt
  }
}
    `;

export function useCreateShorterUrlMutation() {
  return Urql.useMutation<CreateShorterUrlMutation, CreateShorterUrlMutationVariables>(CreateShorterUrlDocument);
};
export const LoginDocument = gql`
    mutation login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      id
      username
      email
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SignupDocument = gql`
    mutation signup($options: UserFieldInput!) {
  signup(options: $options) {
    user {
      id
      username
      email
    }
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const GetUrlDocument = gql`
    query getUrl($shortUrl: String!) {
  getUrl(shortUrl: $shortUrl) {
    id
    longUrl
  }
}
    `;

export function useGetUrlQuery(options: Omit<Urql.UseQueryArgs<GetUrlQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUrlQuery>({ query: GetUrlDocument, ...options });
};
export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const UrlsDocument = gql`
    query Urls {
  Urls {
    id
    longUrl
    shortUrl
  }
}
    `;

export function useUrlsQuery(options: Omit<Urql.UseQueryArgs<UrlsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UrlsQuery>({ query: UrlsDocument, ...options });
};