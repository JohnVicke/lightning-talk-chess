import { z, defineCollection, reference } from "astro:content";

const slideSchema = z.object({
  title: z.string(),
  description: z.string(),
  next: reference("slide").optional(),
  prev: reference("slide").optional(),
});

const slide = defineCollection({
  type: "content",
  schema: slideSchema,
});

export const collections = {
  slide,
};

export type Slide = z.infer<typeof slideSchema>;
