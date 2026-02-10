import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getGuestSpins = query({
  args: { guestId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("spins")
      .withIndex("by_guestId", (q) => q.eq("guestId", args.guestId))
      .unique();
  },
});

export const recordSpin = mutation({
  args: { guestId: v.string(), prize: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("spins")
      .withIndex("by_guestId", (q) => q.eq("guestId", args.guestId))
      .unique();

    if (existing) {
      if (existing.spinsUsed >= 2) return;
      await ctx.db.patch(existing._id, {
        spinsUsed: existing.spinsUsed + 1,
        lastPrize: args.prize,
      });
    } else {
      await ctx.db.insert("spins", {
        guestId: args.guestId,
        spinsUsed: 1,
        lastPrize: args.prize,
      });
    }
  },
});
