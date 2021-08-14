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
  deleteUrl: Scalars['Boolean'];
  signup: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  countPlusOne: Visit;
  genCount: Visit;
};


export type MutationCreateShorterUrlArgs = {
  shortUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  longUrl: Scalars['String'];
};


export type MutationDeleteUrlArgs = {
  id: Scalars['Int'];
};


export type MutationSignupArgs = {
  options: UserFieldInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCountPlusOneArgs = {
  id: Scalars['Int'];
};


export type MutationGenCountArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  Urls?: Maybe<Array<Url>>;
  getUserUrls?: Maybe<Array<Url>>;
  getUrl?: Maybe<Url>;
  me?: Maybe<User>;
  allUser?: Maybe<Array<User>>;
  urlVisits: Array<Visit>;
  allVisits: Array<Visit>;
};


export type QueryGetUrlArgs = {
  shortUrl: Scalars['String'];
};


export type QueryUrlVisitsArgs = {
  id: Scalars['Int'];
};

export type Url = {
  __typename?: 'Url';
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
  longUrl: Scalars['String'];
  shortUrl: Scalars['String'];
  creatorId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
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

export type Visit = {
  __typename?: 'Visit';
  id: Scalars['Float'];
  date: Scalars['String'];
  count: Scalars['Float'];
  urlId: Scalars['Float'];
};

export type CountPlusOneMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CountPlusOneMutation = (
  { __typename?: 'Mutation' }
  & { countPlusOne: (
    { __typename?: 'Visit' }
    & Pick<Visit, 'urlId' | 'date' | 'count'>
  ) }
);

export type CreateShorterUrlMutationVariables = Exact<{
  longUrl: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  shortUrl?: Maybe<Scalars['String']>;
}>;


export type CreateShorterUrlMutation = (
  { __typename?: 'Mutation' }
  & { createShorterUrl: (
    { __typename?: 'Url' }
    & Pick<Url, 'id' | 'title' | 'longUrl' | 'shortUrl' | 'createdAt' | 'updatedAt' | 'creatorId'>
  ) }
);

export type DeleteUrlMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUrlMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUrl'>
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
    & Pick<Url, 'id' | 'title' | 'longUrl'>
  )> }
);

export type GetUserUrlsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserUrlsQuery = (
  { __typename?: 'Query' }
  & { getUserUrls?: Maybe<Array<(
    { __typename?: 'Url' }
    & Pick<Url, 'id' | 'title' | 'longUrl' | 'shortUrl' | 'createdAt'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);

export type UrlVisitsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UrlVisitsQuery = (
  { __typename?: 'Query' }
  & { urlVisits: Array<(
    { __typename?: 'Visit' }
    & Pick<Visit, 'urlId' | 'date' | 'count'>
  )> }
);

export type UrlsQueryVariables = Exact<{ [key: string]: never; }>;


export type UrlsQuery = (
  { __typename?: 'Query' }
  & { Urls?: Maybe<Array<(
    { __typename?: 'Url' }
    & Pick<Url, 'id' | 'title' | 'longUrl' | 'shortUrl'>
  )>> }
);


export const CountPlusOneDocument = gql`
    mutation countPlusOne($id: Int!) {
  countPlusOne(id: $id) {
    urlId
    date
    count
  }
}
    `;

export function useCountPlusOneMutation() {
  return Urql.useMutation<CountPlusOneMutation, CountPlusOneMutationVariables>(CountPlusOneDocument);
};
export const CreateShorterUrlDocument = gql`
    mutation createShorterUrl($longUrl: String!, $title: String, $shortUrl: String) {
  createShorterUrl(longUrl: $longUrl, title: $title, shortUrl: $shortUrl) {
    id
    title
    longUrl
    shortUrl
    createdAt
    updatedAt
    creatorId
  }
}
    `;

export function useCreateShorterUrlMutation() {
  return Urql.useMutation<CreateShorterUrlMutation, CreateShorterUrlMutationVariables>(CreateShorterUrlDocument);
};
export const DeleteUrlDocument = gql`
    mutation deleteUrl($id: Int!) {
  deleteUrl(id: $id)
}
    `;

export function useDeleteUrlMutation() {
  return Urql.useMutation<DeleteUrlMutation, DeleteUrlMutationVariables>(DeleteUrlDocument);
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
    title
    longUrl
  }
}
    `;

export function useGetUrlQuery(options: Omit<Urql.UseQueryArgs<GetUrlQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUrlQuery>({ query: GetUrlDocument, ...options });
};
export const GetUserUrlsDocument = gql`
    query getUserUrls {
  getUserUrls {
    id
    title
    longUrl
    shortUrl
    createdAt
  }
}
    `;

export function useGetUserUrlsQuery(options: Omit<Urql.UseQueryArgs<GetUserUrlsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserUrlsQuery>({ query: GetUserUrlsDocument, ...options });
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
export const UrlVisitsDocument = gql`
    query urlVisits($id: Int!) {
  urlVisits(id: $id) {
    urlId
    date
    count
  }
}
    `;

export function useUrlVisitsQuery(options: Omit<Urql.UseQueryArgs<UrlVisitsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UrlVisitsQuery>({ query: UrlVisitsDocument, ...options });
};
export const UrlsDocument = gql`
    query Urls {
  Urls {
    id
    title
    longUrl
    shortUrl
  }
}
    `;

export function useUrlsQuery(options: Omit<Urql.UseQueryArgs<UrlsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UrlsQuery>({ query: UrlsDocument, ...options });
};