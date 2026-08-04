// Spec §4.1 — slot resolution: an ordered list of ids becomes an ordered list
// of slide defs.
//
// THREE AXES decide what a deck runs, and they are not the same axis:
//
//   1. THE DECK SET — which slots, in what order.        (./deck-sets.ts)
//   2. THE BRAND    — which def fills a slot that has     (here)
//      per-brand alternates.
//   3. THE PRACTICE LAB — whether a lab-only slot         (here)
//      composes at all. Brand-level, via `practiceLab`.
//
// A slot is not a file: the A.1 slot has three defs behind it and the K.2 slot
// two, and each composed deck takes exactly one of each. So the deck-set list
// names ONE canonical id per slot and the tables below say what that id resolves
// to. Ids are file basenames (`tests/unit/deck-slide-ids.test.ts`), and none was
// renamed to make this lookup easier.
//
// Pure: a function over plain data. No React, no DOM, no work at module scope —
// the deck's own defs are handed in, so this is testable against synthetic ones.

import type { Brand } from "@/deck-variants";
import type { DeckSet } from "./deck-sets";
import type { SectionKey } from "./sections";

/**
 * Slot id → the id that fills it for a given brand. An absent brand takes the
 * slot's own (canonical) id.
 *
 * A.1's hook is a BRAND decision, not a deck-set one: it points at evidence the
 * audience's own organisation recognises. `general` has no Session-1 winners to
 * point at, so it trades social proof for familiarity; GEMS points at the
 * DigiTech portfolio it already runs (gh#25). K.2's part 2 states how many
 * tracks the lab runs, and GEMS runs one, so its part 2 names the single
 * persona instead (gh#26). Leaders run the same lab and see the same hook, so
 * both deltas ship to the leader deck sets too — which is exactly why this
 * table is keyed by brand and never by variant.
 */
export const BRAND_ALTERNATE_IDS: Readonly<
  Record<string, Readonly<Partial<Record<Brand, string>>>>
> = {
  "a1-what-youve-seen": { gems: "a1-gems", general: "a1-general" },
  "k2-practice-lab-overview": { gems: "k2-gems" },
};

/**
 * Slots that compose ONLY where the brand runs the hands-on Practice Lab.
 *
 * THE ONE PLACE. A deck set lists these ids unconditionally and this drops
 * them, so a second, per-deck-set list of "the slides general does not get"
 * cannot exist to fall out of step. The closer then renumbers itself to K.1 by
 * R3, because it is the first numbered slide of what is left of the run — no
 * code says so, and none should.
 */
export const PRACTICE_LAB_ONLY_IDS: readonly string[] = [
  "k1-challenge-handoff",
  "k2-practice-lab-overview",
];

/** The narrow shape resolution actually reads. `SlideDef` satisfies it as-is;
 *  keeping the parameter narrow lets tests resolve synthetic lists without
 *  standing up renderable slides — the same bargain `composeDeck` strikes. */
export interface ResolvableSlideDef {
  id: string;
  sectionKey: SectionKey;
}

export interface SlotContext<T extends ResolvableSlideDef> {
  /** Every def a slot may resolve to, alternates included. Order is irrelevant:
   *  the deck set's list is what orders the deck. */
  defs: readonly T[];
  brand: Brand;
  /** `BRANDS[brand].practiceLab`, passed in rather than read, so composition
   *  branches on the FLAG and never on a brand or variant string. */
  practiceLab: boolean;
}

/**
 * Walk a deck set's list and hand back the defs it composes to, in order.
 *
 * Generic in the def type so the caller keeps its own — pass real `SlideDef`s
 * and get `SlideDef`s back. A def passes through by IDENTITY unless the deck set
 * overrides its section, so identity comparisons against the slide modules still
 * hold for every slot that is not overridden.
 *
 * @throws if a listed id resolves to no def. A typo'd id is the one failure
 *         mode this model introduces, and a silently dropped slide is not
 *         discoverable from the screen — so it is a load-time error, naming the
 *         id, for the same reason R4 already throws at module scope.
 * @throws if a list names an ALTERNATE id directly, or overrides a section for
 *         a slot it does not run. Both compose a deck that looks plausible and
 *         is wrong — two A.1s, or an override that quietly does nothing.
 */
export function resolveDeckSetSlides<T extends ResolvableSlideDef>(
  deckSet: DeckSet,
  { defs, brand, practiceLab }: SlotContext<T>,
): T[] {
  const byId = new Map(defs.map((def) => [def.id, def]));
  const labOnly = new Set(PRACTICE_LAB_ONLY_IDS);
  const slots = new Set(deckSet.slides);

  // An override on a slot this deck set does not list applies to nothing, and
  // silence is the wrong answer: the likeliest cause is a typo in the key, and
  // the section it meant to move then splits a run and fails as R4 three files
  // away.
  for (const overridden of Object.keys(deckSet.sectionOverrides ?? {})) {
    if (!slots.has(overridden)) {
      throw new Error(
        `deck set "${deckSet.id}": sectionOverrides names "${overridden}", which ` +
          `this deck set does not list. An override moves a slot the deck runs — ` +
          `add the id to \`slides\`, or drop the override.`,
      );
    }
  }

  return deckSet.slides.flatMap((slotId) => {
    if (!practiceLab && labOnly.has(slotId)) return [];

    // A slot names the CANONICAL id and the alternate resolves behind it. Naming
    // an alternate directly would compose it beside whatever the canonical slot
    // resolves to — two A.1s in one deck, each printing a different number, and
    // nothing but the slide count to say so.
    const canonical = canonicalSlotFor(slotId);
    if (canonical) {
      throw new Error(
        `deck set "${deckSet.id}": "${slotId}" is a brand alternate, not a slot. ` +
          `List "${canonical}" instead — the alternate resolves behind it for the ` +
          `brands that take it.`,
      );
    }

    const id = own(BRAND_ALTERNATE_IDS, slotId)?.[brand] ?? slotId;

    const def = byId.get(id);
    if (!def) {
      const via = id === slotId ? "" : ` (the ${brand} alternate of "${slotId}")`;
      throw new Error(
        `deck set "${deckSet.id}": no slide def has id "${id}"${via}. An id in a ` +
          `deck-set list must name a def in the slide catalogue — check the ` +
          `spelling against the file's basename, or add the file to ` +
          `src/deck/slide-catalogue.ts.`,
      );
    }

    // Keyed by the SLOT id — what the deck-set list actually says — so an
    // override reads the same whichever brand alternate fills the slot.
    const sectionKey = own(deckSet.sectionOverrides, slotId);
    return [sectionKey ? { ...def, sectionKey } : def];
  });
}

/** The slot an id hides behind, or `undefined` if the id IS a slot. Derived from
 *  `BRAND_ALTERNATE_IDS` rather than listed again, so an alternate added there
 *  is refused as a slot in the same edit. */
function canonicalSlotFor(id: string): string | undefined {
  return Object.keys(BRAND_ALTERNATE_IDS).find((slot) =>
    Object.values(BRAND_ALTERNATE_IDS[slot]).includes(id),
  );
}

/**
 * A record lookup that reads only OWN keys.
 *
 * Both tables above are keyed by slide id, and `constructor`, `toString` and
 * `__proto__` are all legal basenames. A bare lookup would hand back an
 * inherited `Object.prototype` member — a function where a string or a
 * `SectionKey` is expected — instead of falling through to "no entry".
 */
function own<V>(record: Readonly<Record<string, V>> | undefined, key: string): V | undefined {
  return record && Object.prototype.hasOwnProperty.call(record, key) ? record[key] : undefined;
}
