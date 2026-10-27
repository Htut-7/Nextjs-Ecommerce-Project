
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/Components/lib/response";
import Account from "@/database/account.model";

export async function POST(request: Request) {
  try {
    const { providerAccountId } = await request.json();

    console.log("Looking up providerAccountId:", providerAccountId);

    const account = await Account.findOne({ providerAccountId });

    console.log("Found account:", account);

    if (!account) {
      throw new Error("Account not found for this providerAccountId");
    }

    console.log("Account userId:", account.userId);

    return handleSuccessResponse({
      _id: account._id.toString(),
      userId: account.userId?.toString(),
    });
  } catch (e) {
    console.error("Provider account lookup error:", e);
    return handleErrorResponse(e);
  }
}
