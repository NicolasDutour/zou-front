export type Faq = {
  id: number;
  attributes: {
    title: string;
    description: string;
  }
}

export type FaqResponse = {
  data: Faq[];
}