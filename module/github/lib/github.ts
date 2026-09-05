import { Octokit } from "octokit"
import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"

// Getting the github access token

export const getGithubToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  })
  if (!account) {
    throw new Error("No github access token found")
  }
  return account.accessToken
}

export const fetchUserContribution = async (
  token: string | null,
  userName: string
) => {
  const octokit = new Octokit({ auth: token })

  const query = `
   query($userName: String!){
        user(login: $userName){
            contributionsCollection {
                contributionCalendar{
                   totalContributions
                   weeks{
                       contributionDays{
                           contributionCount
                           date
                           color
                       }
                   }
                }
                
            }  
        }
   }
   `
    // interface contributiondata{
    //     user:{
    //         contributionsCollection:{
    //             contributionCalender:{
    //                 totalContributions:number,
    //                 weeks:{
    //                     conrtibutionCount:number,
    //                     date:string | Date,
    //                     color:string
    //                 }
    //             }
    //         }
    //     }
    // }

   try {
    const response:any = await octokit.graphql(query,{
        userName
    })
    return response?.user?.contributionsCollection?.contributionCalendar

   } catch (error) {
    console.error("Error fetching contributions:", error);
    return null;
   }
}
