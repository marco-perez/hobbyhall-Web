
import { S3Client, PutObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';

/**
 * AWS S3 Client
 * Used to store user images in the cloud so only url is needed in database
 */
class AwsS3ClientModel {
	private client: S3Client; // no react-aws-s3 type

	constructor() {
		const config: S3ClientConfig = {
			region: 'us-east-1',
			credentials: {
				accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY as string,
				secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY as string
			}
		};
		this.client = new S3Client(config);
	}

	public uploadFile(file: File, filename: string): Promise<unknown> {
		const filepath = this.generateStorageName(filename);
		const upload: PutObjectCommand = new PutObjectCommand({
			Bucket: 'intros-logos',
			Key: filepath,
			Body: file
		});
		return this.client
			.send(upload)
			.then(() => {
				return {
					success: true,
					path: `https://intros-logos.s3.amazonaws.com/${filepath}`
				};
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.catch((reason: any) => {
				return {
					success: false,
					error: reason
				};
			});
	}

	/**
	 * Generate a version of the name with a pseudorandom string prepending it
	 * @param filename
	 */
	private generateStorageName(filename: string) {
		return Math.random().toString(20).substr(2, 32) + `/${filename}`;
	}
}

/**
 * Export a version of our class for other classes to share
 */
export const awsS3Client = new AwsS3ClientModel();
