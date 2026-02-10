import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  spins: defineTable({
    guestId: v.string(),
    spinsUsed: v.number(),
    lastPrize: v.string(),
  }).index("by_guestId", ["guestId"]),
});
