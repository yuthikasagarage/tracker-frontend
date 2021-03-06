import { GraphQLClient, gql } from "graphql-request";
import { createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = "http://localhost:4000/graphql";

export const createRecord = createAsyncThunk("tracker/createRecord", async (payload) => {
	const graphQLClient = new GraphQLClient(endpoint, {
		credentials: "include",
	});

	const mutation = gql`
		mutation ($weight: Float!, $recorded_date: String!) {
			createRecord(recordInput: { weight: $weight, recorded_date: $recorded_date })
		}
	`;

	const variables = {
		weight: payload.weight,
		recorded_date: payload.recorded_date,
	};
	const data = await graphQLClient.request(mutation, variables);

	return JSON.stringify(data, undefined, 2);
});

export const updateRecord = createAsyncThunk("tracker/updateRecord", async (payload) => {
	const graphQLClient = new GraphQLClient(endpoint, {
		credentials: "include",
	});

	const mutation = gql`
		mutation ($id: ID!, $weight: Float!, $recorded_date: String!) {
			updateRecord(
				recordUpdate: { id: $id, weight: $weight, recorded_date: $recorded_date }
			)
		}
	`;
	const variables = {
		id: payload.id,
		weight: payload.weight,
		recorded_date: payload.recorded_date,
	};
	const data = await graphQLClient.request(mutation, variables);

	return JSON.stringify(data, undefined, 2);
});

export const deleteRecord = createAsyncThunk("tracker/deleteRecord", async (payload) => {
	const graphQLClient = new GraphQLClient(endpoint, {
		credentials: "include",
	});

	const mutation = gql`
		mutation ($id: ID!) {
			deleteRecord(recordDelete: { id: $id })
		}
	`;
	const variables = {
		id: payload.id,
	};
	const data = await graphQLClient.request(mutation, variables);

	return JSON.stringify(data, undefined, 2);
});

export const getUserRecords = createAsyncThunk("tracker/getRecords", async () => {
	const graphQLClient = new GraphQLClient(endpoint, {
		credentials: "include",
	});

	const query = gql`
		query {
			userRecords {
				weight
				recorded_date
				id
			}
		}
	`;
	const data = await graphQLClient.request(query);

	return JSON.stringify(data, undefined, 2);
});
