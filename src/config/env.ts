export interface CloudinaryEnv {
  cloudinaryName: string;
  cloudinaryKey: string;
  cloudinarySecret: string;
}

export interface Env {
  NODE_ENV: string;
  IS_NODE_ENV_DEVELOPMENT: boolean;
  host: string;
  port: number;

  /** Cloudinary variables  */
  cloudinary: CloudinaryEnv;
}

const variables: Env = {
  NODE_ENV: process.env.NODE_ENV,
  IS_NODE_ENV_DEVELOPMENT: process.env.NODE_ENV === 'development',

  /** @default: "http://localhost:3333/"  */
  host: process.env.HOST || 'http://localhost:3333/',

  port: Number(process.env.PORT) || 3333,

  cloudinary: {
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryKey: process.env.CLOUDINARY_KEY,
    cloudinarySecret: process.env.CLOUDINARY_SECRET,
  },
};

export default variables;
