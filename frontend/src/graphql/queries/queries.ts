import { gql } from "@apollo/client";

export const GET_ALL_CITIES = gql`
	query getAllCities {
		getAllCities {
			name
			description
			id
			pois {
				id
				name
				address
				description
			}
		}
	}
`;

export const GET_ALL_CATEGORIES = gql`
	query getAllCategories {
		getAllCategories {
			name
			id
		}
	}
`;

export const GET_CITY_BY_NAME = gql`
	query getCityByName($name: String!) {
		getCityByName(name: $name) {
			name
			description
			pois {
				id
				name
				address
				description
			}
			lon
			lat
		}
	}
`;

export const LOGIN = gql`
	query Login($userData: UserLoginInput!) {
		login(userData: $userData)
	}
`;

export const GET_AUTH_INFO = gql`
	query WhoAmI {
		whoAmI {
			isLoggedIn
			email
			role
		}
	}
`;
