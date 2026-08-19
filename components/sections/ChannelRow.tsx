import { intakeChannels } from "@/content/process";
import { FacebookGlyph } from "@/components/ui/FacebookGlyph";
import { ClipboardList, DoorOpen, MessageCircle, Phone, UserPlus } from "lucide-react";

/** One icon per channel, each actually depicting its label. */
const channelIcons = [Phone, MessageCircle, DoorOpen, UserPlus, ClipboardList, FacebookGlyph];

/**
 * The six ways a patient reaches the clinic, in one of two layouts.
 *
 * `grid` — an even 6-column grid, used only in the pinned desktop panel. The
 * columns exist so the connector curves beneath can be drawn against the same
 * six divisions and land dead-centre under each icon; a flex row with gaps put
 * the curves wherever the text happened to wrap to.
 *
 * `chips` — icon and label inline in a pill, wrapped and centred. Below lg
 * there are no connector curves to align to, and the grid's tall label-above-
 * icon cells spread six items over two sparse rows of floating circles.
 */
export function ChannelRow({ variant = "grid" }: { variant?: "grid" | "chips" }) {
  if (variant === "chips") {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        {intakeChannels.map((channel, index) => {
          const Icon = channelIcons[index] ?? Phone;
          return (
            <li key={channel}>
              <span className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-4">
                <Icon className="size-4 shrink-0 text-sm-red-600" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-sm-mono text-sm-caption uppercase tracking-[0.08em] text-sm-text-inv-2">
                  {channel}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="grid w-full grid-cols-6">
      {intakeChannels.map((channel, index) => {
        const Icon = channelIcons[index] ?? Phone;
        return (
          <li key={channel} className="flex flex-col items-center gap-3">
            <span className="font-sm-mono text-sm-caption uppercase tracking-[0.08em] text-sm-text-inv-2">
              {channel}
            </span>
            <span className="flex size-11 items-center justify-center rounded-full border border-white/20">
              <Icon className="size-4 text-sm-text-inv" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
