import { HobbyLevelEnum } from "../../../../shared/hobbyMember/HobbyMember";

/**
 * Enumizes our request to POST /hobby/{hobbyName}/join
 * This is used to add a hobby under a users profile
 */
export interface IJoinHobbyPostRequest {
	/**
	 * Unique user id
	 */
	uid: string;
	/**
	 * Hobby Level
	 */
	hobbyLevel: HobbyLevelEnum;
}
