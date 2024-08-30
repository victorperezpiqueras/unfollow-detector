import JSZip from 'jszip';

export class FollowersFileWrongFormatError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

type UserData = {
	href: string; // url profile
	timestamp: number;
	value: string; // nickname
};

export type User = {
	title: string; // empty
	media_list_data: []; // empty
	string_list_data: UserData[]; // always contains only 1 user
};

type Following = {
	relationships_following: User[];
};

const FOLLOWERS_FOLDER = 'connections/followers_and_following';

export async function loadFollowersFile(file: File | undefined): Promise<{
	followers: User[];
	following: User[];
}> {
	if (!file) {
		throw new FollowersFileWrongFormatError('File is undefined');
	}
	try {
		let followers: User[];
		let following: Following;
		const zip = await JSZip.loadAsync(file);

		// Extract followers.json
		const followersFile = zip.file(`${FOLLOWERS_FOLDER}/followers_1.json`);
		if (!followersFile)
			throw new FollowersFileWrongFormatError('followers.json not found in the zip file');

		const followersContent = await followersFile.async('string');
		followers = JSON.parse(followersContent);
		console.log(followers);

		// Extract followed.json
		const followedFile = zip.file(`${FOLLOWERS_FOLDER}/following.json`);
		if (!followedFile)
			throw new FollowersFileWrongFormatError('followed.json not found in the zip file');

		const followedContent = await followedFile.async('string');
		following = JSON.parse(followedContent);
		console.log(following);

		return {
			followers: followers,
			following: following.relationships_following
		};
	} catch (error) {
		throw new FollowersFileWrongFormatError('There was an error reading the zip file');
	}
}
