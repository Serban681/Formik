import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import clientPromise from "./db"
import dbConnect from './dbConnect';

dbConnect()

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
}


// CredentialsProvider({
    //   id: 'credentials',
    //   name: 'Credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username',
    //       type: 'text'
    //     },
    //     password: {
    //       label: 'Password',
    //       type: 'password'
    //     }
    //   },
    //   async authorize(credentials) {
    //     await dbConnect()

    //     const user = await User.findOne({ username: credentials!.username })

    //     if(!user) throw new Error('User not found')

    //     const isPasswordCorrect = await compare(credentials!.password, user.password)

    //     if(!isPasswordCorrect) throw new Error('Invalid password')

    //     return user
    //   }
    // })

    // session: { strategy: "jwt" },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET!
  // },
  // secret: process.env.NEXTAUTH_SECRET!,

    // pages: {
  //   signIn: '/login'
  // },