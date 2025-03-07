import {S3} from 'aws-sdk';

export const s3bucket = new S3({
  accessKeyId: 'AKIA6ODU3KKVU5FN7TVZ',
  secretAccessKey: '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',
  region: process.env.EXPO_PUBLIC_AWS_REGION_KEY,
});

// hii heloo
