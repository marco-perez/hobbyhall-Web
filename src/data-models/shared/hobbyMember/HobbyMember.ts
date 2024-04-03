/**
 * Types the hobby member data received from the HobbyHall API
 */
export interface IHobbyMemberDataModel {
	/**
	 * Unique id for this user
	 */
	uid: number;
	/**
	 * Full name of this user
	 */
	name: string;
	/**
	 * Email of this user
	 */
	email: string;
	/**
	 * Hobby Level
	 */
	hobbyLevel: HobbyLevelEnum;
}

/**
 * Declares valid hobby levels for the HobbyMemberDataModel
 */
export enum HobbyLevelEnum {
	BEGINNER = 'BEGINNER',
	INTERMEDIATE = 'INTERMEDIATE',
	ADVANCED = 'ADVANCED'
}


