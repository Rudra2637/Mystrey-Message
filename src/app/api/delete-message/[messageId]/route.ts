import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import UserModel from "@/model/User";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  const { messageId } = params;
  console.log("Deleting messageId:", messageId);

  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "User is not logged in. Log in to access features" },
      { status: 401 }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(session.user._id);

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { message: { _id: new mongoose.Types.ObjectId(messageId) } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting the message ", error);
    return Response.json(
      { success: false, message: "Error in deleting message" },
      { status: 500 }
    );
  }
}
