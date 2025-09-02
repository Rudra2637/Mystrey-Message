import 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?:string,                      // We doing this in order to make changes in the module that we imported as we can't directly do anything 
        isVerified?:boolean,              //anything to this module so we need to do the changes accrodingly
        isAcceptingMessages?:boolean,
        username:string
    }
    interface Session{
        user:{
            _id?:string,
            isVerified?:boolean,             
            isAcceptingMessages?:boolean,
            username:string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string,
        isVerified?:boolean,             
        isAcceptingMessages?:boolean,
        username:string
    }
}

