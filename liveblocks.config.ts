import { LiveMap, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Initialize the Liveblocks client with your public API key and any necessary options
const client = createClient({
  throttle: 16, // Example configuration option; adjust as needed
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
  async resolveUsers({ userIds }) {
    // Used only for Comments. Return a list of user information retrieved
    // from `userIds`. This info is used in comments, mentions, etc.

    // Example: Fetch user data from your database or API
    // const usersData = await __fetchUsersFromDB__(userIds);
    //
    // return usersData.map((userData) => ({
    //   name: userData.name,
    //   avatar: userData.avatar.src,
    // }));

    return []; // Adjust this return statement based on your logic
  },
  async resolveMentionSuggestions({ text, roomId }) {
    // Used only for Comments. Return a list of userIds that match `text`.
    // These userIds are used to create a mention list when typing in the
    // composer.

    // Example: Fetch all user IDs or filter them based on the input text
    // const userIds = await __fetchAllUserIdsFromDB__(roomId);
    //
    // If no text is provided, return all user IDs
    // if (!text) {
    //   return userIds;
    // }
    //
    // Otherwise, filter user IDs based on the search text
    // return userIds.filter((userId) =>
    //   userId.toLowerCase().includes(text.toLowerCase())
    // );

    return []; // Adjust this return statement based on your logic
  },
});

// Define the types for Presence, Storage, UserMeta, RoomEvent, and ThreadMetadata
type Presence = {
  // Define user presence properties, e.g., cursor positions
  // cursor: { x: number, y: number } | null,
};

type Storage = {
  // Define shared documents in the Room, e.g., canvas objects
  canvasObjects: LiveMap<string, any>;
};

type UserMeta = {
  // Define user metadata properties, e.g., user ID, info
  // id?: string,  // Accessible through `user.id`
  // info?: Json,  // Accessible through `user.info`
};

type RoomEvent = {
  // Define custom events for the Room
  // type: "NOTIFICATION",
};

export type ThreadMetadata = {
  // Define metadata for threads (used in Comments)
  resolved: boolean;
  zIndex: number;
  time?: number;
  x: number;
  y: number;
};

// Create RoomContext with the initialized client and typed parameters
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);

